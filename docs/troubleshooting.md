# 🤞 Troubleshooting

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
