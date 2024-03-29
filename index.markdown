---
layout: default
---


{% for post in site.posts %}

  {% capture selectedContent %}
      {{ post.excerpt | truncatewords: 27 }}
  {% endcapture %}

  <p class="container grid_page">
    <h2>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <div class="horizontal-line"></div>
    </h2>
    {{ selectedContent }}
  </p>


{% endfor %}