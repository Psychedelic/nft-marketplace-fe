type IsBalanceInsufficientParams = {
  loadingWICPBalance: boolean;
  amountRequired: number;
  walletsWICPBalance: number;
};

export const isBalanceInsufficient = (
  params: IsBalanceInsufficientParams,
) => {
  const { loadingWICPBalance, amountRequired, walletsWICPBalance } =
    params;

  return !loadingWICPBalance && amountRequired > walletsWICPBalance;
};
