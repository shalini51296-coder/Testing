// Tara, the baby elephant companion (pedagogical agent; persona effect, Schroeder et al. 2013).
// Moods: idle | happy | think | encourage | talk | sleepy | wave
// She models mistakes kindly, points at targets (signalling), and never shows
// disappointment at a wrong answer.

const SVG = `
<svg class="tara-svg" viewBox="0 0 220 220" aria-hidden="true">
  <defs>
    <radialGradient id="tg-skin" cx="45%" cy="35%" r="70%">
      <stop offset="0" stop-color="#C3CBEA"/><stop offset="1" stop-color="#97A3D3"/>
    </radialGradient>
    <radialGradient id="tg-ear" cx="50%" cy="45%" r="60%">
      <stop offset="0" stop-color="#F7C6D3"/><stop offset="1" stop-color="#EBA3B8"/>
    </radialGradient>
  </defs>
  <ellipse class="t-shadow" cx="110" cy="212" rx="62" ry="7" fill="#000" opacity=".08"/>
  <g class="t-body">
    <ellipse cx="110" cy="182" rx="52" ry="34" fill="url(#tg-skin)"/>
    <ellipse cx="82" cy="206" rx="15" ry="9" fill="#97A3D3"/>
    <ellipse cx="138" cy="206" rx="15" ry="9" fill="#97A3D3"/>
    <path d="M150 170 q22 2 24 -14" stroke="#97A3D3" stroke-width="5" fill="none" stroke-linecap="round"/>
  </g>
  <g class="t-head">
    <g class="t-ear t-ear-l">
      <ellipse cx="52" cy="92" rx="44" ry="50" fill="url(#tg-skin)"/>
      <ellipse cx="56" cy="94" rx="30" ry="36" fill="url(#tg-ear)"/>
    </g>
    <g class="t-ear t-ear-r">
      <ellipse cx="168" cy="92" rx="44" ry="50" fill="url(#tg-skin)"/>
      <ellipse cx="164" cy="94" rx="30" ry="36" fill="url(#tg-ear)"/>
      <g class="t-flower" transform="translate(186 56)">
        <circle r="7" cx="0" cy="-7" fill="#FFA62B"/><circle r="7" cx="7" cy="0" fill="#FFA62B"/>
        <circle r="7" cx="0" cy="7" fill="#FFA62B"/><circle r="7" cx="-7" cy="0" fill="#FFA62B"/>
        <circle r="5" fill="#FFD166"/>
      </g>
    </g>
    <circle cx="110" cy="96" r="58" fill="url(#tg-skin)"/>
    <path d="M100 40 q4 -12 10 -2 q6 -10 10 2" stroke="#7C88BC" stroke-width="4" fill="none" stroke-linecap="round"/>
    <circle cx="78" cy="112" r="10" fill="#F4A9BD" opacity=".7"/>
    <circle cx="142" cy="112" r="10" fill="#F4A9BD" opacity=".7"/>
    <g class="t-eyes">
      <g class="t-eyes-open">
        <ellipse class="t-eye" cx="88" cy="88" rx="9" ry="12" fill="#2B2D42"/>
        <ellipse class="t-eye" cx="132" cy="88" rx="9" ry="12" fill="#2B2D42"/>
        <circle cx="91" cy="83" r="3.5" fill="#fff"/><circle cx="135" cy="83" r="3.5" fill="#fff"/>
      </g>
      <g class="t-eyes-happy">
        <path d="M78 90 q10 -12 20 0" stroke="#2B2D42" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M122 90 q10 -12 20 0" stroke="#2B2D42" stroke-width="5" fill="none" stroke-linecap="round"/>
      </g>
    </g>
    <path class="t-mouth" d="M96 124 q14 10 28 0" stroke="#5B4B6B" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <path class="t-trunk" d="M110 104 C110 140, 104 150, 116 160 C126 168, 140 160, 136 150"
          stroke="url(#tg-skin)" stroke-width="22" fill="none" stroke-linecap="round"/>
    <path class="t-trunk-lines" d="M101 128 h18 M102 140 h16" stroke="#8C98C9" stroke-width="2" stroke-linecap="round"/>
  </g>
</svg>`;

export function createTara(size = 140) {
  const el = document.createElement('div');
  el.className = 'tara mood-idle';
  el.style.setProperty('--tara-size', size + 'px');
  el.innerHTML = SVG;
  let moodTimer = null;
  return {
    el,
    mood(m, ms = 0) {
      el.className = `tara mood-${m}`;
      clearTimeout(moodTimer);
      if (ms) moodTimer = setTimeout(() => (el.className = 'tara mood-idle'), ms);
    },
    talking(on) {
      el.classList.toggle('talking', on);
    },
  };
}
