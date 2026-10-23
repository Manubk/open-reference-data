# 🚀 Getting Started with Open Reference Data

**Build smarter. Ship faster. Stop reinventing reference data.**

Welcome to **Open Reference Data** 🌍 — an open-source JavaScript and TypeScript library designed to make reusable reference datasets easy to access and integrate into your applications.

Whether you're building a finance dashboard, an e-commerce platform, a registration form, or a global application, Open Reference Data helps you work with structured reference information without maintaining your own datasets.

✨ **Write less boilerplate. Reuse reliable data. Focus on building great products.**

---

## 📦 1. Installation

Getting started takes just a few seconds!

Choose your favorite package manager:

**npm**
```bash
npm install open-reference-data
```

**pnpm**
```bash
pnpm add open-reference-data
```

**yarn**
```bash
yarn add open-reference-data
```

> 💡 **Tip:** If the package hasn't been published to npm yet, you can test it locally using your package manager's local linking or workspace features.

## ⚡ 2. Import and Start Using It

Once installed, import the datasets you need into your application.

```typescript
import {
  countries,
  currencies,
} from "open-reference-data";
```

Now you can start working with the available reference data.

```typescript
console.log(countries);
console.log(currencies);
```

That's it! 🎉

No need to manually maintain the same reference information across multiple projects.

> 📝 The imports above assume these datasets are exported by your installed package version. Check your package's public exports to confirm the available names.

---

## 🌍 3. Explore Country Data

Need country information for your next project? You're in the right place!

Country data can help you build:

- 📝 Registration and address forms
- 📱 Country and calling-code selectors
- 🛒 E-commerce checkout experiences
- 🌐 International applications
- 📊 Country-based reports and filters
- 🚚 Shipping and billing interfaces

### 🔎 Get all countries

```typescript
import { countries } from "open-reference-data";

console.log(countries);
```

### 🏷️ Display country names

If your country records use a nested `names` structure:

```typescript
for (const country of countries) {
  console.log(country.names.common);
}
```

### 🏳️ Display flag information

```typescript
for (const country of countries) {
  console.log(country.flag.emoji);
  console.log(country.flag.svg);
}
```

Some values may be unavailable. Always handle missing flag representations gracefully.

### 🧩 What's inside a country record?

The intended country schema includes fields like these:

| Field | What it tells you |
|---|---|
| `code` | Two-letter country code, such as `IN` |
| `alpha3Code` | Three-letter country code, such as `IND` |
| `numericCode` | Numeric ISO country code |
| `names.common` | Common country name |
| `names.official` | Official country name |
| `callingCodes` | International calling codes |
| `currencyCode` | Associated currency codes, if represented by this field |
| `region` | Geographic region |
| `subregion` | Geographic subregion |
| `capital` | Capital city |
| `flag.emoji` | Country flag emoji |
| `flag.svg` | SVG flag URL |

💡 The exact property names and types should match the schema exported by your installed version.

---

## 💰 4. Explore Currency Data

Building something involving money? Currency reference data can make your application easier to maintain.

Useful for:

- 💳 Expense trackers and budgeting apps
- 🛍️ Online stores
- 🧾 Invoices and billing systems
- 📈 Financial dashboards
- 🌐 International payment interfaces
- ⚙️ Currency selection settings

### 📚 Import currencies

```typescript
import { currencies } from "open-reference-data";

console.log(currencies);
```

### 🔍 Look up a currency

If your package exposes a currency lookup helper, you can use it to find a currency by code.

For example, a helper named `getCurrencyByCode` might be used like this:

```typescript
const currency = getCurrencyByCode("INR");

if (currency) {
  console.log(currency);
} else {
  console.log("Currency not found");
}
```

⚠️ `getCurrencyByCode` is an illustrative API name until confirmed against the package's actual exports.

**Remember:** Currency reference data describes currencies. It doesn't automatically provide live exchange rates or convert monetary amounts.

---

## 🛠️ 5. Built for TypeScript

Type safety makes development more predictable. If your package exports its dataset types, you can reuse them in your own functions and components.

```typescript
import type { Country } from "open-reference-data";
```

