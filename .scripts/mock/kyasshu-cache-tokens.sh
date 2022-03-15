#!/bin/sh

_marketplaceId=$(cd nft-marketplace && dfx canister id marketplace)
_count=$1

printf "🤖 Kyasshu Cache tokens\n"
printf "Count is set to (%s)\n" "$_count"
printf "The marketplace id (%s)\n" "$_marketplaceId"

curl -X GET \
  http://localhost:3000/dev/marketplace/"$_marketplaceId"/cache/"$_count"