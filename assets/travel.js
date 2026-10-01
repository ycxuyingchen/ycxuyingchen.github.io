(() => {
  const map = document.querySelector('#travel-map');
  if (!map) return;

  const status = document.querySelector('#map-status');
  const search = document.querySelector('#place-search');
  const searchStatus = document.querySelector('#search-status');
  const places = [...document.querySelectorAll('[data-map-id]')];
  const regions = [...document.querySelectorAll('.place-region')];
  const zoomIn = document.querySelector('#map-zoom-in');
  const zoomOut = document.querySelector('#map-zoom-out');
  const reset = document.querySelector('#map-reset');
  let zoom = 1;
  let center = { x: 500, y: 250 };
  let drag = null;
  let dragged = false;

  document.querySelector('.map-controls').hidden = false;
  document.querySelector('.place-search').hidden = false;
  const hint = () => zoom > 1
    ? 'Drag to move the map. Use arrow keys when the map is focused.'
    : 'Hover or tap a place to see its name.';
  status.textContent = hint();

  function clearHighlight() {
    document.querySelectorAll('.is-highlighted').forEach(node => node.classList.remove('is-highlighted'));
    status.textContent = hint();
  }

  function highlight(country) {
    clearHighlight();
    if (!country) return;
    country.classList.add('is-highlighted');
    const row = places.find(place => place.dataset.mapId === country.id);
    if (row) row.classList.add('is-highlighted');
    status.textContent = `${country.dataset.name} · ${country.dataset.visited === 'true' ? 'Visited' : 'Not yet visited'}`;
  }

  map.addEventListener('pointerover', event => {
    if (!drag) highlight(event.target.closest('.map-country'));
  });
  map.addEventListener('pointerleave', () => { if (!drag) clearHighlight(); });
  map.addEventListener('click', event => {
    if (zoom === 1 && !dragged) highlight(event.target.closest('.map-country'));
  });
  places.forEach(place => {
    place.addEventListener('pointerenter', () => highlight(document.getElementById(place.dataset.mapId)));
    place.addEventListener('pointerleave', clearHighlight);
  });

  const normalize = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  search.addEventListener('input', () => {
    const query = normalize(search.value);
    let matches = 0;
    places.forEach(place => {
      place.hidden = !normalize(place.textContent).includes(query);
      if (!place.hidden) matches++;
    });
    regions.forEach(region => {
      const visible = [...region.querySelectorAll('li')].filter(place => !place.hidden).length;
      region.hidden = visible === 0;
      region.querySelector('.region-count').textContent = visible;
    });
    searchStatus.hidden = !query;
    searchStatus.textContent = matches
      ? `${matches} ${matches === 1 ? 'place' : 'places'} found`
      : 'No places found. Try another name.';
    clearHighlight();
  });

  function drawMap() {
    const width = 1000 / zoom;
    const height = 500 / zoom;
    center.x = Math.max(width / 2, Math.min(1000 - width / 2, center.x));
    center.y = Math.max(height / 2, Math.min(500 - height / 2, center.y));
    map.setAttribute('viewBox', `${center.x - width / 2} ${center.y - height / 2} ${width} ${height}`);
    map.classList.toggle('is-zoomed', zoom > 1);
    // Keyboard panning is available alongside the visible zoom controls.
    if (zoom > 1) map.setAttribute('tabindex', '0');
    else map.removeAttribute('tabindex');
    zoomIn.disabled = zoom === 4;
    zoomOut.disabled = zoom === 1;
    clearHighlight();
  }
  zoomIn.addEventListener('click', () => { zoom = Math.min(4, zoom + 1); drawMap(); });
  zoomOut.addEventListener('click', () => { zoom = Math.max(1, zoom - 1); drawMap(); });
  reset.addEventListener('click', () => { zoom = 1; center = { x: 500, y: 250 }; drawMap(); });
  map.addEventListener('keydown', event => {
    const offsets = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    if (zoom === 1 || !offsets[event.key]) return;
    event.preventDefault();
    center.x += offsets[event.key][0] * 80 / zoom;
    center.y += offsets[event.key][1] * 80 / zoom;
    drawMap();
  });
  map.addEventListener('pointerdown', event => {
    dragged = false;
    if (zoom === 1 || event.button !== 0) return;
    drag = { x: event.clientX, y: event.clientY, center: { ...center } };
    map.setPointerCapture(event.pointerId);
    map.classList.add('is-dragging');
  });
  map.addEventListener('pointermove', event => {
    if (!drag) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    dragged = dragged || Math.abs(dx) + Math.abs(dy) > 4;
    const scale = 1000 / zoom / map.getBoundingClientRect().width;
    center = { x: drag.center.x - dx * scale, y: drag.center.y - dy * scale };
    drawMap();
  });
  const endDrag = () => { drag = null; map.classList.remove('is-dragging'); };
  map.addEventListener('pointerup', event => {
    if (drag && !dragged) {
      highlight(document.elementFromPoint(event.clientX, event.clientY)?.closest('.map-country'));
    }
    endDrag();
  });
  map.addEventListener('pointercancel', endDrag);
  map.addEventListener('lostpointercapture', endDrag);
})();
