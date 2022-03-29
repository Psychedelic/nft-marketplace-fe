#!/bin/bash

set -x

(cd "$(dirname $BASH_SOURCE)" && cd ../../nft-marketplace) || exit 1

pwd

ls -la

exit 0

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
    cd ./cap && dfx canister --network "$network" \
        install ic-history-router \
        --argument '(null)' \
        -m upgrade
  )
}

deployCrowns()
{
  printf "🤖 Deploy Crowns\n"

  (
    cd ./crowns && dfx canister --network "$network" \
        install crowns \
        --argument '(null)' \
        -m upgrade
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
    dfx canister --network fleek-testnet \
        install marketplace \
        --argument '(null)' \
        -m upgrade
  )
}

deployWICP()
{
  printf "🤖 Deploy wICP\n"

  (
    cd ./wicp && dfx canister --network fleek-testnet \
        install wicp \
        --argument '(null)' \
        -m upgrade

  )
}

if [[ "$DEPLOY_TARGET" == "staging" ]];
then
  deployCap
  deployDab
  deployMarketplace
  deployWICP
fi;
