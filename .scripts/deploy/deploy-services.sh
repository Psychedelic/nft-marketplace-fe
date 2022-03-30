#!/bin/bash

set -x

cd "$(dirname $BASH_SOURCE)" && cd ../../nft-marketplace || exit 1

printf "🤖 Deploy Services for env (%s)\n\n" "$DEPLOY_TARGET"

# Cap staging
cap="q4lzc-5qaaa-aaaal-qaueq-cai"
# Crowns staging
crowns="iqvo2-7qaaa-aaaam-qacxa-cai"
marketplace="yva2f-aiaaa-aaaaa-aabqa-cai"
wicp="y4drz-waaaa-aaaaa-aabrq-cai"
owner=$(dfx identity get-principal)
network="ic"
wallet="rwe3y-7aaaa-aaaal-qaudq-cai"

dfx identity --network ic set-wallet "$wallet"

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

    tokenName="Crowns"
    tokenSymbol="CRW"

    dfx deploy --network "$network" \
      --argument "(
          opt record {
            name = opt \"$tokenName\";
            logo = opt \"data:image/jpeg;base64,...\";
            symbol = opt \"$tokenSymbol\";
            owners = opt vec { principal \"$owner\" };
          }
      )" \
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
      --argument "(
        principal \"$crowns\",
        principal \"$owner\"
      )" \
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
  # deployCrowns
  # deployDab
  deployMarketplace
  # deployWICP
fi;
