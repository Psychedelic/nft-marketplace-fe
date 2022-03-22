#!/bin/bash

printf "🤖 Mint Crowns\n"

(
  cd "$(dirname $BASH_SOURCE)"
  cd ../nft-marketplace

  wallet=$(dfx identity get-wallet)
  mint_for=$(dfx identity get-principal)
  tokenId=0
  nonFungibleContractAddress=$(cd crowns && dfx canister id crowns)

  dfx canister --wallet "$wallet" \
    call --update "$nonFungibleContractAddress" \
    mint "(
      principal \"$mint_for\",
      $tokenId:nat,
      vec {
        record {
          \"location\";
          variant {
            \"TextContent\" = \"https://vqcq7-gqaaa-aaaam-qaara-cai.raw.ic0.app/0000.mp4\"
          }
        }
      }
    )"
)