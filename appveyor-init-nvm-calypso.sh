#!/bin/bash

NODE_VERSION=$(cat calypso/.nvmrc)
NVM_DIR="${HOME}/.nvm"

mkdir -p "${NVM_DIR}"

if [ ! -f "${NVM_DIR}/nvm.sh" ]; then
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
fi

[ -s "${NVM_DIR}/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install "$NODE_VERSION"
nvm alias default "$NODE_VERSION"
nvm use "$NODE_VERSION"

if [ ! -d "calypso/node_modules" ]; then
    pushd calypso && npm ci && popd
fi