#!/bin/sh
set -eu

pnpm filter:"$TEST_TARGET" exec playwright test "$@"
