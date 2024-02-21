---
layout: post
title:  "How to use node-ipc to implement server-client mode"
tags: nodejs javascript ipc
created: February 18, 2024
last_updated: February 21, 2024
---
Here we'll talk about the implementation of node-ipc module, and how we use it to build a server-client with interval communication.
<!--more-->

## What's node-ipc

`node-ipc` is a nodejs package which is used to communicate between server and client process asynchronously.  Based on the Unix/Windows sockets, `node-ipc` doesn't transfer information with real web sockets, which consumes more time than platform sockets.



## Install node-ipc

Use `npm` to install `node-ipc` package
```
npm install node-ipc
```



## Import node-ipc

Import `node-ipc` module with require command. Be careful with `.default`. The first time I missed the word, and I got weird errors, such as `ipc.serve is not a function`. 

```javascript
const ipc = require('node-ipc').default;
```



## Client-server app

![](../../../assets/images/2024-2-19-node-ipc.svg){:class="post-img"}

The client-server app we'll build have several items including:

1. Client connects to server once the client starts
2. Client sends a message to server, then server responses to it every 1 second
3. Server sends a message to the client only when client is connected
4. Client disconnects the server immediately

Code below runs on `Linux` platform. You need to change the path for `Windows/MacOS`.

```javascript
//server.js
const ipc = require('node-ipc').default;

let is_registered = false
async function interval(cb){
    setInterval(() => {
        let err = false
        if(!is_registered){
            console.log(`there is no client`)
            err = true
        }
        cb(err, 'hello client')
    }, 1000)
}
// create an IPC server with filename 'ipcServer'
ipc.serve('/home/sarah/Documents/ipcServer', () => {
    ipc.server.on('connect', (socket)=>{
        is_registered = true
        console.log(`connect:is_registered:${is_registered}`)
    })

    // listen for messages from clients
    ipc.server.on('message', (data, socket) => {
        console.log(`received a message from client: ${data}`);
        // send a message to the client
        interval((err, msg)=>{
            if(!err){
                ipc.server.emit(socket, 'message', msg);
            }
        })
    })

    // Listen for the socket.disconnected event
    ipc.server.on('socket.disconnected', (socket, destroyedSocketID) => {
        is_registered = false
        console.log(`disconnect:is_registered:${is_registered}`)
        console.log(`Socket ${destroyedSocketID} disconnected from the server`)
    })
})

// start the IPC server
ipc.server.start();

process.on('uncaughtException', async err => {
    console.log(`uncaught exception: ${err}`);
})

process.on('exit', (err) => {
    console.log('process will exit')
    ipc.server.stop()
    process.exit(1)
})
```

```javascript
//client.js
const ipc = require('node-ipc').default;
// connect to an IPC server with id 'server'
ipc.connectTo('ipcServer', '/home/sarah/Documents/ipcServer', () => {
    // listen for the disconnect event
    ipc.of.ipcServer.on('connect', () => {
        console.log('server connected');
    })
    // send a message to the server
    ipc.of.ipcServer.emit('message', 'hello server');
    //   receive a message from the server
    ipc.of.ipcServer.on('message', (data) => {
    console.log(`received a message from server: ${data}`);
    })

    // listen for the disconnect event
    ipc.of.ipcServer.on('disconnect', () => {
        // disconnect from the socket
        ipc.disconnect('ipcServer');
        // do any other actions
        console.log('server disconnected');
    })
})
```

Open two terminals in the vscode,  and run server.js and client.js alternatively. Then client sends a message to server,  after which server begins to send a message to client every 1 second. When client crashes, the server stops dispatching messages. Once the client connects to the server, the server restarts sending messages again.

It must be noticed that the server or the client may miss the messages sent to them. The server or the client emits a message and returns immediately for other operations. It's another thing to receive the message for the receiver. 

Also, `setInterval` is not a common operation but here the example just targets a continuous communication between a server and a client.

Server terminal output:

```
starting server on  /home/sarah/Documents/ipcServer 
starting TLS server false
starting server as Unix || Windows Socket

socket connection to server detected
connect:is_registered:true
received event of :  message hello server
received a message from client: hello server

dispatching event to socket  :  message hello client
dispatching event to socket  :  message hello client
dispatching event to socket  :  message hello client
dispatching event to socket  :  message hello client
socket disconnected false
disconnect:is_registered:false
Socket false disconnected from the server
there is no client
there is no client
there is no client
there is no client
there is no client

socket connection to server detected

connect:is_registered:true
received event of :  message hello server
received a message from client: hello server
dispatching event to socket  :  message hello client
dispatching event to socket  :  message hello client
dispatching event to socket  :  message hello client
...
```

Client terminal output:

```
requested connection to  ipcServer /home/sarah/Documents/ipcServer
Connecting client on Unix Socket : /home/sarah/Documents/ipcServer
dispatching event to  ipcServer /home/sarah/Documents/ipcServer  :  message , hello server
server connected
retrying reset

received events

detected event message hello client
received a message from server: hello client

received events

detected event message hello client
received a message from server: hello client

received events

detected event message hello client
received a message from server: hello client

...
```

