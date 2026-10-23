# 📚 API Reference — Open Reference Data

**🌍 Reference data for modern JavaScript and TypeScript applications.**

Welcome to the API reference for `open-reference-data`! This guide documents the public country and currency lookup utilities, search functions, and dataset helpers.

Use this document to discover available functions, understand their behavior, and integrate reference data into your applications.

## 📦 Installation

```bash
npm install open-reference-data
```

## 🚀 Importing the APIs

Import the functions you need from the package's public entry point, assuming they are re-exported from `src/index.ts`.

```typescript
import {
  getCountryByCode,
  getCountryByAlpha3Code,
  getCountryByNumericCode,
  searchCountries,
  getCurrencyByCode,
  getCurrencyByName,
  searchCurrencies,
  getCurrencies,
  getCurrenciesCount,
} from "open-reference-data";
```

> 💡 Only functions exported through the package's public entry point are available through this import path.

---

# 🌍 Country APIs

Country APIs let you find countries and territories by their standardized identifiers or search for matching records.

Useful for:
- 📝 Registration and address forms
- 📱 International phone number forms
- 🛒 E-commerce checkout flows
- 🌐 Internationalization and localization
- 📊 Country-based filtering and reporting

## 1. `getCountryByCode(code)`

Find a country or territory by its ISO 3166-1 alpha-2 code.

**Signature**

```typescript
function getCountryByCode(
  code: string
): Country | undefined;
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `code` | `string` | Two-letter country code, such as `"IN"` |

**Returns**

- `Country` — the matching country or territory.
- `undefined` — no matching record exists.

**Example**

```typescript
const country = getCountryByCode("IN");

console.log(country?.names.common);
// "India"
```

**Case and whitespace handling**

The function trims surrounding whitespace and converts the code to uppercase.

```typescript
getCountryByCode("in");
getCountryByCode(" IN ");
getCountryByCode("In");
```

All three inputs resolve to the same country when `"IN"` exists in the dataset.

---

## 2. `getCountryByAlpha3Code(code)`

Find a country or territory by its ISO 3166-1 alpha-3 code.

**Signature**

```typescript
function getCountryByAlpha3Code(
  code: string
): Country | undefined;
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `code` | `string` | Three-letter country code, such as `"IND"` |

**Returns**

`Country | undefined`

**Example**

```typescript
const country = getCountryByAlpha3Code("IND");

console.log(country?.names.common);
// "India"
```

The input is trimmed and converted to uppercase before lookup.

---

## 3. `getCountryByNumericCode(code)`

Find a country or territory by its ISO 3166-1 numeric code.

**Signature**

```typescript
function getCountryByNumericCode(
  code: string
): Country | undefined;
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `code` | `string` | Numeric country code represented as a string, such as `"356"` |

**Returns**

`Country | undefined`

**Example**

```typescript
const country = getCountryByNumericCode("356");

console.log(country?.names.common);
// "India"
```

**💡 Why is the code a string?**

Numeric identifiers are codes, not quantities. Representing them as strings preserves formatting, including leading zeros where applicable.

The function trims whitespace but does not change the case or convert the input to a number.

---

## 4. `searchCountries(query)`

Search for countries and territories using multiple fields.

**Signature**

```typescript
function searchCountries(
  query: string
): Country[];
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `query` | `string` | Search text |

**Fields searched**

The current implementation searches:

- `names.common` — common country name
- `names.official` — official country name
- `code` — alpha-2 code
- `alpha3Code` — alpha-3 code
- `callingCodes` — calling codes, when available
- `currencyCode` — associated currency codes

**Returns**

An array of matching country records. Returns an empty array when the query is blank or no records match.

**Examples**

```typescript
// Search by country name
searchCountries("India");

// Search by official name
searchCountries("Republic of India");

// Search by alpha-2 code
searchCountries("IN");

// Search by alpha-3 code
searchCountries("IND");

// Search by calling code
searchCountries("+91");

// Search by currency code
searchCountries("INR");
```

Search is case-insensitive for string values and matches partial text.

```typescript
searchCountries("ind");
searchCountries("IND");
searchCountries("India");
```

These queries may return overlapping results because multiple fields are searched.

**⚠️ Important:** This is a substring search, not an exact lookup. Searching for a short query can return multiple records.

---

# 💱 Currency APIs

Currency APIs provide convenient access to currency reference records.

Useful for:
- 💰 Expense trackers and budgeting applications
- 💳 Payment and billing interfaces
- 🧾 Invoices and financial reports
- 🌐 Currency selection components
- 📊 Financial dashboards

## 5. `getCurrencyByCode(code)`

Find a currency by its currency code.

**Signature**

```typescript
function getCurrencyByCode(
  code: string
): Currency | undefined;
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `code` | `string` | Currency code, such as `"INR"` |

**Returns**

`Currency | undefined`

**Example**

```typescript
const currency = getCurrencyByCode("INR");

console.log(currency?.name);
```

The function trims surrounding whitespace and performs a case-insensitive exact match against `currency.code`.

```typescript
getCurrencyByCode("INR");
getCurrencyByCode("inr");
getCurrencyByCode(" INR ");
```

All three forms resolve to the same record when that code exists.

---

## 6. `getCurrencyByName(name)`

Find a currency by its name.

**Signature**

```typescript
function getCurrencyByName(
  name: string
): Currency | undefined;
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `name` | `string` | Currency name, such as `"Indian Rupee"` |

