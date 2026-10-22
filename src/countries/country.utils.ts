
import { countries } from "./countries";
import { Country } from "./country.types";

/**
 * 
 * @param code alpha-2 code
 * @returns country
 * 
 * Find a country or territory by its ISO alpha-2 code
 */
export function getCountryByCode(code: string): Country | undefined {
    const normalizedCode = code.trim().toUpperCase();

    return countries.find(
        (country) => country.code === normalizedCode,
    );
}

export function getCountryByAlpha3Code(
    code: string
): Country | undefined {
    const normalizedCode = code.trim().toUpperCase();

    return countries.find(
        country => country.alpha3Code === normalizedCode
    )
}

export function getCountryByNumericCode(
    code: string
): Country | undefined {

    const normalizedCode = code.trim();

    return countries.find(
        country => country.numericCode === normalizedCode
    )

}

export function searchCountries(
    query: string
): Country[] {

    const normalizedQuery = query.trim().toLocaleLowerCase();

    if (!normalizedQuery) {
        return [];
    }

    return countries.filter(country => {
        const searchFields = [
            country.names.common,
            country.names.official,
            country.code,
            country.alpha3Code,
            ...(country.callingCodes ?? []),
            ...(Array.isArray(country.currencyCode) ? country.currencyCode : [country.currencyCode])
        ];

        // Just check that value is not null/undefined, then convert to string safely
        return searchFields.some(value =>
            value != null && String(value).toLocaleLowerCase().includes(normalizedQuery)
        );
    });
}
