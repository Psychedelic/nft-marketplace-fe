#!/bin/bash

defaultEnv="development"

env="${1:-$defaultEnv}"

printf "🤖 Start env (%s)\n" "$env"

if [[ $env == "development" ]]; then
  HUB_ID=$(cd ./jelly && dfx canister id jelly-hub)
  CROWNS_ID=$(cd jelly && dfx canister id crowns)
  WICP_ID=$(cd jelly && dfx canister id wicp) 
  CAP_ID=$(cd jelly && dfx canister id cap-router)

  printf "🤖 Hub id (%s), CrownsId (%s), WicpId (%s), CapId (%s)\n" "$HUB_ID" "$CROWNS_ID" "$WICP_ID" "$CAP_ID"

  REACT_APP_HUB_ID=$HUB_ID \
  REACT_APP_CROWNS_ID=$CROWNS_ID  \
  REACT_APP_WICP_ID=$WICP_ID  \
  REACT_APP_CAP_ID=$CAP_ID  \
  REACT_APP_NODE_ENV=$1 \
  DISABLE_ESLINT_PLUGIN=true \
  react-scripts start

  exit 0
fi;

REACT_APP_HUB_ID=$(cd ./jelly && dfx canister --network ic id jelly-hub-test) \
REACT_APP_NODE_ENV=$1 \
DISABLE_ESLINT_PLUGIN=true \
react-scripts start