---
layout: post
title: "Peer-to-peer architecture and interesting features in BitTorrent"
tags: ["Computer network"]
created: August 23, 2024
last_updated: August 23, 2024
---

There are two kinds of famous application architecture: the client-server architecture and peer-to-peer(P2P) architecture.  Here I'd like to talk more about P2P architecture and the interesting features of a famous implement BitTorrent.

## Preliminary

Have you noticed that some applications download large files very quickly,  e.g. 5~6 minutes(it depends on the bandwidth) for a movie with size of 10G?  Have you thought about the principles on the background?  Sometimes,  there is information printed near the progress bar, which says that there are 7 persons giving you a favor,  do you know what it means?

## P2P

![2024-08-26-1534-client-server1](D:\Github\sarahqd.github.io\assets\images\2024-08-26-1534-client-server1.svg)

For a client-server architecture, a client requests all it wants from the server, and server responds based on the request. The speed that the client receives chunks from the server depends on its download rate and the load of the server. If there are a huge of clients requesting information from the same server,  it consumes more time to download a large file for a client. Horizontal or vertical scaling alleviates the traffic jams a bit, but it also costs a fortune. 

![2024-08-26-1534-p2p1](D:\Github\sarahqd.github.io\assets\images\2024-08-26-1534-p2p1.svg)

P2P architecture is a distributed architecture, taking advantage of every user's device rather than building a lot of servers. Every user is called peer in P2P architecture. If every peer has parts of a file, they could share and help with each other. There are some interesting features commonly used in the P2P applications, e.g. BitTorrent. 

Let's just think about some questions.

Q1: How to share a large file? 

Q2: If a peer is new to the original connection, how to help it join the group?

Q3: Some peers are greedy. They don't share but grep only. How to stay away from them in this game?

Q4: How to keep load balancing? 

Q5: How to get better cooperators? How to get information of other peers?

### Piece



![2024-08-26-1534-p2p2](D:\Github\sarahqd.github.io\assets\images\2024-08-26-1534-p2p2.svg)

First of all,  the server needs to break a large file down into pieces(mini-chunks).  Each piece should have a hash value, and order information, so all of the pieces could be shared freely and reassembled in a client.

### Random first selection

![2024-08-26-1534-p2p3](D:\Github\sarahqd.github.io\assets\images\2024-08-26-1534-p2p3.svg)

If a new peer joins the connection,  it chooses a piece randomly. Here the new peer chooses the chunk with ID=11,  and requests for one of the peers. This strategy is called `Random first selection`.

### Optimistic unchoking

![2024-08-26-1534-p2p4](D:\Github\sarahqd.github.io\assets\images\2024-08-26-1534-p2p4.svg)

We have mentioned that some peers don't share but grep only. In order to keep those guys away from the game, every peer has a fixed group of cooperators. The peer considers many factors, e.g. contribution, the response time, delay and other factors, to decide the top cooperators. That is `choking` strategy. The peers with lower contribution gets lower priority, and are less possible to be responded. But other peers and new peers lose chance to communication with the choking peer. Especially the new peer has nothing to contribute, and it's unfair to kick it away from the game. `Optimistic unchoking` strategy provides chance to new peers. The choking peer responds to a randomly selected peer every period of time, then update its cooperator list. It may get a better cooperator.

![2024-08-26-1534-p2p5](D:\Github\sarahqd.github.io\assets\images\2024-08-26-1534-p2p5.svg)

When a new peer gets a piece in a random game, it contributes to the network immediately. Then it could improve its contribution data, then get response from other peers.

### Rarest-first selection

![2024-08-26-1534-p2p6](D:\Github\sarahqd.github.io\assets\images\2024-08-26-1534-p2p6.svg)

### Distributed Hash Tables(DHT)

![2024-08-26-1534-p2p7](D:\Github\sarahqd.github.io\assets\images\2024-08-26-1534-p2p7.svg)



## References

Computer networking: A Top-Down Approach. 