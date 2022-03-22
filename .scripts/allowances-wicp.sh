#!/bin/bash

printf "🤖 Allowances for wICP\n"

(
  cd "$(dirname $BASH_SOURCE)"
  cd ../nft-marketplace

  wicpId=$(cd ./wicp && dfx canister id wicp)
  marketplaceId=$(dfx canister id marketplace)
  amount=1_000_000

  dfx canister \
    call --update "$wicpId" \
    approve "(
      principal \"$marketplaceId\",
      $amount:nat
    )"
)
