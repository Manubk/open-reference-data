import { countries } from '../src/countries';

function assert(
  condition: boolean,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function isValidFlagEmoji(
  emoji: string | null,
  countryCode: string
): boolean {

  if (!emoji || !/^[A-Z]{2}$/.test(countryCode)) {
    return false;
  }

  const expectedFlag = String.fromCodePoint(
    ...[...countryCode].map(
      (char) => 0x1f1e6 + char.charCodeAt(0) - 65,
    ),
  );

  return emoji === expectedFlag;
}


function validateCountries(): void {
  assert(
    countries.length > 0,
    'Country dataset must not be empty.',
  );

  const alpha2Codes = new Set<string>();
  const alpha3Codes = new Set<string>();
  const numericCodes = new Set<string>();

  for (const country of countries) {
    assert(
      /^[A-Z]{2}$/.test(country.code),
      `Invalid alpha-2 code: ${country.code}`,
    );

    assert(
      /^[A-Z]{3}$/.test(country.alpha3Code),
      `Invalid alpha-3 code: ${country.alpha3Code}`,
    );

    assert(
      /^\d{3}$/.test(country.numericCode),
      `Invalid numeric code: ${country.numericCode}`,
    );

    assert(
      country?.names?.common.trim().length > 0,
      `Missing country name for ${country.code}`,
    );

    assert(
      (country?.names?.official?.trim().length ?? 0) > 0,
      `Missing official name for ${country.code}`,
    );

    assert(
      country.callingCodes.every(
        code => /^\+[1-9]\d{0,3}$/.test(code),
      ),
      `Invalid calling code for ${country.code}`,
    );

    assert(
      country.currencyCode.every(
        code => /^[A-Z]{3}$/.test(code),
      ),
      `Invalid currency code format for ${country.code}`,
    );

    assert(
      country.flag.emoji === null ||
      isValidFlagEmoji(country.flag.emoji, country.code),
      `Invalid flag emoji for ${country.code}`,
    );

    assert(
      country.flag.svg === null ||
      country.flag.svg.startsWith('https://'),
      `Invalid flag URL for ${country.code}`,
    );

    assert(
      !alpha2Codes.has(country.code),
      `Duplicate alpha-2 code: ${country.code}`,
    );

    assert(
      !alpha3Codes.has(country.alpha3Code),
      `Duplicate alpha-3 code: ${country.alpha3Code}`,
    );

    assert(
      !numericCodes.has(country.numericCode),
      `Duplicate numeric code: ${country.numericCode}`,
    );

    alpha2Codes.add(country.code);
    alpha3Codes.add(country.alpha3Code);
    numericCodes.add(country.numericCode);
  }

  console.log(
    `Validated ${countries.length} country records.`,
  );
}

validateCountries();