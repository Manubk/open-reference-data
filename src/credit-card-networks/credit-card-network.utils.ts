
import type { CreditCardNetwork } from './credit-card-network.types';
import { creditCardNetworks } from './credit-card-networks';

export function getCreditCardNetworksCount(): number {
    return creditCardNetworks.length;
}

export function getCreditCardNetworks(): readonly CreditCardNetwork[];

export function getCreditCardNetworks(ids: readonly string[]): CreditCardNetwork[];

export function getCreditCardNetworks(
    ids?: readonly string[],
): readonly CreditCardNetwork[] | CreditCardNetwork[] {
    if (ids === undefined) {
        return creditCardNetworks;
    }

    if (ids.length === 0) {
        return [];
    }

    const normalizedIds = new Set(
        ids
            .filter((id) => typeof id === 'string')
            .map((id) => id.trim().toLowerCase())
            .filter(Boolean),
    );

    if (normalizedIds.size === 0) {
        return [];
    }

    return creditCardNetworks.filter((network) =>
        normalizedIds.has(network.id.toLowerCase()),
    );
}

export function getCreditCardNetworksByIds(
    ids: readonly string[],
): CreditCardNetwork[] {
    return getCreditCardNetworks(ids);
}

export function getCreditCardNetworkById(
    id: string,
): CreditCardNetwork | undefined {
    const normalizedId = id.trim().toLowerCase();

    if (!normalizedId) {
        return undefined;
    }

    return creditCardNetworks.find(
        (network) => network.id.toLowerCase() === normalizedId,
    );
}

export function getCreditCardNetworkByName(
    name: string,
): CreditCardNetwork | undefined {
    const normalizedName = name.trim().toLowerCase();

    if (!normalizedName) {
        return undefined;
    }

    return creditCardNetworks.find(
        (network) => network.name.trim().toLowerCase() === normalizedName,
    );
}

export function searchCreditCardNetworks(
    query: string,
): CreditCardNetwork[] {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
        return [];
    }

    return creditCardNetworks.filter(
        (network) =>
            network.id.toLowerCase().includes(normalizedQuery) ||
            network.name.toLowerCase().includes(normalizedQuery),
    );
}
