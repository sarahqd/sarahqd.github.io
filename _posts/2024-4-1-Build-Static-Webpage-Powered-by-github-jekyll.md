---
layout: post
title:  "Build a personal website powered by GitHub and Jekyll"
tag: ["Html"]
created: April 1, 2024
last_updated: April 1, 2024
image: ../../../assets/images/2024-4-1-github-jekyll.jpeg
---
GitHub has provided every user with a free webpage URL.  If what you want to build is just a static and open-source website, GitHub pages is the best choice .<!--more-->

## Build up environment

You could find the detailed message on [GitHub Pages](https://pages.github.com/). I'm really fond of writing my blogs in Markdown, so it's pretty comfortable to build up the website with Jekyll. And GitHub pages support Jekyll and Kramdown by default. You can find more on [Jekyll doc](https://jekyllrb.com/docs/).

## Structure of Jekyll website code

A usual Jekyll website has folders below. Put all elements you need into the folders,  and `Jekyll serve` will start the website with `localhost::xxxx`( The port is not fixed on different PC ). 

```
_drafts    //If you make drafts and don't want them to show on the website, put them in this folder
_includes  //template html, e.g. header and footer
_layouts   //default html, including header and footer
_posts     //markdown page, with a format 2024-1-2-titlexxxx.md
assets     //basic elements of a webpage
  css
  images
  js
_config.yml //configuration
about.markdown  //about page with default layout
index.markdown  //home page with default layout
```

With [`Liquid`]((https://shopify.github.io/liquid/basics/introduction/)) template language, we can handle the variables of `.md` posts. We could use `site.tags`, `site.posts` to access all tags in the post and all posts. And with `page.title` and `page.content` ,  the post of current webpage will be accessed. It's so convenient to operate those static posts.

## Design components of website

There are a lot of free and beautiful templates on websites, such as [Hexo](https://hexo.io/). But at first, I'm not targeting a blog website. I was learning a course about Html, CSS and JavaScript at that time. The only thing I'd like to set up is a simple webpage showing my information like a resume. As I finished it, my ambition expanded. I gave up using a ready-made template and chose to implement my blog webpages on my own. 

I searched and looked at the basic components of a simple blog website. They are alternatively `Home`, `Archieves`, `Categories`, `About` and maybe `Search`.  I need to settle them on the navbar. 

On the `Home` page, all of the posts will be listed from the newest to the oldest, showing the first paragraph and created date as well. `Archieves` saves all of the posts with only post titles and a created date, with year tags on the top of the page, page routed to the specific year section via clicking the tag. Tags for all posts will be listed on the `Categories` page. When a click event is emitted from the bottom tag of a post or the tags on the top of the `Categories` page, the website will route to the section of the list of posts with the tag. Finally, I'll post my simple resume on the `About` page. Maybe a `Search` action will provide a search of my website content.

## Use Bootstrap to power the webpage

Bootstrap is a powerful tool producing beautiful components. I use it to do the navbar. It looks like this.

![](../../../assets/images/nav-2024-04-01-094247.png){:class="post-img"}

Use it in the default html <head> part with CDN URL.

```Html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">

```

## Rethink about feeling of visitors

The original webpage has been only black and white colored. And the spacing between lines and paragraphs is so tight. When I invited my friend to talk about how they feel about it, they said they felt tension and nervous. 

After I changed the font-family, expanded the spacing, formatted the paragraphs and added more color into the webpages,  it looks better. 

To be honest, it's still too simple and I'm not expecting it to be advanced. But I'm trying to use vue3 to add some dynamic elements next.
