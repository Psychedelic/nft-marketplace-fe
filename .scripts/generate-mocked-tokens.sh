#!/bin/bash

max_chunks=$1

if [[ -z $max_chunks ]];
then
  printf "🤖 The max chunks was not provided so will use default\n"
  max_chunks=1
fi

cd ./nft-marketplace/crowns/mocks

whoami=$(dfx identity whoami)
alice=$(dfx identity use marketplace.alice && dfx identity get-principal)
bob=$(dfx identity use marketplace.bob && dfx identity get-principal)

whoami=$(dfx identity use "$whoami" && dfx identity get-principal)

USER_PRINCIPALS="[ \"$whoami\", \"$alice\", \"$bob\" ]" MAX_CHUNKS=$max_chunks node mint-crowns.js