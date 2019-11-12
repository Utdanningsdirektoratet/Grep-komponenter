#!/bin/bash

BRANCH=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
case $BRANCH in
    master)
        npm version minor -m "Bumping to %s"
    ;;
    dev)
        npm version patch -m "Bumping to %s"
    ;;
    *)
        npm version prerelease --preid=$BRANCH --no-git-tag-version
    ;;
esac