---
layout: post
title: "Peer-to-peer architecture and interesting features in BitTorrent"
tags: ["Computer network"]
created: August 23, 2024
last_updated: August 23, 2024
---

There are two kinds of famous application architecture: the client-server architecture and peer-to-peer(P2P) architecture.  Here I'd like to talk more about P2P architecture and the interesting features of a famous implement BitTorrent.

## Preliminary

Have you noticed that some applications download large files very quickly,  e.g. 5~6 minutes for a movie with size of 10G?  Have you thought about the principles on the background?  Sometimes,  there is information printed near the progress bar, which says that there are 7 people giving you a favor,  do you know what it means?