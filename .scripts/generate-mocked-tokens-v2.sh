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

mocks_chunk_size=50
numberOfTokens=$((max_chunks*mocks_chunk_size))

whoami=$(dfx identity whoami)
# TODO: see dfx changes, require update
# alice=$(dfx identity use marketplace.alice > /dev/null 2>&1 && dfx identity get-principal)
# bob=$(dfx identity use marketplace.bob > /dev/null 2>&1 && dfx identity get-principal)

whoami=$(dfx identity use "$whoami" > /dev/null 2>&1 && dfx identity get-principal)

# Warn the user about identity requirement
# as the end user will be interacting with the Marketplace via Plug's
userIdentityWarning "$whoami"

printf "🤖 Mint process will mint a count of %s tokens\n\n" "$numberOfTokens"

(
  cd $crownsMockPath || exit 1

  # TODO: fix/update alice/bob PEM for latest dfx USER_PRINCIPALS="[\"$whoami\", \"$alice\", \"$bob\" ]"
  USER_PRINCIPALS="[\"$whoami\" ]" MAX_CHUNKS=$max_chunks CROWNS_ID=$(cd ../../../ && dfx canister id crowns) WICP_ID=$(cd ../../../ && dfx canister id wicp) node mint-crowns.js
)

printf "👍 Mint process completed!\n\n"

(
  cd $jellyDependenciesPath || exit 1

  jellyHubCanisterId=$(dfx canister id jelly-hub)
  crownsCanisterId=$(dfx canister id crowns)

  echo "✍️ Add collection ($crownsCanisterId) to Marketplace"

  crownsMarketplaceId=$(dfx canister call "$jellyHubCanisterId" \
    deploy_marketplace "(
      record {
        name = \"crowns_mkp\";
        canister_id = principal \"$crownsCanisterId\";
      }
    )" | cut -d '"' -f 2)

  echo "👍 Deployed the Crowns marketplace $crownsMarketplaceId"

  totalSupply=$(dfx canister call --query "$crownsCanisterId" dip721_total_supply "()" | cut -d '(' -f 2 | cut -d ':' -f 1)

  echo "🧙‍♀️ Will now insert the metadata for the total supply $totalSupply, be patient..."

  firstIndex=0
  list=""
  for ((i="$firstIndex"; i <= "$totalSupply"; i++))
  do
    echo "Preparing metadata for index $i..."

    crownsNftCanisterId="vlhm2-4iaaa-aaaam-qaatq-cai"
    filename=$(printf "%04d.mp4" "$i")
    thumbnail=$(printf "%04d.png" "$i")
    crownsCertifiedAssetsA="vzb3d-qyaaa-aaaam-qaaqq-cai"
    # crownsCertifiedAssetsB="vqcq7-gqaaa-aaaam-qaara-cai"
    assetUrl="https://$crownsCertifiedAssetsA.raw.ic0.app/$filename"

    # Get some data from the mainnet canister
    mainnetMetadataResult=($(dfx canister --network ic call --query $crownsNftCanisterId tokenMetadata "($i:nat)" | pcregrep -o1  '3_643_416_556 = "([a-zA-Z]*)"'))

    if [[ ! "$(declare -p mainnetMetadataResult)" =~ "declare -a" ]];
    then
      printf "👹 Oops! Metadata array is not fullfiled, will not proceed!"
      exit 1
    fi

    location="$assetUrl"
    thumbnail="https://$crownsCertifiedAssetsA.raw.ic0.app/thumbnails/$thumbnail"
    smallgem="${mainnetMetadataResult[0]}"
    biggem=${mainnetMetadataResult[1]}
    base=${mainnetMetadataResult[2]}
    rim=${mainnetMetadataResult[3]}

    record="
      record {
        operation = \"metadata\";
        token_id = \"$i\";
        nft_canister_id = principal \"$crownsCanisterId\";
        traits = opt vec {
          record { \"smallgem\"; variant { TextContent = \"$smallgem\" } };
          record { \"biggem\"; variant { TextContent = \"$biggem\" } };
          record { \"base\"; variant { TextContent = \"$base\" } };
          record { \"rim\"; variant { TextContent = \"$rim\" } };
          record {
            \"location\";
            variant {
              TextContent = \"$location\"
            };
          };
          record {
            \"thumbnail\";
            variant {
              TextContent = \"$thumbnail\"
            };
          };
        }
      };
    "

    echo "$record"

    # push to list
    list="$list $record"
  done

  dfx canister call \
    "$crownsMarketplaceId" insert "(
      vec {
        $list
      }
    )"

  echo "👍 Insertion of metadata for marketplace $crownsMarketplaceId completed!"
)

echo "⚠️ The following kyasshu process is only required through the migration from v1 to v2"
read -r -p "⚠️ Would you like to run kyasshu cache [Y/n]? " CONT

if [ "$CONT" != "Y" ]; then
  printf "🤖 Kyasshu will now cache %s tokens\n\n" "$numberOfTokens"

  yarn kyasshu:cache "$numberOfTokens"

  printf "👍 Kyasshu process completed!\n\n"

  exit 1;
else
  printf "\n"
fi