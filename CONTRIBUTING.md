# 🌍 Contributing to Open Reference Data

First of all, **thank you for being here!** 💚

Open Reference Data is built to make reliable, structured reference data easier to use in JavaScript and TypeScript projects. Whether you're fixing a country name, improving validation, writing documentation, or proposing an entirely new dataset, your contribution can make a difference. 🚀

You don't need to be an expert to contribute. If you've found something that can be improved, we'd love to hear from you!

> 💡 **Our philosophy:** Better data. Cleaner code. Happier developers.

---

## 🧭 What Can You Contribute?

There are plenty of ways to get involved!

| Contribution | How you can help |
|---|---|
| 🌎 Country data | Correct names, codes, capitals, currencies, or calling codes. |
| 🚩 Flag data | Improve flag emoji or SVG resource references. |
| 🐛 Bug fixes | Fix unexpected behavior, build issues, or package problems. |
| 🧪 Testing | Add tests and improve data validation. |
| 📚 Documentation | Make the README, examples, and guides easier to understand. |
| ⚡ Improvements | Enhance performance, maintainability, or developer experience. |
| 🌱 New datasets | Propose currencies, banks, card networks, languages, and more. |

**Every useful contribution counts**, whether it's one corrected value or a major improvement.

## 🚀 Getting Started

Ready to contribute? Let's get your development environment ready!

### 1️⃣ Fork the repository

Head to the GitHub repository and click **Fork** to create your own copy.

### 2️⃣ Clone your fork

Replace `YOUR_USERNAME` with your GitHub username.

```bash
git clone https://github.com/YOUR_USERNAME/open-reference-data.git

cd open-reference-data
```

### 3️⃣ Install dependencies

```bash
npm install
```

Make sure you have Git and a Node.js version supported by the project installed.

### 4️⃣ Create a branch

Keep each contribution focused on a specific task.

```bash
git checkout -b fix/country-data
```

Some suggested branch names:

- `fix/` 🛠️ — Bug fixes and data corrections.
- `feat/` ✨ — New features or datasets.
- `docs/` 📖 — Documentation updates.
- `test/` 🧪 — Tests and validation improvements.
- `refactor/` ♻️ — Internal code improvements.

### 5️⃣ Make your changes

Make your changes, follow the existing project conventions, and keep your code clean and easy to understand.

Before running commands, check the scripts available in `package.json`:

```bash
npm run
```

Use the validation, test, lint, and build scripts that are actually configured in the repository.

---

## 🌎 Country Data Contribution Rules

Our goal is to keep country data **consistent, understandable, and trustworthy**.

Every record should follow the project's documented schema.

