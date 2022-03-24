import axios from 'axios';

const COINGECKO_ICP_ID = 'internet-computer';

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 15000,
});

type CoinGeckoResponsePrice = { usd: number };

export const getICPPrice = async (): Promise<
  CoinGeckoResponsePrice | undefined
> => {
  try {
    const { data } = await api.get('/simple/price', {
      params: {
        ids: COINGECKO_ICP_ID,
        vs_currencies: 'usd',
      },
    });

    if (!(COINGECKO_ICP_ID in data)) return;

    return data[COINGECKO_ICP_ID];
  } catch (err) {
    console.error('Oops! Current ICP price is unavailable');
  }
};
