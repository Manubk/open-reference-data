
export interface BankLogoAsset {
    /** Path to the asset bundled with the library, if available. */
    local?: string;
    /** Public URL for the CDN asset, if available. */
    cdn?: string;
}

export interface BankLogo {
    logo?: {
        svg?: BankLogoAsset;
        png?: BankLogoAsset;
    };
    icon?: {
        svg?: BankLogoAsset;
        png?: BankLogoAsset;
    };
}

export interface Bank {

    id: string;
    name: string;
    logo: BankLogo;

}