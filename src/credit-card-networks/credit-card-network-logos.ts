import type { CreditCardNetworkLogo } from "./credit-card-network.types";

const LOCAL_BASE = "../../assets/credit-card-networks-logos";
const CDN_BASE = "https://cdn.jsdelivr.net/npm/open-reference-data@2.0.0/assets/credit-card-networks-logos";

export const creditCardNetworkLogos: Record<string, CreditCardNetworkLogo> = {
  "american-express": {
    svg: {
      local: `${LOCAL_BASE}/american-express/logo.svg`,
      cdn: `${CDN_BASE}/american-express/logo.svg`,
    },
  },
  "cabal": {
    svg: {
      local: `${LOCAL_BASE}/cabal/logo.svg`,
      cdn: `${CDN_BASE}/cabal/logo.svg`,
    },
  },
  "cartes-bancaires": {
    svg: {
      local: `${LOCAL_BASE}/cartes-bancaires/logo.svg`,
      cdn: `${CDN_BASE}/cartes-bancaires/logo.svg`,
    },
  },
  "diners-club": {
    svg: {
      local: `${LOCAL_BASE}/diners-club/logo.svg`,
      cdn: `${CDN_BASE}/diners-club/logo.svg`,
    },
  },
  "discover": {
    svg: {
      local: `${LOCAL_BASE}/discover/logo.svg`,
      cdn: `${CDN_BASE}/discover/logo.svg`,
    },
  },
  "elo": {
    svg: {
      local: `${LOCAL_BASE}/elo/logo.svg`,
      cdn: `${CDN_BASE}/elo/logo.svg`,
    },
  },
  "hipercard": {
    svg: {
      local: `${LOCAL_BASE}/hipercard/logo.svg`,
      cdn: `${CDN_BASE}/hipercard/logo.svg`,
    },
  },
  "jcb": {
    svg: {
      local: `${LOCAL_BASE}/jcb/logo.svg`,
      cdn: `${CDN_BASE}/jcb/logo.svg`,
    },
  },
  "mastercard": {
    svg: {
      local: `${LOCAL_BASE}/mastercard/logo.svg`,
      cdn: `${CDN_BASE}/mastercard/logo.svg`,
    },
  },
  "mir": {
    svg: {
      local: `${LOCAL_BASE}/mir/logo.svg`,
      cdn: `${CDN_BASE}/mir/logo.svg`,
    },
  },
  "rupay": {
    svg: {
      local: `${LOCAL_BASE}/rupay/logo.svg`,
      cdn: `${CDN_BASE}/rupay/logo.svg`,
    },
  },
  "troy": {
    svg: {
      local: `${LOCAL_BASE}/troy/logo.svg`,
      cdn: `${CDN_BASE}/troy/logo.svg`,
    },
  },
  "unionpay": {
    svg: {
      local: `${LOCAL_BASE}/unionpay/logo.svg`,
      cdn: `${CDN_BASE}/unionpay/logo.svg`,
    },
  },
  "visa": {
    svg: {
      local: `${LOCAL_BASE}/visa/logo.svg`,
      cdn: `${CDN_BASE}/visa/logo.svg`,
    },
  },
};
