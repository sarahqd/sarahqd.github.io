---
layout: post
title:  "When A C++ engineer begins to write javascript"
tags: javascript software
created: January 23, 2024
last_updated: February 21, 2024
---
One day, there was a task in need of a small javascript function in my work, and I decided to do it myself. I thought if I could write in one kind of coding language then I could manage to use another one.It sounds like if a person could speak Chinese, then he must speak English easily. It's funny. But the javascript code I wrote works ok, even though it looks more c++ style. 
<!--more-->
Quite C++ style javascript code.

```javascript
function getString(){
    if(...){
        return str_string
    }else{
        return false
    }
}

async function handleString(str_string){
    let string = getString()
    if(string == false){
        ...
    }else{
        ...
    }
}
```

Then I tried to change it to be more native javascript style.

```javascript
async function getString(cb){
    let err = false
    if(...){
        cb(!err, str_string)
    }else{
        cb(err)
    }
}

async function handleString(){
    let str_string = ''
    await getString( (err, string) => {
        if(err){
            console.log('Failed to get string')
            str_string = ""
        }else{
            str_string = string
    })
}
```

I felt more comfortable with `asynchronous` code.  At the same time, I got the significance of `await`, for I got trapped into the callback as well.  Take code below for example. 

```javascript
async function add(int_num, cb){
    let err = false
    if(...){
        cb(!err, int_num + 1)
    }else{
        cb(err)
    }
}

async function Iterate(int_begin){
    add(int_begin, (err, int_add) => {
        if(!err){
            int_begin = int_add + int_begin 
        }
        //call main function in the callback of 'add'
        if(int_begin < 100){
            Iterate(int_begin) 
        }
    })
}
```

It looks similar to the c++ iteration but more difficult to understand.  With `await`, we could simplify the code by doing with it synchronously. That looks better and simpler now.

```javascript
async function add(int_num, cb){
    let err = false
    if(...){
        cb(!err, int_num + 1)
    }else{
        cb(err)
    }
}

async function Iterate(int_begin){
    while (int_begin < 100) {
        //wait until 
        await add(int_begin, (err, int_add) => {
            if(!err){
                int_begin = int_add + int_begin 
            }
        })
    }
}
```

