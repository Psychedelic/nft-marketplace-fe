import axios from 'axios';
import { AppLog } from '../../utils/log';

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
    AppLog.error('Oops! Current ICP price is unavailable');
  }
};

export const getCurrentMarketPrice = async ({
  currency = 'USD',
  currentMakeListingPrice,
}: {
  currency?: Currencies;
  currentMakeListingPrice: number;
}) => {
  try {
    if (currency !== 'USD' || !currentMakeListingPrice)
      return COINGECKO_PRICE_UNAVAILABLE;

    const res = await getICPPrice();

    if (!res || !res?.usd) return;

    const currencyMarketPrice = res?.usd;

    const computed = currencyMarketPrice * currentMakeListingPrice;

    // TODO: Use a price formatter lib here
    // at the moment using basic placeholder which does the job
    const locale = navigator.language || 'en-US';
    const formatted = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD' as Currencies,
    }).format(computed);

    return formatted;
  } catch (err) {
    AppLog.error(err);
  }

  return COINGECKO_PRICE_UNAVAILABLE;
};

export const totalPriceCalculator = ({
  price,
  feesInPercent,
}: {
  price?: string;
  feesInPercent?: number;
}) => {
  if (!price || !feesInPercent) return 'n/a';

  const deductions = (Number(price) / 100) * feesInPercent;
  const total = Number(price) - deductions;

  return total;
};
