type IsBalanceInsufficientParams = {
  loadingWicpBalance: boolean;
  amountRequired: number;
  walletsWICPBalance: number;
};

export const isBalanceInsufficient = (
  params: IsBalanceInsufficientParams,
) => {
  const { loadingWicpBalance, amountRequired, walletsWICPBalance } =
    params;

  return !loadingWicpBalance && amountRequired > walletsWICPBalance;
};
