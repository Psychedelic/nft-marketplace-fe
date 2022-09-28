# 🤞 Troubleshooting

## After a checkout to a particular release/commit, fails to run?

When you check the repository to a particular version or point in the history, the repositories
should be checked to the correct commits. This occurs when you checkout from the host repository,but if a submodule is introduced that needs to be initialised, thus you'd use `services:init` or pull it yourself recursively.

You can use Github repository view ( https://github.com/Psychedelic/nft-marketplace-fe/tree/chore/mock-generator-for-kyasshu-marketplace-api ) to see which commits the submodules it points to, in that point of history of the host project e.g. a commit hash is pegged to the directory name).

Also, bear in mind that each repository might have its own things, e.g., the Kyasshu has nodejs dependencies, and for that reason you need to `cd` into the project and `npm install` to get latest packages, etc.

## How to solve failed to bind to 0.0.0.0/0.0.0.0:8050?

There are times where Dynamodb is not stopped completely, which then causes the bin error.

Example:

```
offline: [HTTP] server ready: http://localhost:3000 🚀
offline:
offline: Enter "rp" to replay the last request
Exception in thread "main" java.io.IOException: Failed to bind to 0.0.0.0/0.0.0.0:8050
    at org.eclipse.jetty.server.ServerConnector.openAcceptChannel(ServerConnector.java:346)
    at org.eclipse.jetty.server.ServerConnector.open(ServerConnector.java:308)
    at org.eclipse.jetty.server.AbstractNetworkConnector.doStart(AbstractNetworkConnector.java:80)
```

The process can be located by:

```sh
lsof -i tcp:8050
```

Example output:

```
COMMAND   PID    USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
java    39108 punkbit  104u  IPv4 0x7d51da7cb5a068a9      0t0  TCP *:8050 (LISTEN)
```

Which then you'll be able to stop it by:

```sh
pkill java
```

## The "Unable to start DynamoDB Local process" error?

As in the instruction guide, you'll have to run the command:

```
sls dynamodb install
```

