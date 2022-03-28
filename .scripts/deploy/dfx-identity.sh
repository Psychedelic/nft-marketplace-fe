#!/bin/bash

printf "🕵🏻‍♀️ Create the DFX Identity\n\n"

defaultIdentityDir=~/.config/dfx/identity/default

printf "Create the default identity directory (%s)\n" "$defaultIdentityDir"

mkdir -p "$defaultIdentityDir"

printf "Create the PEM from environment secret\n"

echo "$DFX_IDENTITY" > ~/.config/dfx/identity/default/identity.pem

sed -i 's/\\r\\n/\r\n/g' ~/.config/dfx/identity/default/identity.pem

echo "Done 👍 DFX identity created!"