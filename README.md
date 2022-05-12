<div align="center" style="padding-bottom: 20px;">
  <img src="./.repo/images/crowns-marketplace-logo.png" width="140px" height="auto"/>
</div>

# NFT Marketplace UI

The NFT Marketplace UI provides you with the opportunity to sell, purchase, offer Crowns NFT collection. Crowns are a collection of 10,000 uniquely generated NFTs on the Internet Computer. With a mix of traditional and psychedelic materials.

## 📒 Table of Contents

- [Requirements](#-requirements)
- [Configure NPM for Github Package Registry](#-configure-npm-for-github-package-registry)
- [Getting Started](#-getting-started)
  - [Development](#-development)
  - [Service dependencies](#-service-dependencies)
  - [Integration tools](#-integration-tools)
- [Contribution guideline](#-contribution-guideline)

## ⚙️ Requirements

- Nodejs
- Yarn or NPM

## 👻 Configure NPM for Github Package Registry

You'll need to have @Psychedelic Github Package Registry setup, if you haven't done for other projects find out how here.

To pull and install from [@Psychedelic](https://github.com/psychedelic) via the NPM CLI, you'll need:

- A personal access token (you can create a personal acess token [here](https://github.com/settings/tokens))
- The personal access token with the correct scopes, **repositories**, **org repositories** and **read:packages** to be granted access to the [GitHub Package Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).

Once you have those ready, run:

```sh
npm login --registry=https://npm.pkg.github.com --scope=@Psychedelic
```

> **Note:** You only need to configure this once to install the package!

    On npm login provide your Github email as your username and the Personal access token as the password.

You can also setup your npm global settings to fetch from the Github registry everytime it finds a **@Psychdelic** package:

```sh
npm set //npm.pkg.github.com/:_authToken "$PAT"
```

⚠️ Alternatively, a token could be passed to the `.npmrc` as `//npm.pkg.github.com/:_authToken=xxxxxx` but we'd like to keep it clean, tokenless. Here's an example where the `PAT` is an environment variable:

```sh
@psychedelic:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${PAT}
```

Whichever option is best for you, you'll then be able to install packages from `@psychedelic`, such as the `@psychedelic/plug-connect`.

## 🤔 Getting started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### ⚡ Development

Install required packages.

```sh
yarn install
```

Runs the app in the development mode, or run the app using a desired backend environment.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```sh
yarn start

 - or -

yarn start staging

 - or -

yarn start production
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

```sh
yarn build
```

### 👾 Service dependencies

The Marketplace Frontend interacts with [Cap](https://github.com/Psychedelic/cap), [Dab](https://github.com/Psychedelic/dab), [Crowns](https://github.com/Psychedelic/crowns) (a [DIP-721](https://github.com/Psychedelic/DIP721) token) and [wICP](https://github.com/Psychedelic/wicp) (a [DIP-20](https://github.com/Psychedelic/DIP20) token), when developing, you'll need these to be running on your local network replica.

Utility commands are provided for your own convinience, find the [Service dependencies](/docs/service-dependencies.md) guideline for more details.

In short, start the Services by executing:

```sh
yarn services:start
```

You'll need to read the [Marketplace Service](https://github.com/Psychedelic/nft-marketplace) guidelines to understand how to interact with the Services.

### 🪚 Integration tools

The following [Integrations document](https://github.com/Psychedelic/nft-marketplace/blob/develop/docs/integrations.md) provides a brief explanation on how the integration process came into play. It won't provide every single detail about it, but hopefully an overview to help onboarding; or allow the frontend team find appropriate tools to interact with the services, as easily as possible. Learn more about it [here!](https://github.com/Psychedelic/nft-marketplace/blob/develop/docs/integrations.md)

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

