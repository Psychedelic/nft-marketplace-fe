#!/bin/bash

set -x

cd "$(dirname $BASH_SOURCE)" && cd ../../nft-marketplace || exit 1

printf "🤖 Deploy Services for env (%s)\n\n" "$DEPLOY_TARGET"

# Cap staging (deployed for nft-marketplace-fe)
# cap="q4lzc-5qaaa-aaaal-qaueq-cai"
# Cap staging (pinned in the cap-ooo discord channel)
# pending request on controllers update
# https://discord.com/channels/837010835423494144/887363387909079062/958771177755672606
cap="e22n6-waaaa-aaaah-qcd2q-cai"
# Crowns staging
crowns="iqvo2-7qaaa-aaaam-qacxa-cai"
marketplace="surgh-pqaaa-aaaal-qauiq-cai"
wicp="s5sn3-zyaaa-aaaal-qauja-cai"
owner=$(dfx identity get-principal)
network="ic"
wallet="rwe3y-7aaaa-aaaal-qaudq-cai"

dfx identity --network ic set-wallet "$wallet"

deployCap()
{
  printf "🤖 Deploy Cap\n"

  (
    cd ./cap || exit 1

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
    dfx deploy --network "$network" \
      --argument "(
        principal \"$cap\",
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

    amount=1000000000000

    dfx deploy \
      --network "$network" \
      wicp --argument="(
        \"data:image/jpeg;base64,$(base64 ../.repo/images/logo-of-wicp.png)\",
        \"wicp\",
        \"WICP\",
        8:nat8,
        $amount:nat,
        principal \"$owner\", 
        0, 
        principal \"$owner\", 
        principal \"$cap\"
      )"
  )
}

if [[ "$DEPLOY_TARGET" == "staging" ]];
then
  # TODO: Check the notes in https://github.com/Psychedelic/nft-marketplace-fe/pull/71
  # Some canisters are already deployed like Cap or Crowns...
  # deployCap
  # deployCrowns
  # deployDab

  deployMarketplace
  deployWICP
fi;
