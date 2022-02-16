# 👾 Service dependencies

The following is a brief breakdown of the utility methods to help interact with the required Services for the Marketplace Service Canister. These are created for your own convinience and while it offers a good start, it does not attempt to replace the knowledge you can get by checking the original Service documentation (e.g. if you'd like to learn more about Cap, then you're advised to check the original repository [here](https://github.com/Psychedelic/cap) and so on for the remaining Services).

Before we start, you should know that the Marketplace interacts with [Cap](https://github.com/Psychedelic/cap), [Dab](https://github.com/Psychedelic/dab), [Crowns](https://github.com/Psychedelic/crowns) (a [DIP-721](https://github.com/Psychedelic/DIP721) token) and [wICP](https://github.com/Psychedelic/wicp) (a [DIP-20](https://github.com/Psychedelic/DIP20) token). If you haven't learn about these, learn more about them by clicking in the available links!

## 🤔 Getting started

We're going to use `yarn` through the guide, but feel free to use `npm`, if that's your preference.

Once in the project repository, you'll have to execute the `Services initialisation`, which will pull the Service repositories to your machine. This is only required once e.g. at least one time, after you've cloned the [NFT Marketplace frontend](https://github.com/Psychedelic/nft-marketplace-fe).

> Note: Make sure you have the [DFX SDK](https://smartcontracts.org/) installed to run the DFX cli, otherwise visit the [Dfinity](https://dfinity.org/) for instructions

If you haven't yet, execute:

```sh
yarn services:init
```

## 🌈 Starting the Services

Before starting the Services, you need to have a `local replica network`, unless you are interacting with `mainnet`; to keep the guideline short, we're assuming you're developing locally.

Launch the local replica in the foreground (you're advised to do it, to monitor the service, otherwise feel free to add the --background flag). You can open a new shell session afterwards while monitoring the local replica network.

```sh
dfx start --clean
```

Start the Services [Cap](https://github.com/Psychedelic/cap), [Dab](https://github.com/Psychedelic/dab), [Crowns](https://github.com/Psychedelic/crowns) (a [DIP-721](https://github.com/Psychedelic/DIP721) token) and [wICP](https://github.com/Psychedelic/wicp) (a [DIP-20](https://github.com/Psychedelic/DIP20) token).

```sh
yarn services:start
```

👆 The command is a proxy for the process which is part of [Marketplace Service](https://github.com/Psychedelic/nft-marketplace). As such, you can use the [Marketplace Service](https://github.com/Psychedelic/nft-marketplace) on your own (e.g. `git clone` it separately or `cd nft-marketplace`), if that's your preference. Otherwise, use the command `Services start` to initialise the proxied services from the current [NFT Marketplace frontend](https://github.com/Psychedelic/nft-marketplace-fe).

In the cases where you want to reset the `local replica`

```sh
yarn services:reset
```

Bare in mind, that there might be need to troubleshoot when the process is not stopped correctly, or in any other OS issues. So, make sure you look into the [Marketplace Service](https://github.com/Psychedelic/nft-marketplace) guidelines.
