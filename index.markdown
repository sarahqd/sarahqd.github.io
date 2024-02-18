---
layout: default
---


{% for post in site.posts %}
  {% capture selectedContent %}
      {{ post.excerpt | truncatewords: 27 }}
  {% endcapture %}

  <div class="container grid_page">
  <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
  {{ selectedContent }}
  </div>

{% endfor %}