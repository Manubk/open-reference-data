export interface CreditCardNetworkLogoAsset {
    /** Path to the asset bundled with the library, if available. */
    local?: string;

    /** Public URL for the CDN asset, if available. */
    cdn?: string;
}

export interface CreditCardNetworkLogo {
    svg?: CreditCardNetworkLogoAsset;
    png?: CreditCardNetworkLogoAsset;
}

export interface CreditCardNetwork {
    /** Stable lowercase slug identifier. */
    id: string;

    /** Display name of the credit card network. */
    name: string;

    /** Optional logo assets, if available. */
    logo?: CreditCardNetworkLogo;
}
