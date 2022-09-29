#!/bin/bash

ownerPrincipal=$(dfx identity get-principal)
icnsCanisterId=$(cd ./jelly && dfx canister id icns)
marketplaceId=$(cd ./jelly && dfx canister call jelly-hub get_marketplace_id "(principal \"$icnsCanisterId\")" | cut -d '"' -f 2)

batchMintDataRecordList=""
insertDataRecordList=""

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

  name="$word.icp"

  # the initial version does not take into account
  # multiple user principals, this will be added later
  batchMintDataRecord="record {
      controller = principal \"$ownerPrincipal\";
      expiry = 36000;
      id = $i:nat;
      name = \"$name\";
      operator = principal \"$ownerPrincipal\";
      owner = principal \"$ownerPrincipal\";
      resolver = principal \"$ownerPrincipal\";
      ttl = 1800:nat64;
    }"

  # the initial version does not take into account
  # multiple user principals, this will be added later
  insertDataRecord="record {
      operation = \"metadata\";
      token_id = \"$i\";
      nft_canister_id = principal \"$icnsCanisterId\";
      traits = opt vec {
        record {
          \"name\";
          variant { TextContent= \"$name\" }
        };
      }
    }"

  if [ "$batchMintDataRecordList" == "" ] && [ "$insertDataRecordList" == "" ]; then
    batchMintDataRecordList="$batchMintDataRecord"
    insertDataRecordList="$insertDataRecord"

    continue;
  fi

  batchMintDataRecordList="$batchMintDataRecordList;
  $batchMintDataRecord"

  insertDataRecordList="$insertDataRecordList;
  $insertDataRecord"
done < "$filename"

batchMintDataVec="(
  vec {
    $batchMintDataRecordList
  }
)"

insertDataVec="(
  vec {
    $insertDataRecordList
  }
)"

cd ./jelly || exit 1

echo "👩‍🍳 Batch minting, be patient..."

dfx canister --network local call \
  icns batchMint "(
    $batchMintDataVec
  )"

echo "🧙‍♀️ Inserting metadata into marketplace, be patient..."

dfx canister --network local call \
  "$marketplaceId" insert "(
    $insertDataVec
  )"