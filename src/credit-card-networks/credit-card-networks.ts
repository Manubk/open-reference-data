import creditCardNetworksData from '../../data/credit-card-networks/credit-card-networks.json';
import { CreditCardNetwork } from './credit-card-network.types';
import { creditCardNetworkLogos } from './credit-card-network-logos';

export const creditCardNetworks: readonly CreditCardNetwork[] =
    creditCardNetworksData.map((network) => ({
        ...network,
        logo: creditCardNetworkLogos[network.id] ?? network.logo,
    }));

export const creditNetworks = creditCardNetworks;
