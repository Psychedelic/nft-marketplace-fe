#!/bin/bash

set -x

cd "$(dirname $BASH_SOURCE)" && cd ../../nft-marketplace || exit 1

printf "🤖 Deploy Services for env (%s)\n\n" "$DEPLOY_TARGET"

cap="5s64f-ryaaa-aaaaa-aabna-cai"
crowns="5hzni-qqaaa-aaaaa-aaboq-cai"
marketplace="yva2f-aiaaa-aaaaa-aabqa-cai"
wicp="y4drz-waaaa-aaaaa-aabrq-cai"
owner="ffuck-kxghi-gyvia-r5htr-246cy-acq5u-2tdgd-avtvf-jyqbt-xtmf7-cae"
network="fleek-testnet"

deployCap()
{
  printf "🤖 Deploy Cap\n"

  (
    cd ./cap || exit 1

    # dfx canister --network "$network" create ic-history-router

    # dfx canister --network "$network" \
    #     install ic-history-router \
    #     --argument '(null)' \
    #     -m upgrade

    dfx deploy --network "$network" \
      --argument '(null)' \
      ic-history-router
  )
}

deployCrowns()
{
  printf "🤖 Deploy Crowns\n"

  (
    cd ./crowns || exit 1
    
    # dfx canister --network "$network" create crowns

    # dfx canister --network "$network" \
    #     install crowns \
    #     --argument '(null)' \
    #     -m upgrade

    dfx deploy --network "$network" \
      --argument '(null)' \
      crowns
  )
}

deployDab()
{
  printf "🤖 Deploy Dab [SKIP]\n"
}

deployMarketplace()
{
  printf "🤖 Deploy Marketplace\n"

  (
    # dfx canister --network "$network" create crowns

    # dfx canister --network "$network" \
    #     install marketplace \
    #     --argument '(null)' \
    #     -m upgrade

    dfx deploy --network "$network" \
      --argument '(null)' \
      marketplace
  )
}

deployWICP()
{
  printf "🤖 Deploy wICP\n"

  (
    cd ./wicp || exit 1
    
    # dfx canister --network "$network" create wicp

    # dfx canister --network fleek-testnet \
    #     install wicp \
    #     --argument '(null)' \
    #     -m upgrade

    dfx deploy --network "$network" \
      --argument '(null)' \
      wicp
  )
}

if [[ "$DEPLOY_TARGET" == "staging" ]];
then
  deployCap
  deployDab
  deployMarketplace
  deployWICP
fi;
