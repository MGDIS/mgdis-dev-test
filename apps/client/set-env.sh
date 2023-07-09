#!/bin/bash

rm .env | true
echo VITE_GITPOD_WORKSPACE_URL=$GITPOD_WORKSPACE_URL > .env