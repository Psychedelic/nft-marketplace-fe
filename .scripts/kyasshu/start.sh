#!/bin/bash

host=$1

if [[ -z $host || "$host" == "local" ]]; then
  CAP_ID=$(cd nft-marketplace/cap && dfx canister id ic-history-router)
  NFT_CANISTER_ID=$(cd nft-marketplace/crowns && dfx canister id crowns)
  NFT_CANISTER_STANDARD='DIP721v2'
elif [[ "$1" != 'mainnet' ]]; then
  printf "usage: yarn kyasshu:start [service cluster: local | mainnet]\n"
  exit 1
fi

printf "🤖 Starting kyasshu with the $host services cluster...\n\n"

[[ ! -z $CAP_ID ]] && printf "  Using CAP_ID: $CAP_ID\n"
[[ ! -z $NFT_CANISTER_ID ]] && printf "  Using NFT_CANISTER_ID: $NFT_CANISTER_ID\n"
[[ ! -z $NFT_CANISTER_STANDARD ]] && printf "  Using NFT_CANISTER_STANDARD: $NFT_CANISTER_STANDARD\n\n"

cd kyasshu
yarn dev