# 🌍 Open Reference Data

**Open Reference Data** is an open-source reference data library designed to provide structured, reusable, and developer-friendly datasets for JavaScript and TypeScript applications.

 The project begins with comprehensive country reference data, including country codes, names, calling codes, currencies, geographic regions, capitals, and flag information.

The goal is to make reliable reference data easy to access, validate, maintain, and reuse across web applications, mobile apps, APIs, and backend services.

## ✨ Features

- 🌎 Country reference data in a consistent structure.
- 🔤 ISO 3166-1 alpha-2 and alpha-3 country codes.
- 🔢 Numeric country codes.
- 🏷️ Common and official country names.
- 📞 International calling codes.
- 💱 Associated currency codes.
- 🗺️ Geographic regions and subregions.
- 🏙️ Capital city information.
- 🚩 Flag emoji and SVG flag references.
- 📦 Structured JSON data.
- 💙 TypeScript-friendly data models.
- ✅ Data validation and consistency checks.
- 🧩 Designed for reusable datasets and future expansion.
- 🆓 Open-source and community-driven.

## 📦 Installation

Install the package using your preferred package manager.

**npm**

```
npm install open-reference-data
```

**pnpm**

```
pnpm add open-reference-data
```

**Yarn**

```
yarn add open-reference-data
```

## 🚀 Getting Started

Import the country dataset using the package's supported export.

```
import { countries } from "open-reference-data";

// Example: find India
const india = countries.find(
  (country) => country.code === "IN"
);

console.log(india);
```

> **Note:** The import name above is illustrative. Replace it with the actual public export implemented by the package before publishing.
> 

### Example country record

```
{
  "code": "IN",
  "alpha3Code": "IND",
  "numericCode": "356",
  "names": {
    "common": "India",
    "official": "Republic of India"
  },
  "callingCodes": ["+91"],
  "currencyCode": ["INR"],
  "region": "Asia",
  "subregion": "Southern Asia",
  "capital": "New Delhi",
  "flag": {
    "emoji": "🇮🇳",
    "svg": "https://flagcdn.com/in.svg"
  }
}
```

The record above illustrates the data format. Individual values should be verified against the project's maintained source data.

## 🌍 Country Data

Each country record follows a consistent schema intended to support common application requirements.

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` | ISO 3166-1 alpha-2 code |
| `alpha3Code` | `string` | ISO 3166-1 alpha-3 code |
| `numericCode` | `string` | ISO 3166-1 numeric code |
| `names.common` | `string` | Common country name |
| `names.official` | `string` | Official country name |
| `callingCodes` | `string[]` | Associated international calling codes |
| `currencyCode` | `string[]` | Associated currency codes |
| `region` | `string | null` | Geographic region |
| `subregion` | `string | null` | Geographic subregion |
| `capital` | `string | null` | Capital city, where available |
| `flag.emoji` | `string | null` | Unicode flag emoji, where available |
| `flag.svg` | `string | null` | SVG flag resource URL, where available |

### Country codes

The library uses standardized country identifiers where applicable.

```
country.code;       // "IN"
country.alpha3Code; // "IND"
country.numericCode; // "356"
```

Country codes are useful for:

- Country selectors and dropdowns.
- Address forms and registration flows.
- Internationalization.
- API integrations.
- Database records and country filters.
- Shipping, billing, and payment workflows.

### Country names

Common and official names are separated to support different display and administrative requirements.

```
country.names.common;
// "India"

country.names.official;
// "Republic of India"
```

Use the common name for everyday interfaces and the official name when a formal designation is needed.

### Calling codes

Calling codes are represented as arrays to support multiple associated calling codes where the dataset provides them.

```
country.callingCodes;
// Example: ["+91"]
```

Calling codes are not necessarily unique to a single country or territory. They should not be used alone as country identifiers.

Some records may have an empty array when no applicable value is available in the source dataset.

### Currency codes

Currency codes are represented as arrays to accommodate datasets that associate more than one currency with a country or territory.

```
country.currencyCode;
// Example: ["INR"]
```

These values represent reference data, not live exchange rates or a guarantee that a currency is the only currency accepted locally.

### Geographic information

```
country.region;
// Example: "Asia"

country.subregion;
// Example: "Southern Asia"

country.capital;
// Example: "New Delhi"
```

Geographic fields may be `null` when a value is unavailable or not applicable.

### Flag information

Flag information is grouped into a single object.

```
country.flag.emoji;
// Example: "🇮🇳"

country.flag.svg;
// Example: "https://flagcdn.com/in.svg"
```

Either field may be `null` when the relevant representation is unavailable.

SVG values are resource URLs, not embedded SVG markup. Applications should handle failed image requests and avoid assuming every country has a usable flag asset.

## 🧑‍💻 TypeScript

The following interfaces illustrate the intended data model.

```
export interface CountryFlag {
  emoji: string | null;
  svg: string | null;
}

export interface CountryNames {
  common: string;
  official: string;
}

export interface Country {
  code: string;
  alpha3Code: string;
  numericCode: string;

  names: CountryNames;

  callingCodes: string[];
  currencyCode: string[];

  region: string | null;
  subregion: string | null;
  capital: string | null;

  flag: CountryFlag;
}
```

Use the actual exported types from the package if they are available in your installed version.

## 🔎 Common Use Cases

### 1. Country dropdown

```
const options = countries.map((country) => ({
  value: country.code,
  label: country.names.common,
}));
```

### 2. Find a country by ISO alpha-2 code

```
const country = countries.find(
  (item) => item.code === "IN"
);
```

### 3. Find a country by alpha-3 code

```
const country = countries.find(
  (item) => item.alpha3Code === "IND"
);
```

### 4. Search by country name

```
const query = "india".toLowerCase();

