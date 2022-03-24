#!/bin/bash

CAP_ID=$(cd nft-marketplace/cap && dfx canister id ic-history-router)
NFT_CANISTER_ID=$(cd nft-marketplace/crowns && dfx canister id crowns)
NFT_CANISTER_STANDARD='DIP721v2'

printf "Starting kyasshu with the local services cluster...\n\n"
printf "  Using CAP_ID: $CAP_ID\n"
printf "  Using NFT_CANISTER_ID: $NFT_CANISTER_ID\n"
printf "  Using NFT_CANISTER_STANDARD: $NFT_CANISTER_STANDARD\n\n"

cd kyasshu
yarn dev