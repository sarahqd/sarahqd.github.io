---
layout: post
title:  "Hash function and its application on load balancing"
tags: ["System design","Algorithms"]
created: April 22, 2024
last_updated: April 22, 2024
---
Here we'll walk through the hash function and its application on searching and load balancing.<!--more-->

## What's hash function

Hash function is a function that map some data to a fixed-length data. It's used in many areas, such as we use MD5 function to identify if the file we accept is the same as the one our friends send. A good hash function has good features, and avoids the `collision` as much as possible, which means different input will get a unique output `hash` via hash function. Take an example, we have 3 book roles, and we get 3 different hashes based on a black-box hash function.  The input parameter is called `keys`, and we would mention the term below.

![2024-02-18-1534-hash](../../../assets/images/2024-02-18-1534-hash.svg)



## Application on search

When hash function is used on searching a value in a set or a map, which has a `constant-time complexity`. In C++ language, `std::unordered_map` and `std::unordered_set` both use the hash function to accelerate the search process.  Just take the original example, the keys organized into some buckets,  which depend on the hash value of keys. If a hash value is found, then the corresponding bucket will be got as well.

![2024-02-18-1534-2-hash](../../../assets/images/2024-02-18-1534-2-hash.svg)

Hash function also is applied on password(which is out of range here), which is called as `Cryptographic hash function`. You can find a lot of material about RSA and SHA-256 etc.

## Traditional hash function on load balancing

If there are multiple clients(user A, B, C...) requesting data from servers,  we need multiple servers to providing service as well. As the number of clients grows sharply,  more powerful server(known as `horizontal scaling`) and more servers(known as `vertical scaling`) are necessary. To take full use of those servers and deal with sudden failure of servers, we need a notifier to do `load balancing`, that means, all requests are divided to reasonable parts then are dispatched to each server (may be weighted based on the performance and ability of each server).  

![2024-02-18-1534-3-hash](../../../assets/images/2024-02-18-1534-3-hash.svg)

`Hash function` is one of those methods to do load balancing. First, we need to choose a `key`, which could be any parameter about the request information,  e.g. request ID, user ID etc. If request ID is used as a key, then the requests from a same user may be sent to those servers randomly.  Considering the `cache` on each server, which is used to alleviate the load of database, e.g. if user A always visits server1 and fetches its main page, then the response would be convenient and fast if server1 stores the main page of user A.  Take the example as presumption, and use user ID as the key here. Then all requests from user A will be sent to a unique server.  Assume the hash function is `h(x)`, there are 3 servers here, then server with server ID = `h(usrAID) % 3` will accept the requests of user A. 

![2024-02-18-1534-5-hash](../../../assets/images/2024-02-18-1534-5-hash.svg)

It looks good, right? Every request from each user is handled by a specific server. But what if we'd like to add more servers for `vertical scaling`, or what if one of servers crashed or it closed for just maintenance?  Considering the adding server situation, That means the server ID will change from `h(usrAID) % 3`  to `h(usrAID) % 4`. Almost every hash value changed then, cache stored in each server lost function and needed to be fetched again. That may cause servers' corruption.

## Consistent hashing

![2024-02-18-1534-6-hash](../../../assets/images/2024-02-18-1534-6-hash.svg)

Consistent hashing is introduced to solve the problems of the traditional hash function above. It creates a `circle` to map the client to different servers, like `h(usrID) % 360` ,  that will get a degree between 0 and 360. Every server also does the hash op and gets a degree in the circle. Based on the degrees of clients and servers,  requests of a specific client will be sent to the nearest server in the clockwise or counter clockwise direction of circle.

![2024-02-18-1534-7-hash](../../../assets/images/2024-02-18-1534-7-hash.svg)

There are 5 servers which distributed on the circle like the picture above, and we have userA, userB and userC for example. UserA is between `S1` and `S2`,  so requests of userA are sent to server `S2` ( clockwise direction is assumed here). So requests of userB and userC are sent to `S4` and `S1` alternatively. If `S2` crashes, requests of userA will be transfered to `S3`. You can see userB and userC are not influenced at all.

![2024-02-18-1534-8-hash](../../../assets/images/2024-02-18-1534-8-hash.svg)

But what if the `S3` is `overloaded` for accepting all requests from `S2`? It's time to share the load with other servers. A specific server could have a series of hash value on the circle, and distribute on different areas of the circle on average.  If `S2` is out of function, requests of userA are sent to S5 instead of S3, because S5a is nearer to userA(`S5a` and `S5b` are two virtual nodes of `S5`).  Now there are 3 other servers between userA and S3,  so we won't worry too much about overload of S3a. In this way,  all requests are divided into many segments and shared by all servers.  

What if a specific server is superly powerful and how to take more advantage of it?  What if the requests of a specific user are times of other users? There are a lot of possibility we may encounter. What to modify the consistent hashing depends on your situation.
