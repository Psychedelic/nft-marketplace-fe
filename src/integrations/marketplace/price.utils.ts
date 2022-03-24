import axios from 'axios';

const COINGECKO_ICP_ID = 'internet-computer';
const COINGECKO_PRICE_UNAVAILABLE = 'n/a';

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  timeout: 15000,
});

type CoinGeckoResponsePrice = { usd: number };
type Currencies = 'USD';

export const getICPPrice = async (): Promise<
  CoinGeckoResponsePrice | undefined
> => {
  try {
    const { data } = await api.get('/simple/price', {
      params: {
        ids: COINGECKO_ICP_ID,
        vs_currencies: 'USD',
      },
    });

    if (!(COINGECKO_ICP_ID in data)) return;

    return data[COINGECKO_ICP_ID];
  } catch (err) {
    console.error('Oops! Current ICP price is unavailable');
  }
};

export const getCurrentMarketPrice = async ({
  currency = 'USD',
  currentListForSalePrice,
}: {
  currency?: Currencies;
  currentListForSalePrice: number;
}) => {
  try {
    if (currency !== 'USD' || !currentListForSalePrice)
      return COINGECKO_PRICE_UNAVAILABLE;

    const res = await getICPPrice();

    if (!res || !res?.usd) return;

    const currencyMarketPrice = res?.usd;

    const computed = currencyMarketPrice * currentListForSalePrice;

    // TODO: Use a price formatter lib here
    // at the moment using basic placeholder which does the job
    const locale = navigator.language || 'en-US';
    const formatted = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD' as Currencies,
    }).format(computed);

    return formatted;
  } catch (err) {
    console.error(err);
  }
};
