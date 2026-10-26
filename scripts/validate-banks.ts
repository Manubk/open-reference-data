/**
 * Validation script for the banks dataset.
 *
 * Senior-engineer notes:
 * - Single source of truth for structural and referential integrity of
 *   `data/banks/banks.json` and `src/banks/bank-logos.ts`.
 * - Strict: every invariant checkable without a network round-trip is here.
 * - Remote CDN reachability is verified separately (slow/flaky in CI).
 * - Paths resolve relative to this file's location, safe from any cwd.
 */

import { assert } from './validate-countries';
import { banks } from '../src/banks/banks';
import { bankLogos } from '../src/banks/bank-logos';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BANK_SOURCE_DIR = path.join(ROOT, 'src', 'banks');
const ASSET_DIR = path.resolve(ROOT, 'assets', 'bank-logos');

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.length > 0 && value === value.trim();
}

function isValidUrl(value: string): boolean {
    try {
        const url = new URL(value);
        return url.protocol === 'https:';
    } catch {
        return false;
    }
}

function resolveLocal(localPath: string): string {
    const prefix = '../../assets/bank-logos/';

    assert(
        localPath.startsWith(prefix),
        `Local asset must be under ${prefix}: ${localPath}`
    );

    const resolved = path.resolve(BANK_SOURCE_DIR, localPath);
    const relative = path.relative(ASSET_DIR, resolved);

    assert(
        relative !== '' &&
        relative !== '..' &&
        !relative.startsWith(`..${path.sep}`) &&
        !path.isAbsolute(relative),
        `Unsafe local asset path (path traversal): ${localPath}`,
    );

    return resolved;

}

function validateAsset(asset: unknown, context: string): void {
    if (asset === undefined || asset === null) {
        return;
    }
    assert(typeof asset === 'object' && !Array.isArray(asset), `${context} must be an object.`);
    const { local, cdn } = asset as { local?: unknown; cdn?: unknown };

    if (local !== undefined) {
        assert(isNonEmptyString(local), `${context}.local must be a non-empty trimmed string.`);
        assert(
            (local as string).startsWith('../../assets/bank-logos/'),
            `${context}.local must live under ../../assets/bank-logos/: ${local}`,
        );
        assert(fs.existsSync(resolveLocal(local as string)), `${context}.local does not exist on disk: ${local}`);
    }
    if (cdn !== undefined) {
        assert(isNonEmptyString(cdn), `${context}.cdn must be a non-empty trimmed string.`);
        assert(isValidUrl(cdn as string), `${context}.cdn must be a valid http(s) URL: ${cdn}`);
    }
    assert(local !== undefined || cdn !== undefined, `${context} must define at least one of "local" or "cdn".`);
}

function    validateBankLogo(logo: unknown, context: string): void {
    assert(logo !== null && typeof logo === 'object' && !Array.isArray(logo), `${context} must be an object.`);
    const { logo: logoGroup, icon } = logo as { logo?: unknown; icon?: unknown };

    if (logoGroup !== undefined) {
        assert(logoGroup !== null && typeof logoGroup === 'object' && !Array.isArray(logoGroup), `${context}.logo must be an object.`);
        const group = logoGroup as { svg?: unknown; png?: unknown };
        validateAsset(group.svg, `${context}.logo.svg`);
        validateAsset(group.png, `${context}.logo.png`);
    }
    if (icon !== undefined) {
        assert(icon !== null && typeof icon === 'object' && !Array.isArray(icon), `${context}.icon must be an object.`);
        const group = icon as { svg?: unknown; png?: unknown };
        validateAsset(group.svg, `${context}.icon.svg`);
        validateAsset(group.png, `${context}.icon.png`);
    }
    assert(logoGroup !== undefined || icon !== undefined, `${context} must define at least one of "logo" or "icon".`);
}


function validateBanks(): void {

    assert(Array.isArray(banks), 'Banks dataset must be an array.');
    assert(banks.length > 0, 'Banks dataset must not be empty.');

    const ids = new Set<string>();

    for (const bank of banks) {
        assert(bank !== null && typeof bank === 'object' && !Array.isArray(bank), 'Each bank must be an object.');

        assert(isNonEmptyString(bank.id), `Bank id must be a non-empty trimmed string (got ${String(bank.id)}).`);
        assert(SLUG_RE.test(bank.id), `Bank id must be a lowercase slug (got "${bank.id}").`);
        assert(!ids.has(bank.id), `Duplicate bank id: ${bank.id}.`);
        ids.add(bank.id);

        assert(isNonEmptyString(bank.name), `Bank name must be a non-empty trimmed string for ${bank.id}.`);

        validateBankLogo(bank.logo, `bank[${bank.id}].logo`);
    }

    assert(bankLogos !== null && typeof bankLogos === 'object' && !Array.isArray(bankLogos), 'bankLogos must be an object.');

    const logoKeys = new Set<string>();
    for (const key of Object.keys(bankLogos)) {
        assert(SLUG_RE.test(key), `bankLogos key must be a lowercase slug (got "${key}").`);
        assert(!logoKeys.has(key), `Duplicate bankLogos key: ${key}.`);
        logoKeys.add(key);

        assert(ids.has(key), `bankLogos key "${key}" has no matching bank in banks.json.`);

        validateBankLogo(bankLogos[key], `bankLogos[${key}]`);
    }

    for (const key of logoKeys) {
        const bank = banks.find((b) => b.id === key);
        if (!bank) continue;

        const logoEntry = bankLogos[key];
        const bankLogo = bank.logo;

        const cdnOf = (group: unknown): (string | undefined)[] => {
            if (!group || typeof group !== 'object') return [undefined, undefined];
            const g = group as { svg?: { cdn?: string }; png?: { cdn?: string } };
            return [g.svg?.cdn, g.png?.cdn];
        };

        const compareGroup = (a: unknown, b: unknown, label: string): void => {
            const [aSvg, aPng] = cdnOf(a);
            const [bSvg, bPng] = cdnOf(b);
            assert(aSvg === bSvg && aPng === bPng, `CDN mismatch for ${key} ${label}: banks.json vs bank-logos.ts.`);
        };

        compareGroup(bankLogo.logo, logoEntry.logo, 'logo');
        compareGroup(bankLogo.icon, logoEntry.icon, 'icon');
    }

    console.log(`Validated ${banks.length} bank records and ${logoKeys.size} bank logos successfully.`);
}

validateBanks();
