
import { describe, expect, it } from 'vitest';

import {
    currencies,
    getCurrencyByCode,
    getCurrencyByName,
    getCurrenciesCount,
    getCurrencies,
    searchCurrencies
} from '../src/currencies';

describe('Currencies dataset', () => {
    it('contains currency records', () => {
        expect(currencies.length).toBeGreaterThan(0);
    });

    it('does not contain duplicate currency codes', () => {
        const codes = currencies.map(currency => currency.code.toUpperCase());

        expect(new Set(codes).size).toBe(codes.length);
    });

    it('has valid three-letter currency codes', () => {
        for (const currency of currencies) {
            expect(currency.code).toMatch(/^[A-Z]{3}$/);
        }
    });

    it('has non-empty currency names', () => {
        for (const currency of currencies) {
            expect(currency.name?.trim().length ?? 0).toBeGreaterThan(0);
        }
    });

    it('has valid numeric codes when provided', () => {
        for (const currency of currencies) {
            // Adjust "numericCode" if your Currency type uses another property name.
            const numericCode = currency.numericCode;

            if (numericCode != null && numericCode !== '') {
                expect(String(numericCode)).toMatch(/^\d{3}$/);
            }
        }
    });

    it('has unique numeric codes when provided', () => {
        const numericCodes = currencies
            .map(currency => currency.numericCode)
            .filter(
                (code): code is NonNullable<typeof code> =>
                    code != null && String(code).trim() !== '',
            )
            .map(String);

        expect(new Set(numericCodes).size).toBe(numericCodes.length);
    });

    it('has a valid symbol field when provided', () => {
        for (const currency of currencies) {
            if (currency.symbol != null) {
                expect(typeof currency.symbol).toBe('string');
            }
        }
    });
});

describe('getCurrencyByCode', () => {
    it('finds Indian Rupee by code', () => {
        expect(getCurrencyByCode('INR')?.name).toBe('Indian Rupee');
    });

    it('supports lowercase codes', () => {
        expect(getCurrencyByCode('inr')?.code).toBe('INR');
    });

    it('supports codes with surrounding whitespace', () => {
        expect(getCurrencyByCode(' INR ')?.code).toBe('INR');
    });

    it('returns undefined for an unknown code', () => {
        expect(getCurrencyByCode('XXX')).toBeUndefined();
    });

    it('returns undefined for an empty code', () => {
        expect(getCurrencyByCode('')).toBeUndefined();
    });

    it('returns undefined for whitespace-only input', () => {
        expect(getCurrencyByCode('   ')).toBeUndefined();
    });
});

describe('getCurrencyByName', () => {
    it('finds a currency by its name', () => {
        expect(getCurrencyByName('Indian Rupee')?.code).toBe('INR');
    });

    it('supports lowercase names', () => {
        expect(getCurrencyByName('indian rupee')?.code).toBe('INR');
    });

    it('supports names with surrounding whitespace', () => {
        expect(getCurrencyByName(' Indian Rupee ')?.code).toBe('INR');
    });

    it('returns undefined for an unknown name', () => {
        expect(getCurrencyByName('Unknown Currency')).toBeUndefined();
    });

    it('returns undefined for an empty name', () => {
        expect(getCurrencyByName('')).toBeUndefined();
    });

    it('returns undefined for whitespace-only input', () => {
        expect(getCurrencyByName('   ')).toBeUndefined();
    });
});

describe('searchCurrencies', () => {

    it('finds currencies by code', () => {

        expect(searchCurrencies('INR').some(currency => currency.code === 'INR'))
            .toBe(true);
    });

    it('finds currencies by name', () => {
        expect(
            searchCurrencies('Indian').some(
                currency => currency.name === 'Indian Rupee',
            ),
        ).toBe(true);
    });

    it('finds currencies by symbol when applicable', () => {
        const matchingCurrencies = currencies.filter(
            currency => currency.symbol?.includes('$'),
        );

        if (matchingCurrencies.length > 0) {
            const results = searchCurrencies('$');

            expect(
                results.some(currency => currency.symbol?.includes('$')),
            ).toBe(true);
        }
    });

    it('supports case-insensitive searches', () => {
        expect(searchCurrencies('indian')).toEqual(searchCurrencies('INDIAN'));
    });

    it('returns an empty array for an empty query', () => {
        expect(searchCurrencies('')).toEqual([]);
    });

    it('returns an empty array for whitespace-only input', () => {
        expect(searchCurrencies('   ')).toEqual([]);
    });

    it('returns an empty array when nothing matches', () => {
        expect(searchCurrencies('not-a-real-currency-query')).toEqual([]);
    });
});

describe('getCurrenciesCount', () => {
    it('returns the number of currency records', () => {
        expect(getCurrenciesCount()).toBe(currencies.length);
    });
});

describe('getCurrencies', () => {
    it('returns currencies matching multiple codes', () => {
        const results = getCurrencies(['INR', 'USD']);
        const resultCodes = results.map(currency => currency.code);

        expect(resultCodes).toContain('INR');
        expect(resultCodes).toContain('USD');
    });

    it('supports lowercase codes', () => {
        const results = getCurrencies(['inr']);

        expect(results.map(currency => currency.code)).toContain('INR');
    });

    it('ignores surrounding whitespace in codes', () => {
        const results = getCurrencies([' INR ']);

        expect(results.map(currency => currency.code)).toContain('INR');
    });

    it('does not return duplicate records for repeated codes', () => {
        const results = getCurrencies(['INR', 'INR']);

        expect(results.filter(currency => currency.code === 'INR')).toHaveLength(1);
    });

    it('returns an empty array for an empty input', () => {
        expect(getCurrencies([])).toEqual([]);
    });

    it('returns an empty array when no codes match', () => {
        expect(getCurrencies(['XXX'])).toEqual([]);
    });
});
