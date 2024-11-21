---
layout: post
title:  "C++ Data structures which are high frequently used in algorithm functions"
tags: Algorithms
created: November 21, 2024
last_updated: November 21, 2024
---

What's on your mind when it comes to data structures provided by C++? Which are high frequently used in algorithm functions?

In this blog, I'd like to walk through those data structures(stack, queue, hash map and priority queue) one-by-one, including the methods and how to use them in different scenarios.<!--more-->

![2024-11-21-data-structures](D:\Github\sarahqd.github.io\assets\images\2024-11-21-data-structures.svg)

## Objects in C++ for data structures

First we need to know the C++ objects and its common methods corresponding to the data structures. Refer to the table below.

| Data structures | C++ Objects | Common methods                     |
| --------------- | ------------- | ---------------------------------- |
| stack           | std::stack\<T> | push(T)<br>pop()<br/>T top()<br/>bool empty()<br/>int size()  |
| queue | std::queue\<T> | push(T)<br/>pop()<br/>T front()<br/>T back()<br/>bool empty()<br/>int size() |
|                 | std::dequeue\<T> | push_back(T) or emplace_back(T)<br/>pop_back()<br/>push_front(T)<br/>pop_front()<br/>T front()<br/>T back()<br/>bool empty()<br/>int size() |
| hash map   | std::unordered_map<T1, T2> | insert({T1 ,T2 })<br/>int count()<br/>operator[]<br/>bool empty()<br/>int size()<br/>clear() |
|                 | std::unordered_set\<T> | insert(T)<br/>int count()<br/>operator[]<br/>bool empty()<br/>int size()<br/>clear() |
| priority queue | std::priority_queue\<T> | push(T)<br/>pop()<br/>T top()<br/>bool empty()<br/>int size()<br/> |



## References

[cppreference](https://en.cppreference.com/)
