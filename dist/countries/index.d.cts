interface Names {
    /** Common English name. */
    common: string;
    /** Official English name, when available */
    official: string | null;
}
interface CountryFlag {
    /**
     * Unicode flag emoji.
     * Example:
     */
    emoji: string | null;
    /**
     * URL of the country flag SVG
     * Example: https://flagcdn.com/in.svg
     */
    svg: string | null;
}
interface Country {
    /** ISO 3166-1 alpha-2 code, such as IN */
    code: string;
    /** ISO 3166-1 alpha-3 code, such as IND */
    alpha3Code: string;
    /** ISO 3166-1 numeric code, stored as a string */
    numericCode: string;
    names: Names;
    /** International calling codes, such as +91 */
    callingCodes: string[];
    /** ISO 4217 currency codes */
    currencyCode: string[];
    /** UN M49 geographic region, when applicable. */
    region: string | null;
    /** UN M49 subregion, when applicable. */
    subregion: string | null;
    /** Capital city, when applicable and available */
    capital: string | null;
    /** Flag emoji, when applicable and available */
    flag: CountryFlag;
}

/**
 *
 * @param code alpha-2 code
 * @returns country
 *
 * Find a country or territory by its ISO alpha-2 code
 */
declare function getCountryByCode(code: string): Country | undefined;
declare function getCountryByAlpha3Code(code: string): Country | undefined;
declare function getCountryByNumericCode(code: string): Country | undefined;
declare function searchCountries(query: string): Country[];

declare const countries: readonly Country[];

export { type Country, type CountryFlag, countries, getCountryByAlpha3Code, getCountryByCode, getCountryByNumericCode, searchCountries };
