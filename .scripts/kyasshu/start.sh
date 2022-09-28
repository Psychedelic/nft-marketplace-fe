#!/bin/bash

(cd "$(dirname $BASH_SOURCE)" && cd ../../) && (cd kyasshu) || exit 1

host=$1

if [[ -z $host || "$host" == "local" ]]; then
  export CAP_ID=$(cd ./jelly && dfx canister id cap-router)
  export MARKETPLACE_CANISTER_ID=$(cd nft-marketplace && dfx canister id marketplace)
  export NFT_CANISTER_ID=$(cd ./jelly && dfx canister id crowns)
  export NFT_CANISTER_STANDARD='DIP721'
  export MARKETPLACE_ALLOWED_CANISTERS="{ \"$NFT_CANISTER_ID\": \"$NFT_CANISTER_STANDARD\" }"
  export JELLY_HUB=$(cd ./jelly && dfx canister id jelly-hub)
elif [[ "$host" != 'mainnet' ]]; then
  printf "usage: yarn kyasshu:start [service cluster: local | mainnet]\n"
  exit 1
fi

printf "🤖 Starting kyasshu with the $host services...\n\n"

[[ ! -z $CAP_ID ]] && printf "  Using CAP_ID: $CAP_ID\n"
[[ ! -z $MARKETPLACE_CANISTER_ID ]] && printf "  Using MARKETPLACE_CANISTER_ID: $MARKETPLACE_CANISTER_ID\n"
[[ ! -z $NFT_CANISTER_ID ]] && printf "  Using NFT_CANISTER_ID: $NFT_CANISTER_ID\n"
[[ ! -z $NFT_CANISTER_STANDARD ]] && printf "  Using NFT_CANISTER_STANDARD: $NFT_CANISTER_STANDARD\n\n"
[[ ! -z $JELLY_HUB ]] && printf "  Using JELLY_HUB: $JELLY_HUB\n\n"

cd kyasshu

yarn dev