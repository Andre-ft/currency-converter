import axios from 'axios';

axios.defaults.baseURL =
  'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

const fetchCurrencyRates = async () => {
  try {
    const { data } = await axios.get();

    data.push({ ccy: 'UAH', buy: '1', sale: '1' });

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

const currencyRatesAPI = {
  fetchCurrencyRates,
};

export default currencyRatesAPI;
