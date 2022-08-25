#!/bin/sh

_crownsCanisterId=$(cd ./jelly && dfx canister id crowns)
_count=$1

printf "🤖 Kyasshu Cache tokens\n"
printf "Count is set to (%s)\n" "$_count"
printf "The Crowns Canister id (%s)\n" "$_crownsCanisterId"

curl -X GET \
  http://localhost:3000/local/marketplace/"$_crownsCanisterId"/cache/"$_count"