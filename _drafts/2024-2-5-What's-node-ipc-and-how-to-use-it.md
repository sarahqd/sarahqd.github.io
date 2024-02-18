---
layout: post
title:  "How to use node-ipc to implement client-server mode"
tags: nodejs javascript ipc
created: February 5, 2024
last_updated: February 5, 2024
---

Here we'll talk about the implementation of node-ipc module, and how we use it to build a client-server with interval communication.

## What's node-ipc







## Install node-ipc







## Import node-ipc

Import node-ipc module with require command. Be careful with `.default`. The first time I missed the word, and I got weird errors, such as `ipc.serve is not a function`. 

```javascript
const ipc = require('node-ipc').default;
```

## Client-server app

The client-server app we'll build have several items including:

1. Client connects to server once the client starts
2. Client sends a message to server, and server responses to it every 1s
2. Server sends a message to the client only when client is connected
2. Client disconnects the server after retrying for 100 times

 

```javascript
//server.js

```

```javascript
//client.js

```

​      Open two terminals in the vscode,  and run server.js and client.js alternatively.
