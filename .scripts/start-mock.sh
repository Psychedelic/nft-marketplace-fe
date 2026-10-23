#!/bin/bash

# Starts the app against the mainnet canisters
# with the mock Kyasshu API (see .scripts/kyasshu-mock/server.js)

export KYASSHU_MOCK_PORT="${KYASSHU_MOCK_PORT:-4000}"

node .scripts/kyasshu-mock/server.js &
MOCK_PID=$!

trap 'kill $MOCK_PID 2> /dev/null' EXIT

REACT_APP_KYASSHU_URL="http://localhost:$KYASSHU_MOCK_PORT" \
.scripts/start.sh production
