---
layout: post
title: "Consistency models"
tags: ["System design"]
created: October 20, 2024
last_updated: October 20, 2024
---

Why do we need consistency models? It's essential to consider what factors are most important for our clients: is strong consistency more critical, or is lower latency with weak consistency preferable? Large companies often use a variety of consistency models tailored to their specific needs, and these models can apply to different areas of their operations.

## Problems in the real world



![2024-10-20-captheorem](../../../assets/images/2024-10-20-captheorem.svg)

To understand consistency models better, we can reference the CAP theorem, which identifies three key factors in distributed systems: Consistency, Partition Tolerance, and Availability. However, it’s impossible to achieve all three simultaneously. Availability ensures that users can access the database, system, or application whenever they want and receive a response. Consistency means that if multiple users make the same request, they will receive the same response. Partition tolerance acknowledges that network partitions are inevitable, as connection errors and downtime are common occurrences. When one distributed database goes down, users may need to rely on other available databases, which could contain stale data.

![2024-10-20-networkpartition](../../../assets/images/2024-10-20-networkpartition.svg)

This leads us to the dilemma of whether to prioritize CP (Consistency and Partition tolerance) or AP (Availability and Partition tolerance). The answer depends on the industry. For example, sectors like banking require strong consistency, while social media platforms like WeChat prioritize lower latency and availability.

If we focus on achieving higher availability, what policies can we implement? We'll explore various consistency models in the following sections.

## Consistency Models and examples in C++

Monitoring a large distributed system within a small code package can be challenging. To address this, we can conceptualize the threads of a computer as different nodes in a distributed system, allowing us to monitor their behavior in C++. If you're unfamiliar with `std::memory_order` in C++, you can refer to the [documentation](https://en.cppreference.com/w/cpp/atomic/memory_order).

Before diving into consistency models, let's examine the example below. 

```c++
#include <atomic>
#include <iostream>
#include <thread>
#include <vector>

std::atomic<int> cnt = {0};

void f()
{
    for (int n = 0; n < 2; ++n){
        cnt.store(n, std::memory_order_relaxed);
        std::cout << std::this_thread::get_id()<< " " << cnt.load(std::memory_order_relaxed) <<  std::endl;
    }
};

int main()
{
    std::thread t1(f);
    std::thread t2(f);
    std::thread t3(f);

    t1.join();
    t2.join();
    t3.join();
}
```

In this scenario, three threads are interacting with the variable `cnt`. The use of `std::memory_order_relaxed` imposes no restrictions on the order of operations between threads or even within the same thread. Consequently, the code can produce varying outputs, one of which appears below. Notably, the thread with ID `19200` yields an unexpected output of 0. This demonstrates that while `std::memory_order_relaxed` ensures safety in reading and writing to the same memory location, it does not guarantee consistency in the system.

```
12196 0
12196 1
19200 1
19200 0
18792 0
18792 1
```

### Eventual Consistency

![2024-10-20-eventualconsistencymodel](../../../assets/images/2024-10-20-eventualconsistencymodel.svg)

With eventual consistency, users will observe data changes over time, but not instantaneously. 

```c++
std::atomic<int> val = {0};
void read(){
    auto start = std::chrono::high_resolution_clock::now();
    while(true){
        std::this_thread::sleep_for(std::chrono::milliseconds(100));
        auto now = std::chrono::high_resolution_clock::now();
        if (now - start > std::chrono::seconds(2)) break;
        std::cout << val.load(std::memory_order_relaxed) << std::endl;
    }
}
void write(){
    auto start = std::chrono::high_resolution_clock::now();
    while(true){
        std::this_thread::sleep_for(std::chrono::seconds(1));
        auto now = std::chrono::high_resolution_clock::now();
        if (now - start > std::chrono::seconds(2)) break;
        val.fetch_add(1, std::memory_order_relaxed);
    }
}

 int main()
 {
     std::vector<std::thread> tv;
     tv.emplace_back(std::thread(read));
     for(int i = 0; i < 1; ++i){
         tv.emplace_back(std::thread(write));
         tv.emplace_back(std::thread(read));
     }
     for(auto&t : tv){
         t.join();
     }
 }
```

### Casual Consistency

![2024-10-20-casualconsistencymodel](../../../assets/images/2024-10-20-casualconsistencymodel.svg)

The causal consistency model, on the other hand, ensures a dependency order among threads. As shown in the graph above, Thread 2 depends on Thread 1, while Thread 3 depends on both Thread 1 and Thread 2. This means that the operations involving `x` and `z` occur after the definitions of `x` and `z`.

To implement this model, you can use a combination of `std::memory_order_release` and `std::memory_order_acquire` (or `std::memory_order_consume`). Threads tagged with `std::memory_order_acquire` (or `std::memory_order_consume`) must perform a `load` operation after the thread tagged with `std::memory_order_release` has written to the same variable.

The key difference between `std::memory_order_acquire` and `std::memory_order_consume` is that the former guarantees that the data is defined before the `x.store` operation, ensuring that Threads 2 and 3 can see the value of `data` as 50. In contrast, `std::memory_order_consume` does not provide this guarantee.

```c++
#include <atomic>
#include <iostream>
#include <thread>
#include <vector>

std::atomic<int> x = 0;
std::atomic<int> z = 0;
int data = 0;
void thread1()
{
    data = 50;
    x.store(1, std::memory_order_release);
    z.store(3, std::memory_order_release);
}

void thread2()
{
    while (!x.load(std::memory_order_consume));
    x.store(5, std::memory_order_release);
    std::cout << std::this_thread::get_id() << " x:" << x.load(std::memory_order_consume) << std::endl;
    std::cout << "data: " << data << std::endl;
}

void thread3()
{
    while (!x.load(std::memory_order_consume));
    std::cout << std::this_thread::get_id() << "  x+z:" <<
      x.load(std::memory_order_consume) + z.load(std::memory_order_consume) << std::endl;
}
```

### Sequential Consistency

If you replace `std::memory_order_release` and `std::memory_order_consume` with `std::memory_order_seq_cst` in the above code, you will achieve sequential consistency. This means that whenever a thread reads the value of `x` or `z`, it will always obtain the most recent value. Additionally, using `mutex` and `unique_lock` can help clarify this concept further.

```c++
#include <iostream>
#include <thread>
#include <vector>
#include <mutex>
#include <condition_variable>
int val = 0;
std::mutex m;
void read(){
    std::unique_lock<std::mutex> lock(m);
    std::cout << val << std::endl;
}
void write(){
    std::unique_lock<std::mutex> lock(m);
    ++val;
}

int main()
{
    std::vector<std::thread> tv;
    tv.emplace_back(std::thread(read));
    for(int i = 0; i < 3; ++i){
        tv.emplace_back(std::thread(write));
        tv.emplace_back(std::thread(read));
    }
    for(auto&t : tv){
        t.join();
    }
}
```

## Reference

[Modern-cpp](https://changkun.de/modern-cpp/zh-cn/07-thread)

[C++ std::memory_order](https://en.cppreference.com/w/cpp/atomic/memory_order)

Alex X.  System design Interview.
