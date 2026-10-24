# 🌍 Open Reference Data

**Open Reference Data** is an open-source reference-data library for JavaScript and TypeScript applications. It provides structured country and currency datasets with lookup and search utilities.

## ✨ Features

- Country and currency reference data
- Country identifiers, names, calling codes, geographic fields, and flag references
- Currency codes, names, and symbols
- Lookup and search helpers
- TypeScript-friendly types
- Automated tests for data consistency and public APIs

## 📦 Installation

```bash
npm install open-reference-data
```

Or use `pnpm add open-reference-data` or `yarn add open-reference-data`.

## 🚀 Quick start

```ts
import {
  countries,
  getCountryByCode,
  searchCountries,
  getCurrencyByCode,
  searchCurrencies,
} from "open-reference-data";

// Get a country by its ISO alpha-2 code
const india = getCountryByCode("IN");

// Search countries by name or supported fields
const matches = searchCountries("India");

// Get a currency by its code
const rupee = getCurrencyByCode("INR");

// Search currencies
const currencyMatches = searchCurrencies("dollar");

// Browse the full country dataset
console.log(countries.length);
```

Lookup functions return `undefined` when no record matches; search functions return an array, which may be empty. Check the API reference for exact behavior and available fields.

## 🗂️ Documentation

- [Getting Started](./docs/getting-started.md) — installation, imports, and usage examples
- [API Reference](./docs/api.md) — public functions, parameters, and return values
- [Contributing](./CONTRIBUTING.md) — contribution guidelines, if available
- [Changelog](./CHANGELOG.md) — release history, if available

## 🧾 Data and attribution

The dataset contains normalized reference information intended for common application use cases. Values can be unavailable, and associations such as currencies or calling codes may change over time. The data is not a source of live exchange rates.

Before release, consult the project’s documented data sources and verify their licensing and attribution requirements. Third-party datasets and flag assets may have terms separate from this package’s code.

## 🤝 Contributing

Corrections and improvements are welcome. When reporting a data issue, include the affected record, field, proposed correction, and a reliable source. Add or update tests when changing data or public behavior.

## 📄 License

This project is licensed under the [MIT License](./LICENSE). Review the license and third-party data terms before redistributing the package.

---

**Open Reference Data** — structured reference data for modern applications.
