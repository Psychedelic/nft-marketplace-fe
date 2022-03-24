import axios from 'axios';

const COINGECKO_ICP_ID = 'internet-computer';
const COINGECKO_PRICE_UNAVAILABLE = 'n/a';

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 15000,
});

type CoinGeckoResponsePrice = { usd: number };
type Currencies = 'usd';

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

export const getCurrentMarketPrice = async ({
  currency = 'usd',
  currentListForSalePrice,
}: {
  currency?: Currencies;
  currentListForSalePrice: number;
}) => {
  if (currency !== 'usd' || !currentListForSalePrice)
    return COINGECKO_PRICE_UNAVAILABLE;

  const res = await getICPPrice();

  if (!res || !res?.usd) return;

  const currencyMarketPrice = res?.usd;

  const computed = currencyMarketPrice * currentListForSalePrice;

  // TODO: Use a price formatter lib here
  // at the moment using basic placeholder which does the job
  const formatted = `$${computed}`;

  return formatted;
};
