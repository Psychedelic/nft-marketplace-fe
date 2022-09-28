#!/bin/bash

# TODO: should get cap router id dynamically
# but due to incompatibility of earlier versions of dfx
# not able to deploy ICNS it'd fail
cap_router_id="rkp4c-7iaaa-aaaaa-aaaca-cai"
# TODO: get registry and registrar canister id dynamically
registry_id="rrkah-fqaaa-aaaaa-aaaaq-cai"
owner_principal=$(dfx identity get-principal)

# note: it shouldn't be required for marketplace
# so we use a placeholder
registrar_id="aaaaa-aa"
resolver_id="aaaaa-aa"
reverse_registrar_id="aaaaa-aa"

cd ../../jelly/dependencies/icns || exit 1

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