**Returns**

`Currency | undefined`

**Example**

```typescript
const currency = getCurrencyByName("Indian Rupee");

console.log(currency);
```

The function trims surrounding whitespace and performs a case-insensitive exact match against `currency.name`.

**Exact matching example**

```typescript
getCurrencyByName("Indian Rupee");
```

A partial name such as `"Rupee"` will not match unless it is itself the complete stored currency name. Use `searchCurrencies()` for partial matching.

---

## 7. `searchCurrencies(query)`

Search currencies by code, name, or symbol.

**Signature**

```typescript
function searchCurrencies(
  query: string
): Currency[];
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `query` | `string` | Search text |

**Fields searched**

- `code` — currency code
- `name` — currency name
- `symbol` — currency symbol

**Returns**

An array of matching currency records. Returns an empty array for a blank query or when no records match.

**Examples**

```typescript
// Search by currency code
searchCurrencies("INR");

// Search by currency name
searchCurrencies("Rupee");

// Search by symbol
searchCurrencies("₹");

// Search by partial text
searchCurrencies("dol");
```

The code and name searches are case-insensitive substring matches. Symbol matching uses the provided query directly.

**⚠️ Implementation note**

Your current `searchCurrencies()` callback needs a `return` statement. Without it, the `.filter()` callback returns `undefined`, so the search produces no matches.

Use this corrected implementation:

```typescript
export function searchCurrencies(
  query: string
): Currency[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();

  if (!normalizedQuery) {
    return [];
  }

  return currencies.filter((currency) =>
    currency.code.toLocaleLowerCase().includes(normalizedQuery) ||
    currency.name.toLocaleLowerCase().includes(normalizedQuery) ||
    currency.symbol.includes(query.trim())
  );
}
```

This preserves the intended behavior: partial matches across codes, names, and symbols.

---

## 8. `getCurrenciesCount()`

Get the number of currency records in the dataset.

**Signature**

```typescript
function getCurrenciesCount(): number;
```

**Parameters**

None.

**Returns**

A number representing the dataset's currency record count.

**Example**

```typescript
const count = getCurrenciesCount();

console.log(`Available currency records: ${count}`);
```

**💡 Note:** Since `currencies` is a statically imported dataset, it should normally always be an array. The fallback to `0` in the current implementation is generally unnecessary if the dataset is guaranteed to be defined.

---

## 9. `getCurrencies(codes)`

Retrieve multiple currencies by their codes.

**Signature**

```typescript
function getCurrencies(
  codes: string[]
): Currency[];
```

**Parameters**

| Parameter | Type | Description |
|---|---|---|
| `codes` | `string[]` | Array of currency codes to retrieve |

**Returns**

An array containing the matching currency records.

Returns an empty array if the input array is empty or contains no matching codes.

**Example**

```typescript
const selectedCurrencies = getCurrencies([
  "INR",
  "USD",
  "EUR",
]);

console.log(selectedCurrencies);
```

### Case-insensitive matching

The function trims each input code and normalizes it to uppercase.

```typescript
getCurrencies([
  "inr",
  " USD ",
  "eur",
]);
```

### Duplicate inputs

The implementation uses a `Set` to normalize the requested codes. Duplicate inputs do not duplicate output records.

```typescript
getCurrencies([
  "INR",
  "INR",
  "USD",
]);
```

Each matching currency appears at most once in the returned array, in the order in which it appears in the underlying `currencies` dataset.

### Unknown codes

Unknown currency codes are ignored.

```typescript
getCurrencies([
  "INR",
  "UNKNOWN",
]);
```

If `INR` exists, the returned array contains its record and excludes the unknown code.

---

# 🧩 Return Types at a Glance

| Function | Return type | No match / empty input |
|---|---|---|
| `getCountryByCode()` | `Country \| undefined` | `undefined` |
| `getCountryByAlpha3Code()` | `Country \| undefined` | `undefined` |
| `getCountryByNumericCode()` | `Country \| undefined` | `undefined` |
| `searchCountries()` | `Country[]` | `[]` |
| `getCurrencyByCode()` | `Currency \| undefined` | `undefined` |
| `getCurrencyByName()` | `Currency \| undefined` | `undefined` |
| `searchCurrencies()` | `Currency[]` | `[]` |
| `getCurrenciesCount()` | `number` | Dataset length |
| `getCurrencies()` | `Currency[]` | `[]` |

---

# 🛡️ Best Practices

### ✅ Use exact lookups for known identifiers

If you already have a country or currency code, use the corresponding lookup function rather than searching the entire dataset yourself.

### 🔎 Use search for user input

Use `searchCountries()` and `searchCurrencies()` when a user types into a search field or selection component.

### 🧱 Handle missing results

Always account for `undefined` from exact lookups.

```typescript
const country = getCountryByCode("IN");

if (!country) {
  console.log("Country not found");
  return;
}

console.log(country.names.common);
```

### 💡 Keep reference data separate from business logic

The library supplies reference data and lookup utilities. Application-specific validation, permissions, financial calculations, and exchange-rate conversion should remain separate.

---

# 📖 Related Documentation

- 🚀 **Getting Started** — installation and first steps
- 📚 **API Reference** — this document
- 📝 **README** — project overview
- 🤝 **Contributing Guide** — how to contribute
- 📋 **Changelog** — version history

---

<div align="center">

### 🌍 Open Reference Data

**Less boilerplate. More building. 💚**

</div>
