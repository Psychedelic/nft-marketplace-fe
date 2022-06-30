#!/bin/bash

defaultEnv="development"

env="${1:-$defaultEnv}"

printf "🤖 Start env (%s)\n" "$env"

if [[ $env == "development" ]]; then
  MKP_ID=$(cd nft-marketplace && dfx canister id marketplace)
  CROWNS_ID=$(cd nft-marketplace/crowns && dfx canister id crowns)
  WICP_ID=$(cd nft-marketplace/wicp && dfx canister id wicp) 
  CAP_ID=$(cd nft-marketplace/cap && dfx canister id ic-history-router)

  printf "🤖 Marketplace id (%s), CrownsId (%s), WicpId (%s), CapId (%s)\n" "$MKP_ID" "$CROWNS_ID" "$WICP_ID" "$CAP_ID"

  REACT_APP_MARKETPLACE_ID=$MKP_ID \
  REACT_APP_CROWNS_ID=$CROWNS_ID  \
  REACT_APP_WICP_ID=$WICP_ID  \
  REACT_APP_CAP_ID=$CAP_ID  \
  REACT_APP_NODE_ENV=$1 \
  DISABLE_ESLINT_PLUGIN=true \
  react-scripts start

  exit 0
fi;

REACT_APP_NODE_ENV=$1 DISABLE_ESLINT_PLUGIN=true react-scripts start