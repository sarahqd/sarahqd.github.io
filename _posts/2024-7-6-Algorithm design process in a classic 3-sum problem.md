---
layout: post
title:  "Algorithm design process in a classic 3-sum problem"
tag: Algorithms
created: July 6, 2024
last_updated: July 7, 2024
---

When I confront with an algorithm problem and try to figure out the best algorithm for it, I think a practiced process is superly important. Here we'll go through a classic 3-sum problem to describe the process.

## 3-sum Problem

There are a series of integers here, and given another integer k, could you select out three integers from the input series that make the sum be k? Assume every integer could be used only once.

For example, here is a series of integers [10,12,4,2,8], and k is 20. Then we could get the answer quickly and easily. It's 10, 2, 8.  We could check our algorithms later with the answer.

First, what do we need to do?

## Algorithm Toolbox

Sometime I go hiking and climbing with a big backpack packed with loads of stuffs I think I may need,  bottles of water, mountain sticks, mosquito repellent water,  adhesive bandage，sunscreen or other things. All of those stuffs help me out when I or my friends get trapped into trouble in the wild places. Similarly, we also need a algorithm toolbox to handle different algorithm problems.

Let's see what we have in a common algorithm toolbox. I highly recommend you to read through the series of books *Algorithms Illuminated* which has analyzed and summarized most of the useful tools in detail.

![](../../../assets/images/2024-07-06-2056.svg)

## Algorithm design process

When we first get a problem, and if unfortunately it's the first time we meet it, use the most straightforward method at the beginning, like a brute force method. The method may have a worst time complexity, but don't worry, that's only the first step, right? Before Gauss found the rules behind arithmetic progression，it didn't hurt too much to have 1 to 100 summed up one by one. 

### Brute force method

Now we have integers [10,12,4,2,8],  and we need to find 3 integers which sum up to be 20. What a brute force method does?

![](../../../assets/images/2024-07-06-2056-2.svg)

The C++ code looks like

```c++
bool get3Integers(const QVector<int>& nums, int sum)
{
    if(nums.size() < 3) return false;
    
    for(int i = 0; i < nums.size() - 2; ++i){
        if(nums.at(i) >= sum) continue;
        for(int j = i + 1; j < nums.size() - 1, ++j){
            if(nums.at(j) >= sum - nums.at(j)) continue;
            for(int k = j + 1; k < nums.size(); ++k){
                if(nums.at(i) + nums.at(j) + nums.at(k) == sum) return true;
            }
        }
    }
    
    return false;
}
```

So time complexity of the brute force method is `O(n^3)` , but it fits in the situations with small input. Then how to improve the method? Recall that 3 paradigms in the above toolbox.

### Try 3 paradigms

Divide-and-conquer?  We don't know if we can divide the 3 right integers into the same group. It also makes no sense to combine different group answers together.

Greedy algorithm? Try to imagine that. The sum is 20, so we can choose the biggest integer less than 20, then search for the biggest integer less than 20 - last integer, and so on. Does it work? Actually, the answer of the example mentioned above is not aligned to this idea. The biggest number in the answer is 10, but not 12. If we insist this method, and have to go back to brute force method. 

Dynamic programming? Let's list all possible cases. 

Case 1: 10 is included. Then the problem is reduced to find two integers in [12, 4, 2, 8] whose sum is 10.

Case 2:  10 is excluded. Then the problem is changed to find three integers in [12, 4, 2, 8] whose sum is 20.

It looks like the dynamic programming is more complexity than brute force method. It also has `O(n^3)` time complexity. 

However, we find there are a lot of repetitive visit in k cycle. If we change the k cycle to find a number of `sum - nums.at(j)` in `O(1)` time, the time complexity can reduce to be quadric. What tool could we use? Bingo, it is hash table.

### Speed up with hash table

With hash table, we can store all integers into a hash map to find the `sum - nums.at(j)` in `O(1)` time. For every `i` cycle, reduce 1 from the hash value. It also fits for the datasets with duplicate elements.  For every `j` cycle, if we don't find the right integers, then we add 1 back to the number's hash value.

![](../../../assets/images/2024-07-06-2056-3.svg)

The C++ code looks like

```c++
std::unordered_map<int, int> hashMap;
for(int i = 0; i < nums.size(); ++i){
	if(hashMap.count(nums.at(i))){
		hashMap[nums.at(i)] += 1;
	}else{
		hashMap[nums.at(i)] = 1;
	}
}


for(int i = 0; i < nums.size() - 2; ++i){
    if(nums.at(i) >= sum) continue;
    hashMap[nums.at(i)] -= 1;
    for(int j = i + 1; j < nums.size() - 1, ++j){
        if(nums.at(j) >= sum - nums.at(j)) continue;
        hashMap[nums.at(j)] -= 1;
        int needNum = sum - nums.at(i) + nums.at(j);
        if(hashMap.count(needNum)){
           return true;
        }
        hashMap[nums.at(j)] += 1;
    }
}

return false;
```
The initialization of a hash map has a time complexity `O(n)` and a space complexity `O(n)`.  Then the search of `i` and `j` cycle has a time complexity `O(n^2)`. So the time complexity is `O(n^2)`.

### Let the input be simple - sort

We notice that the input data [10,12,4,2,8] is unordered. Now go through our toolbox again. We have sort method in the toolbox. If we convert the input data to [2,4,8,10,12], it costs `O(nlogn)`, but the find cycle above may reduce the total numbers in some situation.

For example, add a number 18 into the original input data. Now the input data is  [18,10,12,4,2,8].  Sort the data array from bigger to smaller, and we get [18, 12, 10, 8, 4, 2]. Then we don't have to iterate the cycle when `i = 0`, because the smallest number is equal or bigger than `sum - nums.at(0)`.   If the dataset contains a lot of unexpected data, sort method is a good way to help filter them.

In this post, we've taken advantage of our toolbox. It's not necessary to design an algorithm from scratch. Next time we'll dig more about our toolbox.

## References

Tim Roughgarden. Algorithms Illuminated. 
