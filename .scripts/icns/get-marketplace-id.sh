#!/bin/bash

icnsRegistryCanisterId=$(cd ./jelly/dependencies/icns && dfx canister id registry)
jellyHubCanisterId=$(cd ./jelly && dfx canister id jelly-hub)

marketplaceId=$(dfx canister --network local call --query \
  "$jellyHubCanisterId" get_marketplace_id "(
    principal \"$icnsRegistryCanisterId\"
  )" | cut -d '"' -f 2)

echo "$marketplaceId"