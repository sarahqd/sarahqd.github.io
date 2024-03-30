---
layout: default
---


{% for post in site.posts %}

  {% capture selectedContent %}
      {{ post.excerpt | truncatewords: 27 }}
  {% endcapture %}

  <p class="container grid_page">
    <div class="title">
      <a href="{{ post.url }}">{{ post.title }}</a>
    </div>
    {{ selectedContent }}
    <p class="text-size-smaller text-last-updated">
    <img src="/assets/images/date-icon-2024-01-31-1311.svg" class="icon-setting">{{ post.created }}
    </p>
    <div class="horizontal-line"></div>
  </p>
{% endfor %}

<div class="block"></div>
