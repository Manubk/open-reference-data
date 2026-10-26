# 🗂️ Data Models

## Country

```typescript
interface Country {
  code: string;
  alpha3Code: string;
  numericCode: string;
  names: { common: string; official: string | null };
  callingCodes: string[];
  currencyCode: string[];
  region: string | null;
  subregion: string | null;
  capital: string | null;
  flag: { emoji: string | null; svg: string | null };
}
```

## Currency

```typescript
interface Currency {
  code: string;
  name: string;
  symbol: string | null;
  numericCode: string;
  minorUnit: number;
}
```

## Bank

```typescript
interface Bank {
  id: string;
  name: string;
  logo: BankLogo;
}
```

## BankLogo

```typescript
interface BankLogo {
  logo?: { svg?: BankLogoAsset; png?: BankLogoAsset };
  icon?: { svg?: BankLogoAsset; png?: BankLogoAsset };
}

interface BankLogoAsset {
  local?: string;
  cdn?: string;
}
```


## Credit Card Network

```typescript
interface CreditCardNetwork {
  id: string;
  name: string;
  logo?: CreditCardNetworkLogo;
}

interface CreditCardNetworkLogo {
  svg?: CreditCardNetworkLogoAsset;
  png?: CreditCardNetworkLogoAsset;
}

interface CreditCardNetworkLogoAsset {
  local?: string;
  cdn?: string;
}
```