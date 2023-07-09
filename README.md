# MGDIS technical test

NodeJS + Typescript + VueJS project.

## Content

**NodeJS current version : 20.x**

**PNPM current version : 8.6.x**

## How to run it ?

Open the project in Gitpod :

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/drouian-m/mgdis-dev-test/-/tree/main/)

To complete the exercices, you need to run the following commands :

```sh
corepack enable
pnpm build:wc # to build web components
pnpm dev # to run client and server instances
```

After that, the UI will be avaible at http://localhost:5173 and the server at http://localhost:8080.

## Exercices

### Step 1 : UI - Plug the create tweet API call

Go to the [twitter rest adapter](apps/client/src/business/twitter/twitter.adapter.ts) and write the create tweet API call.

This function should return the created tweet.

### Step 2 : Backend - Write the like feature

Go to the [twitter module](apps/server/src/twitter/twitter.controller.ts) and write the like feature (controller, service and repository).

The like feature must respect the following rules:

- Only an existing tweet could be liked
- The like counter should be incremented by 1
- The updated tweet should be returned by the API

### Step 3 : UI - Plug the like tweet API call

Go to the [twitter rest adapter](apps/client/src/business/twitter/twitter.adapter.ts) and write the like tweet API call.

This function should return the updated tweet.
