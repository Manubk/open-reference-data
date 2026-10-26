import { describe, expect, it } from 'vitest';

import {
    creditCardNetworks,
    creditNetworks,
    getCreditCardNetworkById,
    getCreditCardNetworkByName,
    getCreditCardNetworks,
    getCreditCardNetworksByIds,
    getCreditCardNetworksCount,
    searchCreditCardNetworks,
} from '../src/credit-card-networks';

describe('Credit card networks dataset', () => {
    it('contains credit card network records', () => {
        expect(creditCardNetworks.length).toBeGreaterThan(0);
    });

    it('does not contain duplicate ids', () => {
        const ids = creditCardNetworks.map(network => network.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it('has non-empty names', () => {
        for (const network of creditCardNetworks) {
            expect(network.name.trim().length).toBeGreaterThan(0);
        }
    });

    it('keeps the compatibility alias in sync', () => {
        expect(creditNetworks).toBe(creditCardNetworks);
    });

    it('returns the same number of networks from getCreditCardNetworks', () => {
        expect(getCreditCardNetworks().length).toBe(creditCardNetworks.length);
    });

    it('returns the correct count', () => {
        expect(getCreditCardNetworksCount()).toBe(creditCardNetworks.length);
    });
});

describe('getCreditCardNetworkById', () => {
    it('finds a network by id', () => {
        expect(getCreditCardNetworkById(creditCardNetworks[0].id)?.id).toBe(creditCardNetworks[0].id);
    });

    it('supports case-insensitive ids', () => {
        expect(getCreditCardNetworkById(creditCardNetworks[0].id.toUpperCase())?.id).toBe(creditCardNetworks[0].id);
    });

    it('trims surrounding whitespace', () => {
        expect(getCreditCardNetworkById(` ${creditCardNetworks[0].id} `)?.id).toBe(creditCardNetworks[0].id);
    });

    it('returns undefined for an unknown id', () => {
        expect(getCreditCardNetworkById('not-a-real-network')).toBeUndefined();
    });

    it('returns undefined for an empty id', () => {
        expect(getCreditCardNetworkById('')).toBeUndefined();
    });

    it('returns undefined for whitespace-only input', () => {
        expect(getCreditCardNetworkById('   ')).toBeUndefined();
    });
});

describe('getCreditCardNetworkByName', () => {
    it('finds a network by name', () => {
        expect(getCreditCardNetworkByName(creditCardNetworks[0].name)?.name).toBe(creditCardNetworks[0].name);
    });

    it('supports case-insensitive names', () => {
        expect(getCreditCardNetworkByName(creditCardNetworks[0].name.toUpperCase())?.name).toBe(creditCardNetworks[0].name);
    });

    it('trims surrounding whitespace', () => {
        expect(getCreditCardNetworkByName(` ${creditCardNetworks[0].name} `)?.name).toBe(creditCardNetworks[0].name);
    });

    it('returns undefined for an unknown name', () => {
        expect(getCreditCardNetworkByName('Not A Real Network')).toBeUndefined();
    });

    it('returns undefined for an empty name', () => {
        expect(getCreditCardNetworkByName('')).toBeUndefined();
    });

    it('returns undefined for whitespace-only input', () => {
        expect(getCreditCardNetworkByName('   ')).toBeUndefined();
    });
});

describe('getCreditCardNetworks', () => {
    it('returns all networks when called without ids', () => {
        expect(getCreditCardNetworks().length).toBe(creditCardNetworks.length);
    });

    it('returns matching networks for the given ids', () => {
        const ids = [creditCardNetworks[0].id, creditCardNetworks[1].id];
        const result = getCreditCardNetworks(ids);
        expect(result.length).toBe(2);
        expect(result.map(network => network.id)).toEqual(expect.arrayContaining(ids));
    });

    it('is case-insensitive and trims ids', () => {
        const result = getCreditCardNetworks([` ${creditCardNetworks[0].id.toUpperCase()} `]);
        expect(result.length).toBe(1);
        expect(result[0].id).toBe(creditCardNetworks[0].id);
    });

    it('returns an empty array for no matches', () => {
        expect(getCreditCardNetworks(['not-a-real-network'])).toEqual([]);
    });

    it('returns an empty array for an empty id list', () => {
        expect(getCreditCardNetworks([])).toEqual([]);
    });
});

describe('getCreditCardNetworksByIds', () => {
    it('behaves like getCreditCardNetworks', () => {
        const ids = [creditCardNetworks[0].id];
        expect(getCreditCardNetworksByIds(ids)).toEqual(getCreditCardNetworks(ids));
    });
});

describe('searchCreditCardNetworks', () => {
    it('returns all matches for a common query', () => {
        expect(searchCreditCardNetworks(creditCardNetworks[0].id).length).toBeGreaterThan(0);
    });

    it('is case-insensitive', () => {
        expect(searchCreditCardNetworks(creditCardNetworks[0].name.toUpperCase()).length).toBeGreaterThan(0);
    });

    it('returns an empty array for an empty query', () => {
        expect(searchCreditCardNetworks('')).toEqual([]);
    });

    it('returns an empty array for whitespace-only input', () => {
        expect(searchCreditCardNetworks('   ')).toEqual([]);
    });

    it('returns an empty array when nothing matches', () => {
        expect(searchCreditCardNetworks('zzzz-not-a-network')).toEqual([]);
    });
});