const results = countries.filter((country) =>
  country.names.common
    .toLowerCase()
    .includes(query)
);
```

### 5. Display a country flag

```
{country.flag.emoji && (
  <span>{country.flag.emoji}</span>
)}
```

For an SVG URL in a web application:

```
{country.flag.svg && (
  <img
    src={country.flag.svg}
    alt={`${country.names.common} flag`}
    width={24}
    height={18}
  />
)}
```

Always provide a fallback when the flag value is `null` or the remote image fails to load.

## 🛡️ Data Quality and Validation

The project aims to maintain a consistent and dependable dataset through automated validation.

Validation should cover the following areas:

- Required fields are present.
- Alpha-2 country codes use the expected format.
- Alpha-3 country codes use the expected format.
- Numeric country codes preserve leading zeros where applicable.
- Country codes are unique within the dataset.
- Common and official names are non-empty strings.
- Calling codes use a consistent representation.
- Currency codes follow the expected code format.
- Geographic fields contain valid strings or `null`.
- Flag fields contain valid strings or `null`.
- Flag URLs use the expected URL format.
- Duplicate records are detected.
- The dataset is valid JSON.
- The package builds and its public exports work as documented.

**Important:** Format validation does not automatically establish factual correctness. Country codes, currencies, calling codes, geographic information, and flag resources should also be checked against authoritative sources.

## 🌐 Data Coverage

The country dataset is intended to cover the country and territory entries selected for the project, based on its documented reference sources.

Coverage should be evaluated against the project's chosen inclusion policy rather than assuming every dataset uses the same definition of a country.

For clarity:

- ISO country-code coverage and United Nations member-state lists are not identical.
- Territories and special geographic areas may have their own entries.
- Some fields may legitimately be missing.
- Currency and calling-code associations can change over time.
- Flag availability depends on the selected asset provider.

Refer to the dataset and release notes for the actual coverage and any known limitations.

## 📚 Data Sources and Attribution

Open Reference Data is intended to use documented sources for its reference datasets.

Before publishing, maintain a source record for each dataset, including:

- Source name and URL.
- Applicable standard or dataset version.
- Retrieval or verification date.
- License and attribution requirements.
- Any transformations or normalization applied.
- Known limitations and exceptions.

Potential sources to evaluate include:

- ISO 3166 — country identifiers.
- ISO 4217 — currency identifiers.
- United Nations Statistics Division — geographic and statistical reference information.
- FlagCDN — flag image resources, subject to the provider's applicable terms.

These are potential references, not a claim that every field in the current dataset has already been verified against them. Check each source's terms before redistribution.

## 🔄 Updates and Maintenance

The dataset should be reviewed periodically to identify:

- Changes to standardized identifiers.
- New or revised geographic entries.
- Updated currency associations.
- Changes in calling-code data.
- Missing or invalid flag resources.
- Corrections reported by the community.

Changes should be documented in the changelog and released through versioned npm packages.

Consumers should review release notes before upgrading when relying on country names, dataset coverage, or other values that may change.

## 🧩 Project Roadmap

The library is designed to expand beyond country reference data.

Potential future datasets include:

- 
    
    Countries and territories.
    
- 
    
    Currencies and currency metadata.
    
- 
    
    International calling codes.
    
- 
    
    Banks and financial institutions.
    
- 
    
    Card networks.
    
- 
    
    Payment providers.
    
- 
    
    Languages and locales.
    
- 
    
    Time zones.
    
- 
    
    States, provinces, and administrative regions.
    

Future datasets will be added only when their schemas, sources, licensing, and maintenance requirements are clearly documented.

## 🤝 Contributing

Contributions, corrections, and suggestions are welcome.

Before submitting a contribution:

1. Check existing issues and pull requests.
2. Review the dataset schema and inclusion policy.
3. Verify changes against reliable sources.
4. Preserve the expected data types and normalization rules.
5. Add or update validation tests.
6. Document the source and any relevant licensing requirements.
7. Explain the change in the pull request.

Please avoid submitting unverified data or changing existing fields without considering backward compatibility.

For larger changes, open an issue first to discuss the proposed approach.

## 🐛 Reporting Issues

If you discover missing, incorrect, or inconsistent data, open an issue in the project repository.

Please include:

- The affected country or record.
- The field that needs correction.
- The current value.
- The proposed value.
- A reliable source supporting the correction.

For bugs involving package installation or exports, include the package version, runtime, and a minimal reproduction where possible.

## 📜 Versioning and Compatibility

The project follows Semantic Versioning where applicable.

- **Patch releases:** Backward-compatible fixes and data corrections.
- **Minor releases:** Backward-compatible features and additions.
- **Major releases:** Breaking changes to public APIs, data schemas, or documented behavior.

Because reference datasets evolve, consumers should review release notes even for updates that do not change the API.

The exact compatibility policy should be documented alongside the package's release process.

## 📄 License

This project is distributed under the license specified in the repository's `LICENSE` file.

**Before publishing:** Add the intended license file and verify that both the code and included datasets can legally be distributed under the selected terms. Third-party data and flag assets may have separate licensing or attribution requirements.

## 💬 Community and Support

- **Issues:** Report a problem
- **Repository:** View the source code
- **npm:** View the package

Replace `YOUR_USERNAME` with your GitHub username and verify these URLs before publishing.

## 📄 License

Open Reference Data is licensed under the MIT License.
See the [LICENSE](./LICENSE) file for details.

## ⭐ Support the Project

If you find Open Reference Data useful:

- Star the repository.
- Report data issues.
- Contribute verified corrections.
- Share the package with other developers.

Community contributions help keep reference data useful, consistent, and accessible.

---

**Open Reference Data** — structured reference data for modern applications.