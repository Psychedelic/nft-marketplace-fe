#!/bin/sh

# At time of writing we're pulling data from the Crowns test canister
# that has the id "iqvo2-7qaaa-aaaam-qacxa-cai"
# https://github.com/Psychedelic/crowns/blob/main/canister_ids.json
_crownsCanisterId="iqvo2-7qaaa-aaaam-qacxa-cai"
_count=$1

printf "🤖 Kyasshu Cache tokens\n"
printf "Count is set to (%s)\n" "$_count"
printf "The Crowns Canister id (%s)\n" "$_crownsCanisterId"

curl -X GET \
  http://localhost:3000/local/marketplace/"$_crownsCanisterId"/cache/"$_count"