// TODO: Create a proper Error message handler
export const errorMessageHandler = (Err: Record<string, any>) => {
  const key = Object.keys(Err)[0];

  switch (key) {
    case 'InsufficientFungibleBalance':
      return 'Oops! Insufficient fungible balance'
    default:
      return 'Oops! Unknown error'
  }
}

