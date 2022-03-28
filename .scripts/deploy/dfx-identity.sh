#!/bin/bash

# The system identity is
# bewg6-izdus-bfibk-qh2d2-gj6kw-jk5pw-ll6fu-t2g2w-fdki2-bxukw-xae
# which secret is set in 
# https://github.com/Psychedelic/nft-marketplace-fe/settings/secrets/actions

printf "🕵🏻‍♀️ Create the DFX Identity\n\n"

defaultIdentityDir=~/.config/dfx/identity/default
pemFilename=identity.pem

printf "Create the default identity directory (%s)\n" "$defaultIdentityDir"

mkdir -p "$defaultIdentityDir"

touch "$defaultIdentityDir"/"$pemFilename"

printf "Create the PEM from environment secret\n"

echo "$DFX_IDENTITY" > ~/.config/dfx/identity/default/"$pemFilename"

defaultIdentity=$(dfx identity get-principal)

printf "Done 👍 DFX identity created!\n"
printf "The identity is %s\n\n" "$defaultIdentity"