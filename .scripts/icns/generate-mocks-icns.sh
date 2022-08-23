#!/bin/bash

principal=$(dfx identity get-principal)

dataRecordList=""

filename="$(dirname -- "$0")/wordlist.txt"
defaultMaxCount=100

# user desired count
max_count="${1:-$defaultMaxCount}"

i=0
while read -r word; do 
  ((i++))

  if [ "$i" -gt "$max_count" ]; then
    break
  fi

  # the initial version does not take into account
  # multiple user principals, this will be added later
  dataRecord="record {
      controller = principal \"$principal\";
      expiry = 36000;
      id = $i:nat;
      name = \"$word\";
      operator = principal \"$principal\";
      owner = principal \"$principal\";
      resolver = principal \"$principal\";
      ttl = 1800:nat64;
    }"

  if [ "$dataRecordList" == "" ]; then
    dataRecordList="$dataRecord"

    continue;
  fi

  dataRecordList="$dataRecordList;
  $dataRecord"
done < "$filename"

dataVec="(
  vec {
    $dataRecordList
  }
)"

cd ./jelly/dependencies/icns || exit 1

dfx canister --network local call registry batchMint "(
  $dataVec
)"
