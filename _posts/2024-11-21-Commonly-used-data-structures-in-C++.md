---
layout: post
title:  "Data structures which are commonly used in algorithm functions and natively supported in C++"
tags: Algorithms
created: November 21, 2024
last_updated: November 21, 2024
---

What's on your mind when it comes to data structures provided by C++? Which are high frequently used in algorithm functions?

In this blog, I'd like to summarize those data structures(stack, queue, hash map and priority queue) one-by-one, and how to use them in different scenarios will be talked about in the subsequent blogs.<!--more-->

![2024-11-21-data-structures](../../../assets/images/2024-11-21-data-structures.svg)

This table lists the commonly used data structures natively supported by C++. To effectively tackle LeetCode algorithm problems in C++, it's essential to have a thorough understanding of them.

| Data structures | C++ Objects | Common methods                     |
| --------------- | ------------- | ---------------------------------- |
| string | string | string str<br/>substr(int startIndex, int length)<br/>push_back(char)<br/>char pop_back()<br/>char front()<br/>char back()<br/>int size()<br/>int compare(int index1, int index2, string)<br/>--------------------------------------<br/> sort: sort(str.begin(), str.end())<br/>reverse: reverse(str.begin(), str.end())<br/>--------------------------------------<br/>string to int: atoi<br/>int to string: std::to_string(int)<br/>if a char is a number(0~9): int isDigit(unsigned char c) |
| stack           | std::stack\<T> | push(T)<br>pop()<br/>T top()<br/>bool empty()<br/>int size()  |
| queue | std::queue\<T> | push(T)<br/>pop()<br/>T front()<br/>T back()<br/>bool empty()<br/>int size() |
|                 | std::dequeue\<T> | push_back(T) or emplace_back(T)<br/>pop_back()<br/>push_front(T)<br/>pop_front()<br/>T front()<br/>T back()<br/>bool empty()<br/>int size() |
| hash map   | std::unordered_map<T1, T2> | insert({T1 ,T2 })<br/>int count()<br/>operator[]<br/>bool empty()<br/>int size()<br/>clear()<br/>erase(T1) |
|                 | std::unordered_set\<T> | insert(T)<br/>int count()<br/>operator[]<br/>bool empty()<br/>int size()<br/>clear()<br/>erase(T) |
| priority queue | std::priority_queue\<T> | push(T)<br/>pop()<br/>T top()<br/>bool empty()<br/>int size()<br/>-----------------------------------------<br/>Constructor of a max priority queue<br/>auto cmp = \[](int x, int y){ return x < y; }<br/>priority_queue<int, vector\<int>, cmp> pq |



## References

[cppreference](https://en.cppreference.com/)
