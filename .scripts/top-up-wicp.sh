#!/bin/bash

printf "🤖 Topup wICP\n"

(
  cd "$(dirname $BASH_SOURCE)"
  cd ../nft-marketplace

  wallet=$(dfx identity get-wallet)
  wicpId=$(cd ./wicp && dfx canister id wicp)
  transferTo=$(dfx identity get-principal)
  amount=1_000_000

  echo "wallet > $wallet"
  echo "wicpId > $wicpId"
  echo "transferTo > $transferTo"
  echo "amount > $amount"

  dfx canister --wallet "$wallet" \
    call --update "$wicpId" \
    transfer "(
      principal \"$transferTo\",
      $amount:nat
    )"
    
)
