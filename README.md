# Ani-player

Anime streaming electron app that uses [Consumet API](https://github.com/consumet/api.consumet.org)

## Prerequisites

- Node.js v16+ or nvm

## Running locally

Clone repository and install dependencies
```shell
git clone https://github.com/xLasercut/ani-player.git
cd ani-player
npm install
```

Run app
```shell
npm run app:dev
```

App settings are saved in `ani-player-settings.json` in the root of the repository

## Build app

The app can be built for linux, windows and mac. To build the app, run:
```shell
npm run app:build
```

or if you want to build cross platform using docker container:
```shell
npm run app:build:docker
./node_modules/.bin/electron-builder --win
```

This will create a `release` directory which contains the executables. NOTE: only the unpacked version currently works due to the way `ani-player-settings.json` is saved.