---
layout: profile
title: Travel
order: 2
travel: true
---

<header class="travel-intro">
  <div>
    <h1>Travels</h1>
    <p>A map of the places I’ve visited.</p>
  </div>
  <div class="travel-total"><strong>{{ site.data.travel | size }}</strong><span>places visited</span></div>
</header>

<figure class="travel-map-panel">
  <div class="map-toolbar">
    <p>From Guangzhou, out into the world.</p>
    <div class="map-controls" aria-label="Map controls" hidden>
      <button type="button" id="map-zoom-out" aria-label="Zoom out" disabled>−</button>
      <button type="button" id="map-zoom-in" aria-label="Zoom in">+</button>
      <button type="button" id="map-reset">Reset</button>
    </div>
  </div>
  {% include travel-map.html %}
  <figcaption class="map-caption">
    <div class="map-legend"><span><i class="map-key" aria-hidden="true"></i>Visited</span><span><i class="map-key unvisited" aria-hidden="true"></i>Not yet visited</span></div>
    <p><span class="hometown-key" aria-hidden="true"></span>Guangzhou, China · Hometown</p>
  </figcaption>
</figure>
<p class="map-status" id="map-status" role="status">The complete list is below.</p>

<section class="places-section" aria-labelledby="places-heading">
  <div class="places-header">
    <h2 class="section-heading" id="places-heading">Places visited</h2>
    <div class="place-search" hidden>
      <label for="place-search">Find a place</label>
      <input id="place-search" type="search" placeholder="e.g. Japan" autocomplete="off" aria-controls="places-list">
    </div>
  </div>
  <p class="search-status" id="search-status" role="status" hidden></p>
  <div class="places-grid" id="places-list">
    {% assign regions = 'Europe,Asia,Africa,North America,South America,Oceania' | split: ',' %}
    {% for region in regions %}
      {% assign places = site.data.travel | where: 'region', region | sort: 'name' %}
      <section class="place-region" aria-labelledby="region-{{ region | slugify }}">
        <h3 id="region-{{ region | slugify }}">{{ region }} <span class="region-count">{{ places | size }}</span></h3>
        <ul>
          {% for place in places %}
          <li data-map-id="{{ place.map_id }}">{{ place.name | escape }}</li>
          {% endfor %}
        </ul>
      </section>
    {% endfor %}
  </div>
</section>
