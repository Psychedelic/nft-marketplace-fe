#!/bin/bash

# Obs: the call context is the nft-marketplace-fe root
jellyV2Path="./jelly"

cap_router_id=$(cd $jellyV2Path && dfx canister id cap-router)
# TODO: get registry and registrar canister id dynamically
registry_id=$(cd $jellyV2Path && dfx canister id nft-registry)
owner_principal=$(cd $jellyV2Path && dfx identity get-principal)

# note: it shouldn't be required for marketplace
# so we use a placeholder
registrar_id="aaaaa-aa"
resolver_id="aaaaa-aa"
reverse_registrar_id="aaaaa-aa"

echo "cap_router $cap_router_id"
echo "registry_id $registry_id"
echo "owner_principal $owner_principal"

cd "$jellyV2Path"/dependencies/icns || exit 1

# install registry
dfx canister install registry \
  --argument="(
    principal \"$owner_principal\",
    principal \"$registry_id\",
    opt \"$cap_router_id\"
  )"

# set .icp top-level record
dfx canister call registry \
  setRecord "(
    \"icp\",
    principal \"$registrar_id\",
    principal \"$resolver_id\",
    10000:nat64,
    2641971392463269120:int
  )"

# set principal.reverse to registry
dfx canister call registry \
  setRecord "(
    \"principal.reverse\",
    principal \"$registrar_id\",
    principal \"$reverse_registrar_id\",
    10000:nat64,
    2641971392463269120:int
  )"
