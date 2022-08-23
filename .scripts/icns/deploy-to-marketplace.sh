#!/bin/bash

wicpCanisterId=$(cd ./jelly && dfx canister id wicp)
icnsRegistryCanisterId=$(cd ./jelly/dependencies/icns && dfx canister id registry)
jellyHubCanisterId=$(cd ./jelly && dfx canister id jelly-hub)
fee=100
fee_to=$(dfx identity get-principal)
name="icns"
fungibleStandard="variant { DIP20 }"
standard="variant { DIP721v2 }"

marketplaceId=$(dfx canister --network local call \
  "$jellyHubCanisterId" deploy_marketplace "(
    record {
      fee = $fee:nat;
      fee_to = opt principal \"$fee_to\";
      name = \"$name\";
      canister_id = principal \"$icnsRegistryCanisterId\";
      fungible_id = opt principal \"$wicpCanisterId\";
      fungible_standard = opt \"$fungibleStandard\";
      standard = opt \"$standard\";
    }
  )" | cut -d '"' -f 2)

echo "$marketplaceId"