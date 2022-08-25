#!/bin/bash

CAP_ROUTER=$(cd ./jelly && dfx canister id cap-router)

DEFAULT_PRINCIPAL_ID=$(dfx identity get-principal)

deployMarketplace() {
  printf "🤖 Call the deployMarketplace\n"

  _owner=$1
  _icHistoryRouter=$2

  cd ./nft-marketplace || exit 1

  yes yes | DFX_WARNING=-version_check yarn marketplace:deploy "$_owner" "$_icHistoryRouter" 250
}

deployMarketplace "$DEFAULT_PRINCIPAL_ID" "$CAP_ROUTER" 

echo "👍 Deploy marketplace completed!"