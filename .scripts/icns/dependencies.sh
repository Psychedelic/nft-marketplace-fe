#!/bin/bash

# TODO: should get cap router id dynamically
# but due to incompatibility of earlier versions of dfx
# not able to deploy ICNS it'd fail
cap_router_id=$(cd ./jelly && dfx canister id cap-router)
registry_id=""
owner_principal=$(dfx identity get-principal)

# note: it shouldn't be required for marketplace
# so we use a placeholder
registrar_id="aaaaa-aa"
resolver_id="aaaaa-aa"
reverse_registrar_id="aaaaa-aa"

# TODO: this is temporary and will change
cd ./jelly/dependencies/icns || exit 1

dfx canister create registry
dfx build registry

registry_id=$(dfx canister id registry)

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
