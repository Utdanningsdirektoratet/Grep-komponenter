#!/bin/bash

BRANCH=$(git symbolic-ref HEAD | sed -e 's,.*/\(.*\),\1,')
case $BRANCH in
    master)
        npm version minor
    ;;
    *)
        npm version prerelease --preid=$BRANCH --no-git-tag-version
    ;;
esac