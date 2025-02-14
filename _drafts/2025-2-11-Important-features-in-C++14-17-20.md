---
layout: post
title: "Important features in Modern C++"
tags: ["Programming"]
created: February 11, 2025
last_updated: February 11, 2025
---





## Template



### Folder expressions (C++ 17)



```c++
template<typename ... T>
auto multiply(T ... t) {
    return (t * ...);
};

int main()
{
    std::cout << multiply(1, 3) << std::endl; //3
    std::cout << multiply("Hello", "World") << std::endl;
    return 0;
}
```



```
main.cpp: In instantiation of ‘auto multiply(T ...) [with T = {const char*, const char*}]’:
main.cpp::   required from here
      |     std::cout << multiply("Hello", "World") << std::endl;
      |                  ~~~~~~~~~^~~~~~~~~~~~~~~~~~
main.cpp:38:15: error: invalid operands of types ‘const char*’ and ‘const char*’ to binary ‘operator*’
      |     return (t * ...);
```



### Constraint and Concept (C++ 20)

Though 

```c++
template <typename ... T>
concept inputConstraints = std::is_integral_v<T...> || std::is_floating_point_v<T...>;

template <inputConstraints ... T>
auto multiply(T ... t) {
    return (t * ...);
};

int main()
{
    std::cout << multiply(1, 3) << std::endl; //3
    std::cout << multiply("Hello", "World") << std::endl;    
    return 0;
}
```



```
main.cpp: In function ‘int main()’:
main.cpp: error: no matching function for call to ‘multiply(const char [6], const char [6])’
      |     std::cout << multiply("Hello", "World") << std::endl;
      |                  ~~~~~~~~~^~~~~~~~~~~~~~~~~~
main.cpp: note: candidate: ‘template  requires (... && inputConstraints) auto multiply(T ...)’
      | auto multiply(T ... t) {
```



## Asynchronous Programming

### Coroutines (C++ 20)



```c++
#include <coroutine>
struct Generator {
    // Mandatory
    struct promise_type {
        // Customized
        int current_value;
        
        // Mandatory
        Generator get_return_object() { 
            return Generator{std::coroutine_handle<promise_type>::from_promise(*this)};
        }

        std::suspend_always initial_suspend() { return {}; }
        std::suspend_always final_suspend() noexcept { return {}; }

        std::suspend_always yield_value(int value) {
            current_value = value;
            return {};
        }

        void return_void() {} // or return_value(T)

        void unhandled_exception() { std::terminate(); }
    };

    std::coroutine_handle<promise_type> m_handle;

    Generator(std::coroutine_handle<promise_type> handle) : m_handle(handle) {}

    ~Generator() { if (m_handle) m_handle.destroy();}

    //customized
    int next() {
        m_handle.resume();
        return m_handle.promise().current_value;
    }
};

Generator gen() {
    for (int i = 0; i < 3; ++i) {
        co_yield i; // suspend and run yield_value()
    }
}

int main(){
    Generator genNum = gen();
    for (int i = 0; i < 5; ++i) {
        std::cout << "Generated: " << genNum.next() << std::endl;
    }
    return 0;
}
```





## Module





### References

[The Key Differences Between C++14, C++17, and C++20]([The Key Differences Between C++14, C++17, and C++20 - GeeksforGeeks](https://www.geeksforgeeks.org/cpp14-vs-cpp17-vs-cpp20/))

[C++ Template](https://changkun.de/modern-cpp/zh-cn/02-usability/#2-5-模板)