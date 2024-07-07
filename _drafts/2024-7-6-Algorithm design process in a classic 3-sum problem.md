---
layout: post
title:  "Algorithm design process in a classic 3-sum problem"
tag: Algorithm
created: July 6, 2024
last_updated: July 7, 2024
---

When I confront with an algorithm problem and try to figure out the best algorithm for it, I think a practiced process is superly important. Here we'll go through a classic 3-sum problem to try out the process.

## 3-sum Problem

There are a series of integers here, and given another integer k, could you select out three integers from the input series that make the sum be k? Assume that there are no duplicate elements for the input.

For example, here is a series of integers [10,12,4,2,8], and k is 20. Then we could get the answer quickly and easily. It's 10, 2, 8.  We could check our algorithms later with the answer.

First, what do we need to do?

## Algorithm Toolbox

Sometime I go hiking and climbing with a big backpack packed with loads of stuffs I think I may need,  bottles of water, mountain sticks, mosquito repellent water,  adhesive bandage，sunscreen or other things. All of those stuffs help me out when I or my friends get trapped into trouble in the wild places. Similarly, we also need a algorithm toolbox to handle different algorithm problems.

Let's see what we have in a common algorithm toolbox. I highly recommend you to read through the series of books *Algorithms Illuminated* which has analyzed and summarized most of the useful tools in detail.

![](../../../assets/images/2024-07-06-2056.svg)

## Algorithm design process

When we first get a problem, and if unfortunately it's the first time we meet it, try the most straightforward method, like brute force method. The method may have the worst time complexity, but don't worry, that's only the first step, right? Before Gauss found the rules behind arithmetic progression，it didn't hurt too much to have 1 to 100 summed up one by one. 

## Brute force method

Now we have integers [10,12,4,2,8],  and we need to find 3 intergers which sum up to be 20. What a brute force method does?

![](../../../assets/images/2024-07-06-2056-2.svg)





The pseudocode looks like





Time complexity





### Try 3 paradigms







### Let the input simple - sort







### Speed up with hash table







## References

Tim Roughgarden. Algorithms Illuminated. 