For example:

```typescript
function getCountryLabel(country: Country): string {
  return country.names.common;
}
```

This example assumes the package exports `Country` and uses the `names.common` field.

### ✅ TypeScript best practices

- 🧱 Reuse the library's exported types.
- 🛡️ Handle nullable and optional fields.
- 🔑 Use ISO codes as stable identifiers.
- 🔢 Keep numeric codes as strings to preserve leading zeros.
- 🔄 Avoid duplicating the same interfaces in every project.

---

## 📝 6. Build Better Forms

Reference datasets are especially useful when building dropdowns and selection components.

For example, you can transform country records into options for a dropdown:

```typescript
const countryOptions = countries.map((country) => ({
  label: country.names.common,
  value: country.code,
}));
```

Your UI component can then use these options to display country names while storing stable country codes.

The same pattern can be used for currencies, regions, and other supported datasets.

🎯 **Pro tip:** Keep display labels separate from stored values. Names can vary by language or formatting, but standardized codes are more suitable for matching records.

---

## 🛡️ 7. Handle Missing Data Like a Pro

Not every reference field is available for every record. Your application should be prepared for that.

```typescript
const capital = country.capital ?? "Not available";
const flagUrl = country.flag?.svg ?? null;
```

Adapt the example to the actual types in your package.

### Why does this matter?

- 🌍 Some geographic information may be unavailable.
- 🏳️ A flag representation may be missing.
- 📞 Calling codes may be absent from a record.
- 💱 Currency associations may differ by country and dataset.

**Good practice:** Treat missing data as a normal case, not automatically as a data error.

---

## 🧠 8. Best Practices

A few small decisions can make your application much more reliable.

<blockquote>
  **🔑 Prefer standardized codes**

  Use ISO country and currency codes instead of matching records by display names.
</blockquote>

<blockquote>
  **🛡️ Validate external input**

  A reference dataset helps you look up known records, but user-provided codes should still be checked before use.
</blockquote>

<blockquote>
  **🧮 Keep financial logic separate**

  Currency metadata isn't an exchange-rate service or a replacement for precise monetary arithmetic.
</blockquote>

<blockquote>
  **🎨 Treat flags as presentation assets**

  Provide fallbacks when emojis or SVG URLs are unavailable, and respect the relevant asset provider's terms.
</blockquote>

<blockquote>
  **🔄 Keep your dependencies updated**

  Review release notes before upgrading, especially when dataset fields or public exports change.
</blockquote>

---

## 🧯 9. Troubleshooting

Having trouble? Here are a few quick fixes.

### ❌ Module not found

Check whether the package is installed:

```bash
npm ls open-reference-data
```

If necessary, install it again and verify the import name.

### ❌ Export not found

Make sure the function or dataset is part of the package's public API. A function defined internally isn't automatically available to consumers.

### ❌ TypeScript errors

Check the published type declarations, actual property names, and whether a field can be `null` or `undefined`.

### ❌ Missing flag or country information

Inspect the specific record before assuming the dataset is incorrect. Some fields may be legitimately unavailable.

### ❌ Changes aren't appearing

Check your installed package version and reinstall or rebuild as appropriate.

---

## 🤝 10. Contribute to Open Reference Data

Open-source projects become better when developers collaborate! 💚

You can help by:

- 🐛 Reporting incorrect or missing data.
- 💡 Suggesting useful datasets and features.
- 🧪 Adding tests and validation.
- 📚 Improving examples and documentation.
- 🔧 Submitting fixes and enhancements.

Before contributing, review the repository's contribution guidelines and run the project's tests and build.

---

## 🎯 What's Next?

You're ready to start exploring Open Reference Data!

- 🌍 Integrate country data into your application.
- 💰 Use currency metadata where supported.
- 🧩 Reuse exported types.
- ⚙️ Explore the package's public API.
- 🤝 Contribute improvements to the project.

---

<div align="center">

### 🌍 Open Reference Data

**One library. Reusable reference data. Less repetitive work.**

Built for developers who want to spend less time maintaining reference data and more time building great applications. 💚

</div>
