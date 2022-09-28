#!/bin/bash

jellyDependenciesPath=./jelly/dependencies
crownsMockPath="$jellyDependenciesPath/crowns/mocks"

dependenciesHandler() {
  if [ ! -d "$crownsMockPath/node_modules" ];
  then
    (
      printf "🙏 Will install npm dependencies\n\n"
      cd "$crownsMockPath" || exit 1
      npm install
    )
  fi
}

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

# Check if dependencies are installed
# before anything else
dependenciesHandler

max_chunks=$1

if [[ -z $max_chunks ]];
then
  printf "🤖 The max chunks was not provided so will use default\n\n"
  max_chunks=1
fi

mocks_chunk_size=100
numberOfTokens=$((max_chunks*mocks_chunk_size))

whoami=$(dfx identity whoami)
alice=$(dfx identity use marketplace.alice > /dev/null 2>&1 && dfx identity get-principal)
bob=$(dfx identity use marketplace.bob > /dev/null 2>&1 && dfx identity get-principal)

whoami=$(dfx identity use "$whoami" > /dev/null 2>&1 && dfx identity get-principal)

# Warn the user about identity requirement
# as the end user will be interacting with the Marketplace via Plug's
userIdentityWarning "$whoami"

printf "🤖 Mint process will mint a count of %s tokens\n\n" "$numberOfTokens"

(
  cd $crownsMockPath || exit 1

  USER_PRINCIPALS="[ \"$whoami\", \"$alice\", \"$bob\" ]" MAX_CHUNKS=$max_chunks CROWNS_ID=$(cd ../../../ && dfx canister id crowns) WICP_ID=$(cd ../../../ && dfx canister id wicp) node mint-crowns.js
)

printf "👍 Mint process completed!\n\n"

printf "🤖 Kyasshu will now cache %s tokens\n\n" "$numberOfTokens"

yarn kyasshu:cache "$numberOfTokens"

printf "👍 Kyasshu process completed!\n\n"

printf "✍️ Add collection to Marketplace\n"

./nft-marketplace/.scripts/add-collection.sh