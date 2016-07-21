---
layout: default
body-class: our-work
title: Our Work
permalink: /work/
---

<section class="hero-slider">
  <div class="flash-gallery-wrapper">
    <ul class="flash-gallery bx-slider">
      <li><img src="{{ site.baseurl }}/assets/images/our-services.jpg" alt="group meeting" alt="About Us"/></li>
    </ul> 
  </div> 
</section>

<section class="content">
  <h1 class="page-title">{{ page.title }}</h1>
  <h2>We make engaging and effective websites. Check ‘em out!</h2>
  <p>From a simple website to a sophisticaed ecommere solution, we focus on the key drivers that will help grow your business.</p>
</section>

{% assign case-studies = (site.case_studies | where: "active", "true" | sort: "order") %}
  <div class="our-work work-listing">
  {% for preview in case-studies | limit: 4 %}
    <section class="case-study-header image-center {{ preview.cs-class }}">
    <style>
      .image-center.{{ preview.cs-class }} { background-image: url('{{ site.baseurl }}{{ preview.cs-preview.image }}'); }
    </style>
      <div class="gradient">&nbsp;</div>
      <div class="wrapper">
        <h4>{{ preview.cs-preview.topic }}</h4>
        <h2>{{ preview.cs-preview.client }}</h2>
        <p class="description">{{ preview.cs-preview.description }}</p>
        <p><a href="{{ preview.cs-homepage.url }}" data-featherlight="image" class="uppercase-link" target="_blank" style="width:50px;">See Homepage <i class="fa fa-caret-right"></i></a></p>
      </div>
    </section>
  {% endfor %}
  </div>
