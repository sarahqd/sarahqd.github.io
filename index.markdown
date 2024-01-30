---
layout: default
---

<ul>
  {% for post in site.posts %}
      <div class="container grid_page">
      <a href="{{ post.url }}">{{ post.title }}</a>
      {{ post.excerpt }}
      </div>
  {% endfor %}
</ul>