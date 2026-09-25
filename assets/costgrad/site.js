(() => {
  'use strict';
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
