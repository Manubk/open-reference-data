import currenciesData from '../../data/currencies/currencies.json';
import { Currency } from './currency.types';

export const currencies: readonly Currency[] = currenciesData as Currency[];