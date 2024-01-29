---
layout: default
title:  "When A C++ engineer begins to write javascript"
tags: javascript software
#category: 2024
date: 2024-01-23 13:34:18 +0800
---
# A C++ engineer begins to write javascript

One day, there was a task in need of a small javascript function in my work, and I decided to do it myself. I thought if I could write in one kind of coding language then I could manage to use another one(It sounds like if a person could speak Chinese, then he must speak English easily. It's funny). But the javascript code I wrote works ok, even though it looks more c++ style. 

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

Then I tried to be more native javascript style.

```javascript
async function getString(cb){
    if(...){
        cb(true, str_string)
    }else{
        cb(false)
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

I feel more comfortable with **asynchronous** code.  At the same time, I got the meaning of 'await', for I got trapped into the callback as well. 

```javascript


async function add(int_num, (err, int_add) => {
    if(!err){
        int_num = int_add + int_num 
    }
})
```

