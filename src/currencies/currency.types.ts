export interface Currency {

    /** ISO 4217 alphabetic code: e.g. INR */
    code: string;

    /** Currency name from the reference source */
    name: string;

    /** Commonly name from the reference source */
    symbol: string | null;

    /** ISO 4217 numeric currency code, stored as a string */
    numericCode: string;

    /** ISO 4217 minor-unit digit count */
    minorUnit: number;
    
}