#!/bin/bash

printf "🤖 Add collection to the Marketplace\n"

(
  cd "$(dirname $BASH_SOURCE)"
  cd ../nft-marketplace


  ownerPrincipalId=$(dfx identity get-principal)
  wallet=$(dfx identity get-wallet)
  marketplaceId=$(dfx canister id marketplace)
  fee=1
  creationTime=0
  collectionName="Crowns"
  nonFungibleContractAddress=$(cd crowns && dfx canister id crowns)
  fungibleContractAddress=$(cd wicp && dfx canister id wicp)

  echo "ownerPrincipalId > $ownerPrincipalId"
  echo "wallet > $wallet"
  echo "marketplaceId > $marketplaceId"
  echo "fee > $fee"
  echo "creationTime > $creationTime"
  echo "nonFungibleContractAddress > $nonFungibleContractAddress"
  echo "fungibleContractAddress > $fungibleContractAddress"

  dfx canister --wallet "$wallet" \
    call --update "$marketplaceId" \
    addCollection "(
        principal \"$ownerPrincipalId\",
        ($fee:nat16),
        ($creationTime:nat64),
        \"$collectionName\",
        principal \"$nonFungibleContractAddress\",
        variant { DIP721 },
        principal \"$fungibleContractAddress\",
        variant { DIP20 }
      )"

)
