# 👾 Service dependencies

The following is a brief breakdown of the utility methods to help interact with the required Services for the Marketplace Service Canister. These are created for your own convenience and while it offers a good start, it does not attempt to replace the knowledge you can get by checking the original Service documentation (e.g. if you'd like to learn more about Cap, then you're advised to check the original repository [here](https://github.com/Psychedelic/cap) and so on for the remaining Services).

Before we start, you should know that the Marketplace interacts with [Cap](https://github.com/Psychedelic/cap), [Dab](https://github.com/Psychedelic/dab), [Crowns](https://github.com/Psychedelic/crowns) (a [DIP-721](https://github.com/Psychedelic/DIP721) token) and [wICP](https://github.com/Psychedelic/wicp) (a [DIP-20](https://github.com/Psychedelic/DIP20) token). If you haven't learn about these, learn more about them by clicking in the available links!

## 🤔 Getting started

We're going to use `yarn` through the guide, but feel free to use `npm`, if that's your preference.

Once in the project repository, you'll have to execute the `Services initialisation`, which will pull the Service repositories to your machine. This is only required once e.g. at least one time, after you've cloned the [NFT Marketplace frontend](https://github.com/Psychedelic/nft-marketplace-fe).

> Note: It is important to make sure you have done the following before proceeding;
>
> - Installed [DFX SDK](https://smartcontracts.org/) to run the DFX cli, otherwise visit the [Dfinity](https://dfinity.org/) for instructions.
> - Logged in with SSH key, otherwise visit GitHub docs to [Generate and add a new SSH key to your GitHub account](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
> - Installed [Rust](https://doc.rust-lang.org/book/ch01-01-installation.html) and the `ic-cdk-optimizer crate`, instructions on how to do that can be found in the [Dfinity docs](https://smartcontracts.org/docs/rust-guide/rust-optimize.html).

If you haven't yet, execute:

```sh
yarn services:init
```

## 🌈 Starting the Services

We're going to interact with Canister Services and an Off-chain Restful API provided in [Kyasshu](https://github.com/Psychedelic/kyasshu). At the current time, we define Services as any backend service, which includes Canister or Off-chain API, but because the off-chain service as its own dependencies, we'll refer to it separately, as [Kyasshu](https://github.com/Psychedelic/kyasshu).

### Canister Services

Before starting the Canister Services, you need to have a `local replica network`, unless you are interacting with `mainnet`; to keep the guideline short, we're assuming you're developing locally.

Launch the local replica in the foreground (you're advised to do it, to monitor the service, otherwise feel free to use the --background flag, for that you'd modify the `Services local replica` wrapped command or start the Dfx network yourself by `cd ./nft-marketplace` and `dfx start --background`).

You can open a new shell session afterwards while monitoring the local replica network.

```sh
yarn services:local-replica
```

Start the Services [Cap](https://github.com/Psychedelic/cap), [Dab](https://github.com/Psychedelic/dab), [Crowns](https://github.com/Psychedelic/crowns) (a [DIP-721](https://github.com/Psychedelic/DIP721) token) and [wICP](https://github.com/Psychedelic/wicp) (a [DIP-20](https://github.com/Psychedelic/DIP20) token).

```sh
yarn services:start
```

👆 The command is a proxy for the process which is part of [Marketplace Service](https://github.com/Psychedelic/nft-marketplace). As such, you can use the [Marketplace Service](https://github.com/Psychedelic/nft-marketplace) on your own (e.g. `git clone` it separately or `cd nft-marketplace`), if that's your preference. Otherwise, use the command `Services start` to initialize the proxied services from the current [NFT Marketplace frontend](https://github.com/Psychedelic/nft-marketplace-fe).

In the cases where you want to reset the `local replica`

```sh
yarn services:reset
```

Bare in mind, that there might be need to troubleshoot when the process is not stopped correctly, or in any other OS issues. So, make sure you look into the [Marketplace Service](https://github.com/Psychedelic/nft-marketplace) guidelines.

👏 That's it, at this point you should have all the necessary Services running in your local replica!

### Crowns Canister

The [Crowns](https://github.com/Psychedelic/crowns) Canister is a [DIP-721](https://github.com/Psychedelic/dip721) Token Contract, that has 10k tokens. Traversing 10k items with a on-chain solution is not performant, so we have the on-chain canister endpoints, but also an off-chain through [Kyasshu API](https://github.com/Psychedelic/kyasshu), which provides a solution to help get the Crowns data.

Since the off-chain is mirroring the data on-chain which it depends you'll have to make sure that when generating the mock data locally, the data is mirrored between the Crowns Canister and the Kyasshu Marketplace API, e.g. if you want to generate 40 Tokens starting from Token index 1 then the token range should exist in both Crowns Canister and Kyasshu. This is because you want the performance of the off-chain solution but ultimately, interact with the on-chain Crowns Canister.

Here's an example of how to generate 100 Crowns NFTs in the on-chain Crowns Canister of your local replica:

```sh
yarn mock:generate-tokens
```

💡 100 Crowns NFTs are the default number

Although, you can specify how many tokens you want generated by providing the number of chunks, where each chunk is equivalent to 100 tokens.

Here's an example of how to generate 500

```sh
yarn mock:generate-tokens 5
```

Similarly, you'd cache 500 crown tokens (corresponding number to what we generated) in the off-chain Kyasshu Marketplace API (only once the token generation has completed!) by:

```sh
yarn kyasshu:cache 500
```

These scripts are offered for your own convenience check the source repositories for more.

In some cases you might want to reset the redis database:

```sh
yarn kyasshu:redis-flush-all
```

🤞 If you find issues, refer to the [troubleshooting](/docs/troubleshooting.md) document for help.

### Running Kyasshu as off-chain API

We'll need the Kyasshu repository, as such you'll have to run the Service initialization, as explained earlier. So, make sure that the `kyasshu` directory is populated.

Kyasshu is a [Serverless framework](https://www.serverless.com/) for developing [AWS Lambda](https://aws.amazon.com/lambda/) based services.

To run the stack locally, we'll need to ensure some dependencies are installed in our machine.

One of the AWS features we'll use is [DynamoDb](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html), which require us to [install Java > 6](https://java.com/en/download/). Visit the [download page](https://java.com/en/download/) and install it, please!

Assuming that you have nodejs and npm installed, we'll install the package [serverless](https://www.serverless.com/framework/docs/getting-started) which we depend on, as that's the framework in which [Kyasshu](https://github.com/Psychedelic/kyasshu) was developed.

```sh
npm install -g serverless
```

Once completed, we'll add the dynamodb addon to serverless. Start by opening the local project Kyasshu repository:

```sh
cd kyasshu
```

Next we install the Kyasshu dependencies:

```sh
yarn install
```

Then followed by the installation command of serverless:

```sh
sls dynamodb install
```

We'll include Redis, used as a first layer of cache for clients. If you are on mac:

```sh
brew install redis
```

Or if you are on Ubuntu:

```sh
sudo apt-get update && sudo apt-get install redis
```

Otherwise, if you much prefer to handle the installation process as recommended in the original [documentation](https://redis.io/topics/quickstart), follow the steps [here](https://redis.io/topics/quickstart).

At this point we should have all the global and system dependencies that are required. Let's complete by installing the packages the project requires.

From then on, follow the [Start the Kyasshu service](#start-the-kyasshu-service)

### Start the Kyasshu service

Make sure you are in the [nft-marketplace-fe](https://github.com/Psychedelic/nft-marketplace-fe)project root, because we are going to use the project utility scripts to help us start the services. Alternatively, if you much prefer cd into kyasshu and run the commands individually. For the goals of the [nft-marketplace-fe](https://github.com/Psychedelic/nft-marketplace-fe), we're going to use the scripts for quick bootstrap! If you need more control, refer to the services, separate documentation.

Start the Redis service in the foreground of your shell by:

```sh
yarn kyasshu:redis
```

Once it starts you should get a similar output to:

```
...

10199:M 07 Mar 2022 15:47:27.557 # Server initialized
10199:M 07 Mar 2022 15:47:27.557 * Loading RDB produced by version 6.2.6
10199:M 07 Mar 2022 15:47:27.557 * RDB age 2 seconds
10199:M 07 Mar 2022 15:47:27.557 * RDB memory usage when created 1.02 Mb
10199:M 07 Mar 2022 15:47:27.557 # Done loading RDB, keys loaded: 0, keys expired: 0.
10199:M 07 Mar 2022 15:47:27.557 * DB loaded from disk: 0.000 seconds
10199:M 07 Mar 2022 15:47:27.557 * Ready to accept connections
```

Open a new shell terminal and run the `serverless` development/offline process:

```sh
yarn kyasshu:start
```

You should get a similar output to:

```sh
  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
  │                                                                                             │
  │   GET  | http://localhost:3000/dev/marketplace/{canisterId}/cache/{tokens}                  │
  │   POST | http://localhost:3000/2015-03-31/functions/cacheCollectionMeta/invocations         │
  │   GET  | http://localhost:3000/dev/marketplace/{canisterId}/nft/{token}                     │
  │   POST | http://localhost:3000/2015-03-31/functions/getTokenMeta/invocations                │
  │   GET  | http://localhost:3000/dev/marketplace/{canisterId}/nfts/{sorting}/{order}/{page}   │

  ...
```

At this point you should have the Kyasshu services running!

By default, in the serverless environment, Kyasshu will use the local services for crowns and cap canisters.

Check the topic of how to get data in your local Kyasshu to learn more.

🤞 If you find issues, refer to the [troubleshooting](/docs/troubleshooting.md) document for help.

### Get data in the local Kyasshu

To cache your generated tokens, you can use the following command.

The cache script will automatically use the local crowns canister, and request a total of `25` tokens. The caching is pretty performant, but keep in mind caching a large amount may take some time (eg; 10,000 tokens takes about ~5mins)

```sh
yarn kyasshu:cache 25
```

To learn more about the Marketplace endpoints, check the [Kyasshu documentation](https://github.com/Psychedelic/kyasshu).

## 🙋‍♀️ F.A.Q

### How to use a Service checked into particular commit of history?

Let's say that there are new features in the Service repositories e.g. the `Cap` and you'd like to have it locally. For that, all you need to do is checkout the repository to that particular commit in the original repository history. locate the Service in the [nft-marketplace](https://github.com/Psychedelic/nft-marketplace) repository directory, open it and use the `git checkout <hash>`, as you'd generally do. In the root of [nft-marketplace-fe](https://github.com/Psychedelic/nft-marketplace-fe), you could then commit the point in history you're interested in, to your current feature branch.

### What's the interface to interact with the Marketplace?

You'd start by looking into the Marketplace Canister Candid IDL (the interface description language file). Open the [Candid marketplace.did](https://github.com/Psychedelic/nft-marketplace/blob/develop/marketplace/marketplace.did) and read the `Service` field, which provides the endpoints you'll be interested in!

### Why I'm getting unauthorized when I try to X or Y?

The Services you're interacting with have restrictions, for example, the marketplace can't simply move a client balance; or transfer tokens to users without explicit approvals and verification. We won't go through the specifications for the approval/allowances in the business logic, as that's publicly available in the [nft-marketplace](https://github.com/Psychedelic/nft-marketplace) repository source-code, but you need to understand the basics.

A practical example of how allowances are managed (approvals, ownership, controllers) is to check the [healtcheck](https://github.com/Psychedelic/nft-marketplace/blob/develop/healthcheck.sh), that while does not provide an example of all possible use-cases, gives you an idea of how it sets permissions.

