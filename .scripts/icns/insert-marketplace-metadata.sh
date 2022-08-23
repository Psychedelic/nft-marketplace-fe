#!/bin/bash

marketplaceId=$(.scripts/icns/deploy-to-marketplace.sh)
icnsRegistryCanisterId=$(cd ./jelly/dependencies/icns && dfx canister id registry)

echo "marketplaceId $marketplaceId"
echo "icnsRegistryCanisterId $icnsRegistryCanisterId"

totalSupply=$(cd ./jelly/dependencies/icns && dfx canister --network local call registry dip721_total_supply "()" | cut -d '(' -f 2 | cut -d ':' -f 1)
dataRecordList=""

for ((i=1; i <= "$totalSupply"; i++))
do  
  # the initial version does not take into account
  # multiple user principals, this will be added later
  dataRecord="record {
      operation = \"metadata\";
      token_id = \"$i\";
      nft_canister_id = principal \"$icnsRegistryCanisterId\";
    }"

  if [ "$dataRecordList" == "" ]; then
    dataRecordList="$dataRecord"

    continue;
  fi

  dataRecordList="$dataRecordList;
  $dataRecord"
done

# https://github.com/Psychedelic/jelly/blob/develop/candid/marketplace.did#L13
dataVec="vec {
  $dataRecordList
}"

cd ./jelly || exit 1

dfx canister --network local call \
  "$marketplaceId" insert "(
    $dataVec
  )"