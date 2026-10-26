import { describe, expect, it } from 'vitest';

import {
    banks,
    bankLogos,
    getBankById,
    getBankByName,
    getBanks,
    getBanksByIds,
    getBanksCount,
    searchBanks,
} from '../src/banks';

describe('Banks dataset', () => {
    it('contains bank records', () => {
        expect(banks.length).toBeGreaterThan(0);
    });

    it('does not contain duplicate bank ids', () => {
        const ids = banks.map(bank => bank.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('has non-empty bank names', () => {
        for (const bank of banks) {
            expect(bank.name.trim().length).toBeGreaterThan(0);
        }
    });

    it('has no extra logo entries', () => {
        const ids = new Set(banks.map(bank => bank.id));
        for (const id of Object.keys(bankLogos)) {
            expect(ids.has(id)).toBe(true);
        }
    });

    it('has bank logos for at most all banks', () => {
        expect(Object.keys(bankLogos).length).toBeLessThanOrEqual(banks.length);
    });

    it('returns the same number of banks from getBanks', () => {
        expect(getBanks().length).toBe(banks.length);
    });

    it('returns the correct bank count', () => {
        expect(getBanksCount()).toBe(banks.length);
    });
});

describe('getBankById', () => {
    it('finds a bank by id', () => {
        expect(getBankById(banks[0].id)?.id).toBe(banks[0].id);
    });

    it('supports case-insensitive ids', () => {
        expect(getBankById(banks[0].id.toUpperCase())?.id).toBe(banks[0].id);
    });

    it('trims surrounding whitespace', () => {
        expect(getBankById(` ${banks[0].id} `)?.id).toBe(banks[0].id);
    });

    it('returns undefined for an unknown id', () => {
        expect(getBankById('not-a-real-bank')).toBeUndefined();
    });

    it('returns undefined for an empty id', () => {
        expect(getBankById('')).toBeUndefined();
    });

    it('returns undefined for whitespace-only input', () => {
        expect(getBankById('   ')).toBeUndefined();
    });
});

describe('getBankByName', () => {
    it('finds a bank by name', () => {
        expect(getBankByName(banks[0].name)?.name).toBe(banks[0].name);
    });

    it('supports case-insensitive names', () => {
        expect(getBankByName(banks[0].name.toUpperCase())?.name).toBe(banks[0].name);
    });

    it('trims surrounding whitespace', () => {
        expect(getBankByName(` ${banks[0].name} `)?.name).toBe(banks[0].name);
    });

    it('returns undefined for an unknown name', () => {
        expect(getBankByName('Not A Real Bank')).toBeUndefined();
    });

    it('returns undefined for an empty name', () => {
        expect(getBankByName('')).toBeUndefined();
    });

    it('returns undefined for whitespace-only input', () => {
        expect(getBankByName('   ')).toBeUndefined();
    });
});

describe('getBanks', () => {
    it('returns all banks when called without ids', () => {
        expect(getBanks().length).toBe(banks.length);
    });

    it('returns matching banks for the given ids', () => {
        const ids = [banks[0].id, banks[1].id];
        const result = getBanks(ids);
        expect(result.length).toBe(2);
        expect(result.map(bank => bank.id)).toEqual(expect.arrayContaining(ids));
    });

    it('is case-insensitive and trims ids', () => {
        const result = getBanks([` ${banks[0].id.toUpperCase()} `]);
        expect(result.length).toBe(1);
        expect(result[0].id).toBe(banks[0].id);
    });

    it('returns an empty array for no matches', () => {
        expect(getBanks(['not-a-real-bank'])).toEqual([]);
    });

    it('returns an empty array for an empty id list', () => {
        expect(getBanks([])).toEqual([]);
    });
});

describe('getBanksByIds', () => {
    it('behaves like getBanks with ids', () => {
        const ids = [banks[2].id];
        expect(getBanksByIds(ids)).toEqual(getBanks(ids));
    });
});

describe('searchBanks', () => {
    it('finds banks by id', () => {
        expect(searchBanks(banks[0].id).some(bank => bank.id === banks[0].id)).toBe(true);
    });

    it('finds banks by name', () => {
        expect(searchBanks(banks[0].name).some(bank => bank.name === banks[0].name)).toBe(true);
    });

    it('supports case-insensitive searches', () => {
        expect(searchBanks('bank')).toEqual(searchBanks('BANK'));
    });

    it('returns an empty array for an empty query', () => {
        expect(searchBanks('')).toEqual([]);
    });

    it('returns an empty array for whitespace-only input', () => {
        expect(searchBanks('   ')).toEqual([]);
    });

    it('returns an empty array when nothing matches', () => {
        expect(searchBanks('zzzz-not-a-bank')).toEqual([]);
    });
});