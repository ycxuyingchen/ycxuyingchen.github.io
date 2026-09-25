(() => {
  'use strict';
  document.documentElement.classList.add('js');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const demos = [...document.querySelectorAll('[data-animation]')];
  const motionButton = document.querySelector('#motion-toggle');
  let motionEnabled = !reducedMotion.matches;
  demos.forEach(img => { img.dataset.poster = img.src; });
  function setMotion(enabled) {
    motionEnabled = enabled;
    demos.forEach(img => { img.src = enabled ? img.dataset.animation : img.dataset.poster; });
    motionButton.setAttribute('aria-pressed', String(!enabled));
    motionButton.innerHTML = enabled ? '<span aria-hidden="true">Ⅱ</span> Pause demos' : '<span aria-hidden="true">▷</span> Play demos';
  }
  motionButton.hidden = false;
  motionButton.addEventListener('click', () => setMotion(!motionEnabled));
  reducedMotion.addEventListener('change', event => setMotion(!event.matches));
  setMotion(motionEnabled);

  const grid = document.querySelector('#token-grid');
  const slider = document.querySelector('#keep-ratio');
  const output = document.querySelector('#keep-output');
  const tokens = Array.from({length: 256}, (_, index) => {
    const x = index % 16, y = Math.floor(index / 16);
    const score = Math.exp(-((x-5)**2+(y-10)**2)/14) + .8*Math.exp(-((x-11)**2+(y-4)**2)/10) + .3*Math.exp(-((x-8)**2+(y-7)**2)/28) + .035*Math.sin(index*7.13);
    const element = document.createElement('i');
    element.style.setProperty('--token-color', `hsl(12 48% ${76-Math.min(score,1.25)*34}%)`);
    grid.append(element);
    return {score, element};
  }).sort((a,b) => b.score-a.score);
  function updateTokens() {
    const ratio = Number(slider.value), count = Math.round(256*ratio/100);
    tokens.forEach((token, rank) => token.element.classList.toggle('discarded', rank >= count));
    output.textContent = `${count} / 256 · ${ratio}%`;
    slider.setAttribute('aria-valuetext', `${count} of 256 tokens, ${ratio} percent`);
  }
  document.querySelector('#token-explainer').hidden = false;
  slider.addEventListener('input', updateTokens);
  updateTokens();

  const tabList = document.querySelector('.result-tabs');
  const tabs = [...tabList.querySelectorAll('[role="tab"]')];
  function activateTab(selected) {
    tabs.forEach(tab => {
      const active = tab === selected;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
    });
  }
  tabList.hidden = false;
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateTab(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = tabs[(index+1)%tabs.length];
      if (event.key === 'ArrowLeft') next = tabs[(index+tabs.length-1)%tabs.length];
      if (event.key === 'Home') next = tabs[0];
      if (event.key === 'End') next = tabs[tabs.length-1];
      if (next) { event.preventDefault(); activateTab(next); next.focus(); }
    });
  });
  activateTab(tabs[0]);

  const copyButton = document.querySelector('#copy-citation');
  const copyStatus = document.querySelector('#copy-status');
  copyButton.hidden = false;
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(document.querySelector('#bibtex').textContent);
      copyStatus.textContent = 'BibTeX copied to clipboard.';
    } catch (_) {
      const range = document.createRange();
      range.selectNodeContents(document.querySelector('#bibtex'));
      const selection = window.getSelection();
      selection.removeAllRanges(); selection.addRange(range);
      copyStatus.textContent = 'Citation selected. Press Command+C or Ctrl+C to copy.';
    }
  });
})();
