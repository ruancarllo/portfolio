# [Portfolio](https://github.com/ruancarllo/portfolio) &middot; ![Framework](https://img.shields.io/badge/Framework-Vite-teal?style=flat-square) ![Language](https://img.shields.io/badge/Language-TypeScript-royalblue?style=flat-square)

This repository contains the source code for my personal portfolio, which was written in the [TypeScript](https://www.typescriptlang.org) language, using [Preact](https://preactjs.com/guide/v10/typescript) in its TSX-supported form, importing styles created in [SCSS](https://sass-lang.com). To achieve this, the [Vite](https://vitejs.dev) framework was implemented, which is responsible for transpiling the scripts, and [NPM](https://www.npmjs.com), whose function is to handle external dependencies.

## Initialization

To handle this project on a local machine, open a terminal in the [source](./source) folder and install the necessary dependencies with the following commands:

```shell
cd source
npm install --package-lock=false
```

## Distribution

Still in the [source](./source) folder, it is possible to serve the website on the local network with:

```shell
npm run serve
```

Or even build a distributable package for the [docs](./docs) folder with:

```shell
npm run build
```