```ts
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

### 📋 Keep these rules in mind

| Field | Rule |
|---|---|
| `code` | Use the appropriate ISO 3166-1 alpha-2 code, such as `"IN"`. |
| `alpha3Code` | Use the corresponding alpha-3 code, such as `"IND"`. |
| `numericCode` | Store it as a string, such as `"356"`. |
| `names.common` | Provide a non-empty common name. |
| `names.official` | Provide a non-empty official name. |
| `callingCodes` | Use an array of strings; use `[]` when no applicable value is available. |
| `currencyCode` | Use an array of currency-code strings; use `[]` when no applicable value is available. |
| `region` | Use a string or `null`. |
| `subregion` | Use a string or `null`. |
| `capital` | Use a string or `null`. |
| `flag.emoji` | Use a verified flag emoji or `null`. |
| `flag.svg` | Use a permitted, verified SVG resource URL or `null`. |

### 💎 Golden rules for clean data

- ✅ Follow the existing schema and naming conventions.
- 🔍 Verify factual changes against reliable sources.
- 🧹 Check for duplicate records.
- 🔢 Preserve numeric codes as strings.
- 📦 Keep arrays as arrays, even when they contain only one value.
- 🚫 Never invent missing values or flag URLs.
- 📝 Explain unusual cases in your pull request.
- ⚠️ Discuss schema changes before modifying public fields.

**Remember:** Missing data is better than fabricated data. If a value is unavailable or not applicable, represent it according to the documented schema.

## 🔎 Verify Before You Modify

Reference data can affect thousands of applications. Accuracy matters!

Before submitting a data correction:

1. 🔍 Find a reliable source for the proposed value.
2. 🧾 Record the source name and URL.
3. 📅 Include the verification date when useful.
4. ⚖️ Check applicable licensing and attribution requirements.
5. 📝 Explain why the existing value needs to change.

Useful references may include ISO standards, official government publications, maintained statistical datasets, and documented flag asset providers.

Choose sources appropriate to the field you're changing. A source that verifies a country code may not verify its current currency associations or flag image.

> 🛡️ **Trust over guesswork:** Don't submit data simply because it looks right. Make it verifiable.

## 🧪 Test Your Changes

Before opening a pull request, check that your changes work as expected.

Depending on the contribution, testing may include:

- [ ] Valid JSON and expected file formats.
- [ ] Required fields and correct data types.
- [ ] Valid country-code formats.
- [ ] Duplicate identifier detection.
- [ ] Correct handling of `null` and empty arrays.
- [ ] Calling-code and currency-code format checks.
- [ ] Flag URL format checks.
- [ ] TypeScript compilation.
- [ ] Automated tests.
- [ ] Successful package build.
- [ ] Correct public exports and package contents.

Run the relevant commands configured by the project. For example, if these scripts exist:

```bash
npm test
npm run build
```

Run any additional validation or linting scripts required by the repository.

If a check fails, investigate it before submitting your changes. If you cannot run a required check, explain why.

⚠️ **Important:** Passing automated validation does not prove that a fact is correct. Factual changes still need reliable sources.

## 💻 Code Style & Best Practices

Let's keep the codebase friendly to developers now and in the future. ✨

- 🧩 Follow the existing project structure.
- 📖 Write clear, descriptive names.
- ♻️ Reuse existing utilities where practical.
- 📦 Avoid unnecessary dependencies.
- 🎯 Keep changes focused on the problem you're solving.
- 🧪 Add or update tests when behavior changes.
- 📝 Update documentation when public behavior or schemas change.
- 🔒 Never commit passwords, access tokens, or secrets.
- 🚫 Avoid unrelated formatting changes in large data files.

If you want to introduce a new dependency or significantly change the package architecture, open an issue first to discuss the approach.

## 📝 Write Clear Commit Messages

A good commit message helps everyone understand what changed.

Examples:

```text
fix: correct country calling code
docs: improve country schema documentation
test: add identifier validation tests
feat: propose currency reference data
```

These are suggested conventions. Follow any commit-message rules adopted by the project.

Try to keep commits focused and descriptive. Your future self will thank you! 😄

## 🔀 Submit a Pull Request

Ready to share your work? Let's get it reviewed!

### Before submitting

- [ ] I followed the project conventions.
- [ ] I checked my changes for accidental modifications.
- [ ] I verified factual changes against reliable sources.
- [ ] I documented sources and attribution requirements where applicable.
- [ ] I added or updated relevant tests.
- [ ] Required validation checks pass, or any limitations are explained.
- [ ] I updated documentation where necessary.
- [ ] I considered backward compatibility.

### Open your pull request

1. 📤 Push your branch to your fork.
2. 🔗 Open a pull request against the repository's designated default branch.
3. 📝 Explain what changed and why.
4. 🔍 Include relevant sources for data corrections.
5. 🧪 Mention the tests and checks you ran.
6. 💬 Respond constructively to review feedback.

A helpful pull request description answers three questions:

- **What changed?**
- **Why is the change needed?**
- **How was it verified?**

Maintainers may request further changes or decline contributions that are unsupported, out of scope, incompatible with project policies, or inconsistent with licensing requirements.

Don't worry if your first pull request isn't perfect. Reviews are part of building great software together. 🤝

## 🌱 Want to Add a New Dataset?

Have an idea for expanding Open Reference Data? We'd love to hear about it!

Potential future datasets could include:

- 💱 Currencies and currency metadata.
- 🏦 Banks and financial institutions.
- 💳 Card networks.
- 💸 Payment providers.
- 🗣️ Languages and locales.
- 🕒 Time zones.
- 🗺️ States, provinces, and administrative regions.

Before implementing a new dataset, open an issue describing:

- 🎯 The problem it solves.
- 🧱 The proposed schema and TypeScript types.
- 🔎 The intended data sources.
- ⚖️ Licensing and redistribution requirements.
- 🧪 The validation and testing approach.
- 🔄 How the data can be maintained over time.

This helps us build a consistent library instead of a collection of unrelated datasets.

## ⚖️ Licensing & Attribution

Before contributing code or data, make sure you have the right to submit it.

- 📜 Follow the project's license.
- 🔎 Check the licenses of external datasets and assets.
- 🏷️ Include required attribution.
- 🚫 Don't submit proprietary or improperly redistributed material.
- 📝 Disclose third-party sources and transformations.

Publicly accessible information and image URLs are not automatically free to redistribute.

If the project introduces a formal contribution agreement, follow the instructions provided by the maintainers.

## 🔐 Reporting Security Issues

Found a potential security vulnerability?

Please report it privately through the security reporting channel documented by the repository instead of publishing sensitive details in a public issue.

If no private reporting channel is configured, contact the maintainers through an appropriate private channel before publicly disclosing the issue.

Never include secrets, credentials, or private information in reports.

## 💬 Need Help?

Not sure where to start? That's completely fine!

- 🐛 Found a bug? Open an issue.
- 🌎 Found incorrect data? Share the source and proposed correction.
- 💡 Have a feature idea? Start a discussion or open an issue.
- 📖 Need usage instructions? Check the `README.md`.
- 🤝 Want to contribute? Pick a manageable issue and get started!

Before opening a new issue, search existing issues and pull requests to avoid duplicate discussions.

## 💚 A Final Thank You

Open Reference Data grows through people who care about making data better.

Every correction, test, documentation improvement, and thoughtful suggestion helps make the library more useful for developers everywhere.

Whether you contribute one line or a thousand, **you're helping build something valuable.** 🌍✨

**Happy contributing! 🚀**

*Open Reference Data — Better data. Cleaner code. Happier developers.* 💚
