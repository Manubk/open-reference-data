import { Currency } from "./currency.types";
import { currencies } from "./currencies";

export function getCurrencyByCode(code: string): Currency | undefined {

    const normalizedCode = code.trim().toLocaleLowerCase();

    if (!normalizedCode) {
        return undefined;
    }

    return currencies.find(currency => currency.code.toLocaleLowerCase() === normalizedCode);
}

export function getCurrencyByName(name: string): Currency | undefined {

    const normalizedName = name.trim().toLocaleLowerCase();

    if (!normalizedName) {
        return undefined;
    }

    return currencies.find(currency => currency.name.toLocaleLowerCase() === normalizedName);
}

export function searchCurrencies(query: string): Currency[] | [] {

    const normalizedQuery = query.trim().toLocaleLowerCase();

    console.log("Before", normalizedQuery);
    console.log("After", normalizedQuery);

    if (!normalizedQuery) {
        return [];
    }

    return currencies.filter(currency =>
        currency.code.toLocaleLowerCase().includes(normalizedQuery) ||
        currency.name.toLocaleLowerCase().includes(normalizedQuery) ||
        currency.symbol.includes(normalizedQuery)
    )

}

export function getCurrenciesCount(): number {

    return currencies ? currencies.length : 0;

}

export function getCurrencies(codes: string[]): Currency[] {

    if (!codes || codes.length === 0) {
        return [];
    }

    const normalizedCodes = new Set(
        codes.map(code => code.trim().toUpperCase())
    );

    return currencies.filter(currency =>
        normalizedCodes.has(currency.code.toUpperCase())
    )
}