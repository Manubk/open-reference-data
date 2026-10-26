import { assert } from "./validate-countries";
import { currencies } from "../src/currencies/currencies"

function validateCurrencies(): void {

    assert(
        currencies.length > 0,
        'Currencies dataset must not be empty.'
    )

    const codes = new Set<String>();
    const numericCodes = new Set<String>();

    for (const currency of currencies) {

        /** code should be 3 character */
        assert(
            /^[A-Z]{3}$/.test(currency.code),
            `Invalid currency code ${currency.code}`
        )

        /** numeric Code unique and three numbers*/
        assert(
            /^[0-9]{3}$/.test(currency.numericCode),
            `Invalid currency numeric code ${currency.numericCode}`
        )

        /** Check alphabetic code uniqueness */
        assert(
            !codes.has(currency.code),
            `Duplicate currency code: ${currency.code}`
        )
        codes.add(currency.code);

        /** Check numeric code uniqueness */
        assert(
            !numericCodes.has(currency.numericCode),
            `Duplicate numeric code: ${currency.numericCode}`
        )
        numericCodes.add(currency.numericCode);

        /** Validate symbol */
        assert(
            currency.symbol === null ||
            (
                typeof currency.symbol === 'string' &&
                currency.symbol.trim().length > 0 &&
                currency.symbol === currency.symbol.trim()
            ),
            `Invalid currency symbol for: ${currency.symbol}`
        )

        /** Validate minor unit */
        assert(
            Number.isInteger(currency.minorUnit) &&
            currency.minorUnit >= 0,
            `Invalid minor unit for: ${currency.code}`
        );

    }

    console.log(`Validated ${currencies.length} currency records successfully.`);
}

validateCurrencies();