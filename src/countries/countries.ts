
import countryData from '../../data/countries/countries.json';
import { Country } from './country.types';

export const countries: readonly Country[] =
    countryData as Country[];