---
layout: post
title:  "Hash function and its application on load balancing"
tags: ["Load balancing","Algorithms"]
created: April 22, 2024
last_updated: April 22, 2024
---
Here we'll delve into the hash function and its application on search and load balancing.<!--more-->

## What's hash function

Hash function is a function that map some data to a fixed-length data. It's used in many areas, such as we use MD5 function to identify if the file we accept is the same as the one our friends send. A good hash function has good features, and avoids the `collision` as much as possible, which means different input will get a unique output `hash` via hash function. Take an example, we have 3 book roles, and we get 3 different hashes based on a black-box hash function.  The input parameter is called `keys`, and we would mention the term below.

![2024-02-18-1534-hash](../../../assets/images/2024-02-18-1534-hash.svg)



## Application on search

When hash function is used on searching a value in a set or a map, which has a `constant-time complexity`. In C++ language, `std::unordered_map` and `std::unordered_set` both use the hash function to accelerate the search process.  Just take the original example, the keys organized into some buckets,  which depend on the hash value of keys. If a hash value is found, then the corresponding bucket will be got as well.

![2024-02-18-1534-2-hash](../../../assets/images/2024-02-18-1534-2-hash.svg)

Hash function also is applied on password(which is out of range here), which is called as `Cryptographic hash function`. You can find a lot of material about RSA and SHA-256 etc.

## Traditional hash function on load balancing











## Consistent hashing









## Reference
