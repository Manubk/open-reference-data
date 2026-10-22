import { describe, expect, it } from 'vitest';
import { countries, getCountryByAlpha3Code, getCountryByCode } from '../src/countries';
import { getCountryByNumericCode } from '../src/countries/country.utils';

describe('Countries dataset', () => {
    it('contains country records', () => {
        expect(countries.length).toBeGreaterThan(0);
    });

    it('Does not contain duplicate alpha-2 codes', () => {
        const codes = countries.map(country => country.code);

        expect(new Set(codes).size).toBe(codes.length);
    });

    it('Does not contain duplicate alpha-3 codes', () => {
        const codes = countries.map(country => country.alpha3Code);

        expect(new Set(codes).size).toBe(codes.length);
    });

    it('Does not contain duplicate numeric codes', () => {
        const codes = countries.map(country => country.numericCode);

        expect(new Set(codes).size).toBe(codes.length);
    });

    it('Finds India by alpha-2 code', () => {
        expect(getCountryByCode('IN')?.names.common).toBe('India');
    });

    it('Supports lowercase alpha-2 codes', () => {
        expect(getCountryByCode('in')?.names.common).toBe('India');
    });

    it('Finds Japan by alpha-3 code', () => {
        expect(getCountryByAlpha3Code('JPN')?.names.common).toBe('Japan');
    });

    it('finds Japan by numeric code', () => {
        expect(getCountryByNumericCode('392')?.names.common).toBe('Japan')
    });

    it('Returns undefined for an unknow code', () => {
        expect(getCountryByCode('xx')).toBeUndefined();
    });

    it('Returns undefined for an unknow alpha-3 code', () => {
        expect(getCountryByAlpha3Code('xx')).toBeUndefined();
    });


    it('Returns undefined for an unknow numaric code', () => {
        expect(getCountryByNumericCode('xx')).toBeUndefined();
    });
});