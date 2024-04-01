---
layout: post
title:  "Build a personal website powered by GitHub and Jekyll"
tag: html
created: April 1, 2024
last_updated: April 1, 2024
---
GitHub has provided every user with a free webpage URL.  If what you want to build is just a static and open-source website, GitHub pages is the best choice .<!--more-->

## Build up environment

You could find the detailed message on [GitHub Pages](https://pages.github.com/). I'm really fond of writing my blogs in Markdown, so it's pretty comfortable to build up the website with Jekyll. And GitHub pages support Jekyll and Kramdown by default. You can find more on [Jekyll doc](https://jekyllrb.com/docs/).

## Structure of Jekyll website code





## Design components of website

There are a lot of free and beautiful templates on websites, such as [Hexo](https://hexo.io/). But at first, I'm not targeting a blog website. I was learning a course about Html, CSS and JavaScript at that time. The only thing I'd like to set up is a simple webpage showing my information like a resume. As I finished it, my ambition expanded. I refused to use a ready-made template and chose to implement my blog webpages on my own. 

I searched and looked at the basic components of a simple blog website. They are alternatively `Home`, `Archieves`, `Categories`, `About` and maybe `Search`.  I need to settle them on the navbar. 

![](../../../assets/images/nav-2024-04-01-094247.png){:class="post-img"}

On the `Home` page, all of the posts will be listed from the newest to the oldest, showing the first paragraph and created date as well. `Archieves` saves all of the posts with only post titles and a created date, with year tags on the top of the page, page routed to the specific year section via clicking the tag. Tags for all posts will be listed on the `Categories` page. When a click event is emitted from the bottom tag of a post or the tags on the top of the `Categories` page, the website will route to the section of the list of posts with the tag. Finally, I'll post my simple resume on the `About` page. Maybe a `Search` action will provide a search of my website content.





