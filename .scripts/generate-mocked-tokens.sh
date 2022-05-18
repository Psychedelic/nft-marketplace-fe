#!/bin/bash

userIdentityWarning() {
  _identity=$1

  printf "🌈 The DFX Identity is set to (%s), make sure it matches Plug's!\n\n" "$_identity"

  # The extra white space is intentional, used for alignment
  read -r -p "⚠️  Is your current DFX identity the Plug's exported PEM [Y/n]? " CONT


  if [ "$CONT" != "Y" ]; then
    printf "🚩 Make sure you configure DFX cli to use Plug's exported identity (PEM) \n\n"

    exit 1;
  else
    printf "\n"
  fi
}

max_chunks=$1

if [[ -z $max_chunks ]];
then
  printf "🤖 The max chunks was not provided so will use default\n\n"
  max_chunks=1
fi

whoami=$(dfx identity whoami)
alice=$(dfx identity use marketplace.alice > /dev/null 2>&1 && dfx identity get-principal)
bob=$(dfx identity use marketplace.bob > /dev/null 2>&1 && dfx identity get-principal)

whoami=$(dfx identity use "$whoami" > /dev/null 2>&1 && dfx identity get-principal)

# Warn the user about identity requirement
# as the end user will be interacting with the Marketplace via Plug's
userIdentityWarning "$whoami"

cd ./nft-marketplace/crowns/mocks

USER_PRINCIPALS="[ \"$whoami\", \"$alice\", \"$bob\" ]" MAX_CHUNKS=$max_chunks node mint-crowns.js