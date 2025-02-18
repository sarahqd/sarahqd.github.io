---
layout: post
title: "Important features in Modern C++"
tags: ["Programming"]
created: February 11, 2025
last_updated: February 17, 2025
---

Modern C++ has been evolving, continuously incorporating advanced features from other languages like Python and Java. From many perspectives, C++17 and C++20 are significantly different from earlier versions of C++.<!---more--->

Modern C++ introduces more modern containers, such as `std::any`(C++17), `std::variant`(C++17), `std::optional`(C++17) and `std::span`(C++20), making C++ more powerful and convenient to use. However, the details of using these containers are beyond the scope of this blog.

This blog will focus on the new features in **template metaprogramming**, Python-style  **generators**, the **ranges library**, and **modules**.

## Template

Templates generate code at compile time, reducing the number of lines and enhancing C++'s flexibility. This is why templates are sometimes referred to as "dark magic". Although templates were introduced in earlier versions of C++, C++17 and C++20 provide even more powerful features, such as **fold expressions** and **constraints & concepts**.

### Folder expressions (C++17)

Folder expressions allow the direct application of operators to  `...` symbol, such as`...& `, `&...`, `...|`, `|...`.  Here is a simple example:

```c++
template<typename ... T>
constexpr auto multiply(T ... t) {
    return (t * ...);
};

int main()
{
    std::cout << multiply(1, 3) << std::endl; //output 3
    std::cout << multiply("Hello", "World") << std::endl; //error
    return 0;
}
```

When the C++ compiler processes the code above, it produces an error in the console. The error points to the return statement, but we know the actual issue is that the input parameters are of an inappropriate type—`std::string` instead of `float` or `int`.

```
main.cpp: In instantiation of ‘auto multiply(T ...) [with T = {const char*, const char*}]’:
main.cpp::   required from here
      |     std::cout << multiply("Hello", "World") << std::endl;
      |                  ~~~~~~~~~^~~~~~~~~~~~~~~~~~
main.cpp:38:15: error: invalid operands of types ‘const char*’ and ‘const char*’ to binary ‘operator*’
      |     return (t * ...);
```

### Constraints & Concepts (C++ 20)

C++20 addresses the above issue, where the compiler may generate confusing error message. To solve this, C++20 introduces Constraints & Concepts. Constraints restrict the type of the input parameters `T`, and concept is a collection of constraints. Both of them make the template more readable and easier to understand.

Constraints are defined using the keyword `requires` and conjunction symbol `&&` or `||`.

```c++
template <typename T>
requires std::is_integral_v<T>
constexpr auto add(T t1, T t2){
    return t1 + t2;
}
```

we have new template after modifying the example in the **folder expressions** with **Concepts**.

```c++
template <typename ... T>
concept inputConstraints = std::is_integral_v<T...> || std::is_floating_point_v<T...>;

template <inputConstraints ... T>
constexpr auto multiply(T ... t) {
    return (t * ...);
};

int main()
{
    std::cout << multiply(1, 3) << std::endl; //output 3
    std::cout << multiply("Hello", "World") << std::endl;    
    return 0;
}
```

`multiply("Hello", "World")` also throws error at compile time, but the error points to the input parameter type directly.

```
main.cpp: In function ‘int main()’:
main.cpp: error: no matching function for call to ‘multiply(const char [6], const char [6])’
      |     std::cout << multiply("Hello", "World") << std::endl;
      |                  ~~~~~~~~~^~~~~~~~~~~~~~~~~~
main.cpp: note: candidate: ‘template  requires (... && inputConstraints) auto multiply(T ...)’
      | auto multiply(T ... t) {
```

## Generator

If you're familiar with python, you might have used `yield` to create a lazy-evaluated generator. That means values are computed only when you need. Take a look at the example below.

```python
def generator(x):
    for i in range(x):
        yield i

gen = generator(5) 
for i in range(5):
    try:
        print(next(gen))
    except StopIteration as e:
        print("generator return:", e.value)
        break
```

```
#output
0
1
2
3
4
```

### Coroutines (C++ 20)

C++20 introduces `coroutines` to implement a Python-like generator, though the implement is more complex. You need to define several functions and a `promise_type` object to handle coroutines properly. The most important keywords include `co_yield`, `co_wait` and `co_return`.  We use those keywords to construct generators or schedule tasks. Below is the equivalent C++20 implementation of the Python generator.

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
    for (int i = 0; i < 5; ++i) {
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

## Ranges library(C++20)

The ranges library provides a collection of modern functions for constructing and manipulating lists. Below is a comparison of similar methods in Python and C++20.

| python                        | c++20                                   |
| ----------------------------- | --------------------------------------- |
| range                         | std::views::iota                        |
| [:5]/[5:]                     | std::views::take(5)/std::views::drop(5) |
| map                           | std::views::transform                   |
| filter                        | std::views::filter                      |
| .sort (in-place algorithm)    | std::ranges::sort                       |
| .reverse (in-place algorithm) | std::ranges::reverse                    |

`Views` build views of `vectors` or `arrays`,  operate on those data structures but not change them.  You'd better convert a `range` to a specific `vector` or `array` with `std::ranges::to<T>()` if you'd like to do `sort` or `reverse` operation. 

Now let's try to build a series of integers, map with square function and filter out the even number. We'll write the code in Python and C++20 separately.

```python
filteredNum = list(filter(lambda x:x%2 == 0, list(map(lambda x:x*x, range(1,10)))))
print(filteredNum) # output [4, 16, 36, 64]
```

```c++
#include <iostream>
#include <ranges>
#include <algorithm>
int main() {
    std::ranges::for_each(std::views::iota(1, 10)
        | std::views::transform([](int x) { return x * x; })
        | std::views::filter([](int x) { return x % 2 == 0; }),
        [](int x){std::cout << x << " ";});
    return 0;
}
```

Like generator, `ranges` are also lazy evaluated. Besides, Range uses `|` to perform chain operations similar to how Linux command pipelines work. Overall, `ranges` are more flexible and efficient than traditional containers `vector` or `list`.

## Module(C++20)

In a complex `.cpp` file,  you could find dozens of header files included, which mess up the code a bit. In C++20,  `modules ` finally become available.  Packaging the exported interfaces in a `.ixx` file and implementing the interfaces in other `.cpp` files,  we no longer need to `#include` any headers in theory.  However, since `modules` aren't compatible with older libraries,  some headers still need to be `#include`.

## Summary

With **template metaprogramming**, Python-style  **generators**, the **ranges library**, and **modules**,  programmers could do more exciting things quickly and efficiently.

### References

[The Key Differences Between C++14, C++17, and C++20](https://www.geeksforgeeks.org/cpp14-vs-cpp17-vs-cpp20/)

[C++ Template](https://changkun.de/modern-cpp/zh-cn/02-usability/#2-5-模板)

[Ranges library (since C++20) - cppreference.com](https://en.cppreference.com/w/cpp/ranges)