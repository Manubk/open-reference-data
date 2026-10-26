import { Bank } from "./bank.types";
import { banks } from "./banks";

export function getBanksCount(): number {
    return banks.length;
}

export function getBanks(): readonly Bank[];
export function getBanks(ids: string[]): Bank[];
export function getBanks(ids?: string[]): readonly Bank[] | Bank[] {
    if (ids === undefined) {
        return banks;
    }

    if (!ids || ids.length === 0) {
        return [];
    }

    const normalizedIds = new Set(
        ids.map(id => id.trim().toLocaleLowerCase()).filter(Boolean),
    );

    return banks.filter(bank =>
        normalizedIds.has(bank.id.toLocaleLowerCase()),
    );
}

export function getBanksByIds(ids: string[]): Bank[] {
    return getBanks(ids);
}

export function getBankById(id: string): Bank | undefined {
    const normalizedId = id.trim().toLocaleLowerCase();

    if (!normalizedId) {
        return undefined;
    }

    return banks.find(bank => bank.id.toLocaleLowerCase() === normalizedId);
}

export function getBankByName(name: string): Bank | undefined {
    const normalizedName = name.trim().toLocaleLowerCase();

    if (!normalizedName) {
        return undefined;
    }

    return banks.find(bank => bank.name.toLocaleLowerCase() === normalizedName);
}

export function getBankByCode(code: string): Bank | undefined {
    return getBankById(code);
}

export function searchBanks(query: string): Bank[] {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    if (!normalizedQuery) {
        return [];
    }

    return banks.filter(
        (bank) =>
            bank.id.toLocaleLowerCase().includes(normalizedQuery) ||
            bank.name.toLocaleLowerCase().includes(normalizedQuery),
    );
}

