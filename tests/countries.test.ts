import { describe, expect, it } from 'vitest';

import {
    countries,
    getCountryByAlpha3Code,
    getCountryByCode,
} from '../src/countries';

import { getCountryByNumericCode } from '../src/countries/country.utils';

describe('Countries dataset', () => {
    it('contains country records', () => {
        expect(countries.length).toBeGreaterThan(0);
    });

    it('does not contain duplicate alpha-2 codes', () => {
        const codes = countries.map(country => country.code);

        expect(new Set(codes).size).toBe(codes.length);
    });

    it('does not contain duplicate alpha-3 codes', () => {
        const codes = countries.map(country => country.alpha3Code);

        expect(new Set(codes).size).toBe(codes.length);
    });

    it('does not contain duplicate numeric codes', () => {
        const codes = countries.map(country => country.numericCode);

        expect(new Set(codes).size).toBe(codes.length);
    });

    it('has valid alpha-2 code formats', () => {
        for (const country of countries) {
            expect(country.code).toMatch(/^[A-Z]{2}$/);
        }
    });

    it('has valid alpha-3 code formats', () => {
        for (const country of countries) {
            expect(country.alpha3Code).toMatch(/^[A-Z]{3}$/);
        }
    });

    it('has valid three-digit numeric code formats', () => {
        for (const country of countries) {
            expect(country.numericCode).toMatch(/^\d{3}$/);
        }
    });

    it('has non-empty common and official names', () => {
        for (const country of countries) {
            expect(country.names.common.trim().length).toBeGreaterThan(0);

            expect(country.names.official?.trim().length ?? 0).toBeGreaterThan(0);
        }
    });

    it('has valid calling-code array values', () => {
        for (const country of countries) {
            expect(Array.isArray(country.callingCodes)).toBe(true);

            for (const callingCode of country.callingCodes) {
                expect(callingCode).toMatch(/^\+\d+$/);
            }
        }
    });

    it('has valid flag field types', () => {
        for (const country of countries) {
            expect(
                country.flag.emoji === null ||
                typeof country.flag.emoji === 'string'
            ).toBe(true);

            expect(
                country.flag.svg === null ||
                typeof country.flag.svg === 'string'
            ).toBe(true);
        }
    });
});

describe('getCountryByCode', () => {
    it('finds India by alpha-2 code', () => {
        expect(getCountryByCode('IN')?.names.common).toBe('India');
    });

    it('supports lowercase alpha-2 codes', () => {
        expect(getCountryByCode('in')?.names.common).toBe('India');
    });

    it('trims whitespace', () => {
        expect(getCountryByCode(' IN ')?.names.common).toBe('India');
    });

    it('returns undefined for an unknown code', () => {
        expect(getCountryByCode('XX')).toBeUndefined();
    });

    it('returns undefined for empty input', () => {
        expect(getCountryByCode('')).toBeUndefined();
    });

    it('returns undefined for whitespace input', () => {
        expect(getCountryByCode('   ')).toBeUndefined();
    });
});

describe('getCountryByAlpha3Code', () => {
    it('finds Japan by alpha-3 code', () => {
        expect(getCountryByAlpha3Code('JPN')?.names.common).toBe('Japan');
    });

    it('supports lowercase alpha-3 codes', () => {
        expect(getCountryByAlpha3Code('jpn')?.names.common).toBe('Japan');
    });

    it('trims whitespace', () => {
        expect(getCountryByAlpha3Code(' JPN ')?.names.common).toBe('Japan');
    });

    it('returns undefined for an unknown code', () => {
        expect(getCountryByAlpha3Code('XXX')).toBeUndefined();
    });

    it('returns undefined for empty input', () => {
        expect(getCountryByAlpha3Code('')).toBeUndefined();
    });

    it('returns undefined for whitespace input', () => {
        expect(getCountryByAlpha3Code('   ')).toBeUndefined();
    });
});

describe('getCountryByNumericCode', () => {
    it('finds Japan by numeric code', () => {
        expect(getCountryByNumericCode('392')?.names.common).toBe('Japan');
    });

    it('trims whitespace', () => {
        expect(getCountryByNumericCode(' 392 ')?.names.common).toBe('Japan');
    });

    it('returns undefined for an unknown code', () => {
        expect(getCountryByNumericCode('999')).toBeUndefined();
    });

    it('returns undefined for empty input', () => {
        expect(getCountryByNumericCode('')).toBeUndefined();
    });

    it('returns undefined for whitespace input', () => {
        expect(getCountryByNumericCode('   ')).toBeUndefined();
    });
});