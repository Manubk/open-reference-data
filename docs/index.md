# 🌍 Open Reference Data

### Reusable reference data for JavaScript & TypeScript.

**Build more. Maintain less. Ship faster. 🚀**

Open Reference Data is an open-source npm library that provides reusable reference datasets and convenient lookup utilities for JavaScript and TypeScript applications.

From country information to currency metadata, access structured reference data without reinventing the wheel for every project.

<p align="center">

  <strong>🌍 Countries · 💱 Currencies · ⚡ Simple APIs · 📘 TypeScript</strong>

</p>

---

## 🚀 Get Started

Install Open Reference Data using npm:

```bash
npm install open-reference-data
```

Import the datasets and helpers you need:

```typescript
import {
  getCountryByCode,
  searchCountries,
  getCurrencyByCode,
  searchCurrencies,
} from "open-reference-data";

// 🌍 Find a country by its ISO alpha-2 code
const country = getCountryByCode("IN");

console.log(country?.names.common);

// 🔎 Search countries
const matchingCountries = searchCountries("India");

// 💱 Find a currency by its code
const currency = getCurrencyByCode("INR");

console.log(currency?.name);

// 🔎 Search currencies
const matchingCurrencies = searchCurrencies("Rupee");
```

*Note: These examples assume the functions are exported from the package's public entry point.*

**New here?** Follow the [Getting Started Guide](getting-started.md).

---

## ✨ Why Open Reference Data?

- 🌍 **Reusable datasets** — use structured reference data across projects.
- ⚡ **Convenient utilities** — look up records and search by supported fields.
- 📘 **TypeScript-friendly** — integrate typed data into your applications.
- 🧩 **Developer-focused** — straightforward APIs and predictable return values.
- 🔓 **Open source** — inspect, use, and contribute to the project.

Spend less time maintaining repetitive reference information and more time building features your users love.

---

## 📦 Available Datasets

### 🌍 Countries

Country and territory reference data for applications that need geographic identifiers and metadata.

**Use cases**

- 📝 Registration and address forms
- 📱 International phone number forms
- 🛒 E-commerce checkout
- 🌐 International applications
- 📊 Country-based filtering and reporting

**Available utilities**

| Function | Description |
|---|---|
| `getCountryByCode(code)` | Find by ISO alpha-2 code |
| `getCountryByAlpha3Code(code)` | Find by ISO alpha-3 code |
| `getCountryByNumericCode(code)` | Find by ISO numeric code |
| `searchCountries(query)` | Search supported country fields |

### 💱 Currencies

Currency reference data for financial and commerce applications.

**Use cases**

- 💰 Expense trackers and budgeting apps
- 🧾 Invoices and billing systems
- 💳 Payment interfaces
- 📈 Financial dashboards
- 🌐 Currency selection components

**Available utilities**

| Function | Description |
|---|---|
| `getCurrencyByCode(code)` | Find by currency code |
| `getCurrencyByName(name)` | Find by currency name |
| `searchCurrencies(query)` | Search by code, name, or symbol |
| `getCurrenciesCount()` | Get the number of currency records |
| `getCurrencies(codes)` | Retrieve multiple currencies by code |

---

## 📚 Documentation

Explore the guides to get the most out of Open Reference Data.

| Guide | Description |
|---|---|
| [🚀 Getting Started](getting-started.md) | Installation, imports, and usage examples |
| [📖 API Reference](api.md) | Function signatures, parameters, and return values |
| [🗂️ Data Structures](data-structure.md) | Dataset schemas and field definitions |
| [🤝 Contributing](contributing.md) | Development and contribution guidelines |

*Links to guides that have not yet been created can be added when those files are ready.*

---

## 🛠️ Designed for Real Projects

Open Reference Data can be integrated into many kinds of applications:

- ⚛️ React and Next.js applications
- 📱 React Native and Expo projects
- 🟢 Node.js services
- 💻 JavaScript and TypeScript applications
- 💰 Finance, commerce, and productivity tools

The library supplies reference data and lookup utilities. Application-specific validation, exchange-rate conversion, and business rules remain the responsibility of your application.

---

## 🧩 Simple and Predictable APIs

Lookup functions return a matching record or `undefined` when no record is found.

Search functions return arrays, including empty arrays when no matches are found.

```typescript
const country = getCountryByCode("IN");

if (country) {
  console.log(country.names.common);
} else {
  console.log("Country not found");
}
```

💡 **Tip:** Handle missing records and nullable fields explicitly to keep your application reliable.

---

## 🤝 Open Source & Contributions

Great reference data gets better with community contributions. 💚

You can help by:

- 🐛 Reporting incorrect or missing data
- 💡 Suggesting new datasets and features
- 🧪 Improving tests and validation
- 📚 Improving documentation
- 🔧 Contributing code

Please review the project's contribution guidelines before submitting changes.

---

## ❓ Frequently Asked Questions

### Is Open Reference Data free?

The project is intended to be open source. Check the repository's license for the exact terms of use.

### Does it support TypeScript?

The library is designed for JavaScript and TypeScript. Check the published package's type declarations for the supported public types.

### Does currency data provide live exchange rates?

No. Currency reference data and live exchange rates are different things. Exchange-rate conversion requires a separate rate source.

### Can I use it in commercial applications?

Refer to the project's actual license and any applicable third-party dataset or asset terms.

---

## 💚 Build More. Maintain Less.

**Open Reference Data** helps developers spend less time rebuilding reference information and more time creating useful applications.

🌍 Reusable data. ⚡ Simple APIs. 🚀 Better development.

