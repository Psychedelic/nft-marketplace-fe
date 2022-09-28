#!/bin/bash

ownerPrincipal=$(dfx identity get-principal)

dataRecordList=""

filename="$(dirname -- "$0")/wordlist.txt"
defaultMaxCount=100

# user desired count
maxCount="${1:-$defaultMaxCount}"

i=0
while read -r word; do 
  ((i++))

  if [ "$i" -gt "$maxCount" ]; then
    break
  fi

  # the initial version does not take into account
  # multiple user principals, this will be added later
  dataRecord="record {
      controller = principal \"$ownerPrincipal\";
      expiry = 36000;
      id = $i:nat;
      name = \"$word.icp\";
      operator = principal \"$ownerPrincipal\";
      owner = principal \"$ownerPrincipal\";
      resolver = principal \"$ownerPrincipal\";
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

cd ./jelly || exit 1

dfx canister --network local call icns batchMint "(
  $dataVec
)"