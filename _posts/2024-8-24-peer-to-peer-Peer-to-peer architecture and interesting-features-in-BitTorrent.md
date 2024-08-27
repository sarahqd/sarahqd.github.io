---
layout: post
title: "Peer-to-peer architecture and interesting features in BitTorrent"
tags: ["Computer network"]
created: August 24, 2024
last_updated: August 24, 2024
---

Have you noticed that some applications download large files very quickly,  e.g. 5~6 minutes (It depends on the bandwidth) for a movie with a size of 10G?  Have you thought about the principles in the background?  Sometimes,  there is information printed near the progress bar, that says that there are seven persons giving you a favor. Do you know what it means?

## Client-server vs peer-to-peer architecture 

There are two kinds of famous application architectures: the client-server architecture and peer-to-peer(P2P) architecture. 

![2024-08-26-1534-client-server1](../../../assets/images/2024-08-26-1534-client-server1.svg)

In a client-server architecture, a client requests all it wants from the server, and the server responds based on the request. The speed at which the client receives chunks from the server depends on its download rate and the load of the server. If there are a lot of clients requesting information from the same server,  it takes a lot of time to download a large file for a client. Horizontal or vertical scaling alleviates the traffic jams a lot, but it also costs a fortune. 

![2024-08-26-1534-p2p1](../../../assets/images/2024-08-26-1534-p2p1.svg)

P2P architecture is a distributed architecture, taking advantage of every user's device rather than building a lot of servers. Every user is called a peer in the P2P architecture. It's effective in large file sharing. If every peer has parts of a file, they could share and help each other.  

In relation to P2P, let's just think about some questions.

Q1: How does a peer help share a large file? 

Q2: If a peer is new to the network, how can the network help it join the group?

Q3: Some peers are greedy. They don't share but grep only. How to kick them away from this game? How to get better cooperators? 

Q4: How to keep load balancing? 

Q5: How to get information of other peers?

## P2P

There are some interesting features commonly used in P2P applications, e.g., BitTorrent.

### Piece

![2024-08-26-1534-p2p2](../../../assets/images/2024-08-26-1534-p2p2.svg)

First of all,  the server needs to break a large file down into `pieces` (mini-chunks) before sending them to different peers.  Each `piece` should have a hash value, and order information, so all of the pieces could be shared freely and reassembled by a client. A client receives one of the chunks, verifies then requests missing pieces.

### Random first selection

![2024-08-26-1534-p2p3](../../../assets/images/2024-08-26-1534-p2p3.svg)

If a new peer joins the network, it chooses a piece randomly. Here, the new peer chooses the chunk with ID 11,  and requests one of the peers. This strategy is called `random first selection`.

### Choking and Optimistic unchoking

![2024-08-26-1534-p2p4](../../../assets/images/2024-08-26-1534-p2p4.svg)

We have mentioned that some peers don't share but grep only. In order to keep those guys away from the game, every peer has a group of cooperators. The peer considers many factors, e.g., contribution, response time, delay, and other factors, to decide the top cooperators. That is a `choking` strategy. The peers with lower contribution gets lower priority, and are less likely to be responded to. But other peers without communication and new peers lose the chance to communicate with the choking peer as well. It's unfair to kick the new peer away from the game just because the new peer has nothing to contribute. `Optimistic unchoking` strategy provides a chance for new peers. The choking peer responds to a randomly selected peer every period of time, then updates its cooperator list. New peers and other peers have a chance to get responses.

![2024-08-26-1534-p2p5](../../../assets/images/2024-08-26-1534-p2p5.svg)

When a new peer gets a piece in a random game, it contributes to the network immediately. Then it could improve its contribution priority and get more responses from other peers.

### Rarest-first selection

![2024-08-26-1534-p2p6](../../../assets/images/2024-08-26-1534-p2p6.svg)

After a new peer gets one piece and joins the game, it will use `Rarest-first selection`.  Just look at the graph above, only one peer has `chunk8`. All of the other peers need to request this chunk from this peer, and introduce bandwidth overload on this peer. With `Rarest-first selection`,  the new peer searches for the rarest chunks, and requests them first (If there are multiple chunks that have the same amount, randomly choose one from them.). If it gets this chunk in the graph above, there are two `chunk8` in the network. Other peers could request `chunk8` from two peers, but not one. `Rarest-first selection` strategy helps keep load balancing.

### Distributed Hash Tables(DHT)

![2024-08-26-1534-p2p7](../../../assets/images/2024-08-26-1534-p2p7.svg)

We've learned several interesting and useful strategies in the above parts. But how does each peer get information about their peers? e.g., who has the chunks it needs? Which peer is greedy or generous? Which peer is a good cooperator? Which chunks are rare? 

Modern P2P architecture provides `Distributed hash tables`(DHT) to assist all peers in finding the necessary information.  DHT is stored in the cloud and distributed.  All of peers could check the information by connecting with DHT.

## References

Computer networking: A Top-Down Approach. 