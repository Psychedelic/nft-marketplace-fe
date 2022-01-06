<div align="center" style="padding-bottom: 20px;">
  <img src="./.repo/images/crowns-marketplace-logo.png" width="140px" height="auto"/>
</div>

# NFT Marketplace UI

The NFT Marketplace UI provides you with the opportunity to sell, purchase, offer Crowns NFT collection. Crowns are a collection of 10,000 uniquely generated NFTs on the Internet Computer. With a mix of traditional and psychedelic materials.

## 📒 Table of Contents 

- [Requirements](#-requirements)
- [Getting Started](#-getting-started)
  - [Development](#-development)
- [Contribution guideline](#-contribution-guideline)

## ⚙️ Requirements

- Nodejs
- Yarn or NPM
- Configure NPM for [Github Package Registry](https://github.com/features/packages)

## 🤔 Getting started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### ⚡ Development

Install required packages.\

```sh
yarn install
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```sh
yarn start
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

```sh
yarn build
```

## 🙏 Contribution guideline

Create branches from the `main` branch and name it in accordance to **conventional commits** [here](https://www.conventionalcommits.org/en/v1.0.0/), or follow the examples bellow:

```txt
test: 💍 Adding missing tests
feat: 🎸 A new feature
fix: 🐛 A bug fix
chore: 🤖 Build process or auxiliary tool changes
docs: ✏️ Documentation only changes
refactor: 💡 A code change that neither fixes a bug or adds a feature
style: 💄 Markup, white-space, formatting, missing semi-colons...
```

The following example, demonstrates how to branch-out from `main`, creating a `test/a-test-scenario` branch and commit two changes!

```sh
git checkout main

git checkout -b test/a-test-scenario

git commit -m 'test: verified X equals Z when Foobar'

git commit -m 'refactor: input value changes'
```

Here's an example of a refactor of an hypotetical `address-panel`:

```sh
git checkout main

git checkout -b refactor/address-panel

git commit -m 'fix: font-size used in the address description'

git commit -m 'refactor: simplified markup for the address panel'
```
