import { assert } from './validate-countries';
import { creditCardNetworks } from '../src/credit-card-networks/credit-card-networks';

function validateCreditCardNetworks(): void {
    assert(
        creditCardNetworks.length > 0,
        'Credit card networks dataset must not be empty.',
    );

    const ids = new Set<string>();

    const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

    for (const network of creditCardNetworks) {
        assert(
            SLUG_RE.test(network.id),
            `Invalid credit card network id: ${network.id}`,
        );

        assert(
            typeof network.name === 'string' &&
                network.name.length > 0 &&
                network.name === network.name.trim(),
            `Invalid credit card network name: ${network.name}`,
        );

        assert(
            !ids.has(network.id),
            `Duplicate credit card network id: ${network.id}`,
        );
        ids.add(network.id);

        if (network.logo) {
            for (const asset of [network.logo.svg, network.logo.png]) {
                if (!asset) {
                    continue;
                }

                if (asset.local !== undefined) {
                    assert(
                        typeof asset.local === 'string' && asset.local.length > 0,
                        `Invalid local asset path for ${network.id}`,
                    );
                }

                if (asset.cdn !== undefined) {
                    assert(
                        typeof asset.cdn === 'string' &&
                            /^https:\/\//.test(asset.cdn),
                        `Invalid CDN URL for ${network.id}: ${asset.cdn}`,
                    );
                }
            }
        }
    }

    console.log(`Validated ${creditCardNetworks.length} credit card network records successfully.`);
}

validateCreditCardNetworks();