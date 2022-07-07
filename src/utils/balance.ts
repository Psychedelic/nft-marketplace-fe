type IsBalanceInSufficientParams = {
  loadingWICPBalance: boolean;
  amountRequired: number;
  walletsWICPBalance: number;
};

export const IsBalanceInSufficient = (
  params: IsBalanceInSufficientParams,
) => {
  const { loadingWICPBalance, amountRequired, walletsWICPBalance } =
    params;

  return !loadingWICPBalance && amountRequired > walletsWICPBalance;
};
