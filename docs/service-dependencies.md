# 👾 Service dependencies

The following is a brief breakdown of the utility methods to help interact with the required Services for the Marketplace Service Canister. These are created for your own convinience and while it offers a good start, it does not attempt to replace the knowledge you can get by checking the original Service documentation (e.g. if you'd like to learn more about Cap, then you're advised to check the original repository [here](https://github.com/Psychedelic/cap) and so on for the remaining Services).

Before we start, you should know that the Marketplace interacts with [Cap](https://github.com/Psychedelic/cap), [Dab](https://github.com/Psychedelic/dab), [Crowns](https://github.com/Psychedelic/crowns) (a [DIP-721](https://github.com/Psychedelic/DIP721) token) and [wICP](https://github.com/Psychedelic/wicp) (a [DIP-20](https://github.com/Psychedelic/DIP20) token). If you haven't learn about these, learn more about them by clicking in the available links!

## 🤔 Getting started

We're going to use `yarn` through the guide, but feel free to use `npm`, if that's your preference.

Once in the project repository, you'll have to execute the `Services initialisation`, which will pull the Service repositories to your machine. This is only required once e.g. at least one time, after you've cloned the [NFT Marketplace frontend](https://github.com/Psychedelic/nft-marketplace-fe).

> Note: It is important to make sure you have done the following before proceeding;
> - Installed [DFX SDK](https://smartcontracts.org/) to run the DFX cli, otherwise visit the [Dfinity](https://dfinity.org/) for instructions.
> - Logged in with SSH key, otherwise visit GitHub docs to [Generate and add a new SSH key to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
> - Installed [Rust](https://doc.rust-lang.org/book/ch01-01-installation.html) and the `ic-cdk-optimizer crate`, instructions on how to do that can be found in the [Dfinity docs](https://smartcontracts.org/docs/rust-guide/rust-optimize.html).

If you haven't yet, execute:

```sh
yarn services:init
```

## 🌈 Starting the Services

Before starting the Services, you need to have a `local replica network`, unless you are interacting with `mainnet`; to keep the guideline short, we're assuming you're developing locally.

Launch the local replica in the foreground (you're advised to do it, to monitor the service, otherwise feel free to use the --background flag, for that you'd modify the `Services local replica` wrapped command or start the Dfx network yourself by `cd ./nft-marketplace` and `dfx start --background`).

You can open a new shell session afterwards while monitoring the local replica network.

```sh
yarn services:local-replica
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

👏 That's it, at this point you should have all the necessary Services running in your local replica!

## 🙋‍♀️ F.A.Q

### How to use a Service checked into particular commit of history?

Let's say that there are new features in the Service repositories e.g. the `Cap` and you'd like to have it locally. For that, all you need to do is checkout the repository to that particular commit in the original repository history. locate the Service in the [nft-marketplace](https://github.com/Psychedelic/nft-marketplace) repository directory, open it and use the `git checkout <hash>`, as you'd generally do. In the root of [nft-marketplace-fe](https://github.com/Psychedelic/nft-marketplace-fe), you could then commit the point in history you're interested in, to your current feature branch.

### What's the interface to interact with the Marketplace?

You'd start by looking into the Marketplace Canister Candid IDL (the interface description language file). Open the [Candid marketplace.did](https://github.com/Psychedelic/nft-marketplace/blob/develop/marketplace/marketplace.did) and read the `Service` field, which provides the endpoints you'll be interested in!

### Why I'm getting unauthorised when I try to X or Y?

The Services you're interacting with have restrictions, for example, the marketplace can't simply move a client balance; or transfer tokens to users without explicit approvals and verification. We won't go through the specifications for the approval/allowances in the business logic, as that's publicly available in the [nft-marketplace](https://github.com/Psychedelic/nft-marketplace) repository source-code, but you need to understand the basics.

A practical example of how allowances are managed (approvals, ownership, controllers) is to check the [healtcheck](https://github.com/Psychedelic/nft-marketplace/blob/develop/healthcheck.sh), that while does not provide an example of all possible use-cases, gives you an idea of how it sets permissions.
