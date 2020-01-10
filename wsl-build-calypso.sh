#!bin/bash

# Note: For some reason, building Calypso directly with this script runs significantly faster than invoking "make" 
# within WSL. Ideally, we would build Calypso natively on Windows but are unable to do so at present.

# TODO: Use default,overridable shell arguments here.

# build calypso
pushd calypso
CALYSPO_ENV=desktop MINIFY_JS=true NODE_ARGS=--max_old_space_size=8192 npm run -s build
popd