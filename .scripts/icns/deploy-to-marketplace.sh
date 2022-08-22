#!/bin/bash

wicpCanisterId=$(cd ./jelly && dfx canister id wicp)
icnsRegistryCanisterId=$(cd ./jelly/dependencies/icns && dfx canister id registry)
jellyHubCanisterId=$(cd ./jelly && dfx canister id jelly-hub)
fee=100
fee_to=$(dfx identity get-principal)
name="icns"
fungibleStandard="DIP20"
standard="DIP721v1"

dfx canister --network local call \
  "$jellyHubCanisterId" deploy_marketplace "(
    record {
      fee = opt $fee:nat;
      fee_to = opt principal \"$fee_to\";
      name = \"$name\";
      canister_id = principal \"$icnsRegistryCanisterId\";
      fungible_id = opt principal \"$wicpCanisterId\";
      fungible_standard = opt \"$fungibleStandard\";
      standard = opt \"$standard\";
    }
  )"
