// Aomi video kit: the parts every Aomi video shares, as one classic script so any film can use it.
//   <link rel="stylesheet" href="kit/kit.css"><script src="kit/kit.js"></script>
// Then, in the film:
//   const K = window.AOMI_KIT;
//   const title = K.title(stage, { eyebrow, title, subtitle });   // title card
//   const outro = K.outro(stage, { title, link });                  // veil + lockup + title + link
//   K.film({ duration, seek(t) { …; title.seek(t, 3.4); outro.seek(t, duration - 4.6); } });
// K.film wires the playback contract (window.__AOMI_VIDEO__, ?t=, ?render, fit-to-window), applies the
// voice-over time warp from vo/timeline.js when it exists, and draws the subtitles from its cues.
// The mark's paths come from assets/logo/aomi-mark.svg; scripts/check.mjs verifies they still match.
(() => {
  const cl = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x)), seg = (t, a, b) => cl((t - a) / (b - a)), lerp = (a, b, x) => a + (b - a) * x;
  const eio = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2, eout = x => 1 - Math.pow(1 - x, 3);
  const eback = x => { const c1 = 1.70158, c3 = c1 + 1; return x <= 0 ? 0 : 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
  const win = (t, a, b, f = .4) => Math.min(seg(t, a, a + f), 1 - seg(t, b - f, b));
  const MARK_PATHS = 'M321.778 94.2349C321.778 64.4045 297.595 40.2222 267.765 40.2222C237.935 40.2222 213.752 64.4045 213.752 94.2349C213.752 124.065 237.935 148.248 267.765 148.248C297.595 148.248 321.778 124.065 321.778 94.2349ZM362 94.2349C362 146.279 319.81 188.47 267.765 188.47C215.721 188.47 173.53 146.279 173.53 94.2349C173.53 42.1904 215.721 1.33271e-06 267.765 0C319.81 0 362 42.1904 362 94.2349Z|M181 0C184.792 0 188.556 0.116399 192.289 0.346221C189.506 2.74481 186.833 5.26892 184.28 7.90977C170.997 20.759 160.669 36.6452 154.42 54.4509C95.7682 66.7078 51.7143 118.709 51.7143 181C51.7143 252.403 109.597 310.286 181 310.286C243.292 310.286 295.291 266.231 307.547 207.58C325.364 201.327 341.259 190.99 354.113 177.695C356.745 175.149 359.261 172.486 361.653 169.71C361.883 173.444 362 177.208 362 181C362 280.964 280.964 362 181 362C81.0365 362 0 280.964 0 181C0 81.0365 81.0365 0 181 0Z';
  const mark = (fill = '#09090b') => `<svg viewBox="0 0 362 362" fill="${fill}" xmlns="http://www.w3.org/2000/svg">${MARK_PATHS.split('|').map(d => `<path d="${d}"/>`).join('')}</svg>`;
  const el = html => { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; };
  const text = (root, sel, s) => { root.querySelector(sel).textContent = s; };

  function title(stage, meta = {}) {
    const e = el('<div class="aomi-title"><div class="eyebrow"><i></i><span></span></div><h1></h1><p></p></div>');
    text(e, '.eyebrow span', meta.eyebrow || 'Aomi Labs'); text(e, 'h1', meta.title || ''); text(e, 'p', meta.subtitle || '');
    stage.appendChild(e);
    return { el: e, seek(T, intro = 3.4) { // rises in, holds, leaves before `intro`
      e.style.opacity = Math.min(seg(T, .15, .7), 1 - seg(T, intro - .9, intro - .35));
      e.style.transform = `translateY(${(1 - eout(seg(T, .15, .9))) * 18}px)`; } };
  }

  function outro(stage, meta = {}) {
    const veil = el('<div class="aomi-veil"></div>');
    const e = el(`<div class="aomi-outro"><div class="lock">${mark()}<div class="wm">aomi</div></div><div class="t"></div><div class="l"></div></div>`);
    text(e, '.t', meta.title || ''); text(e, '.l', meta.link || 'aomi.dev · @aomi_labs');
    stage.append(veil, e);
    const lock = e.querySelector('.lock'), t = e.querySelector('.t'), l = e.querySelector('.l');
    return { el: e, veil, seek(T, O) { // O: when the outro starts (duration − 4.6)
      veil.style.opacity = eio(seg(T, O, O + .9)); e.style.opacity = seg(T, O + .5, O + .9);
      lock.style.transform = `scale(${lerp(.92, 1, eout(seg(T, O + .5, O + 1.4)))})`;
      [[t, O + 1.2], [l, O + 1.6]].forEach(([x, a]) => { x.style.opacity = seg(T, a, a + .6); x.style.transform = `translateY(${(1 - eout(seg(T, a, a + .8))) * 16}px)`; }); } };
  }

  function chapter(stage, label) {
    const e = el('<div class="aomi-chap"><i></i><span></span></div>'); text(e, 'span', label); stage.appendChild(e);
    return { el: e, seek(T, a, b) { e.style.opacity = win(T, a, b, .35); } };
  }

  // narrated clock → film clock, from vo/timeline.js (build-timeline.mjs). Identity without one.
  const TL = () => window.VO_TL || null;
  function oldTime(T) {
    const tl = TL(); if (!tl || !tl.anchors) return T; const A = tl.anchors; if (T <= A[0][0]) return A[0][1];
    for (let i = 0; i < A.length - 1; i++) { const [n0, o0] = A[i], [n1, o1] = A[i + 1]; if (T <= n1) return o0 + (o1 - o0) * (T - n0) / (n1 - n0); }
    return A[A.length - 1][1];
  }

  // the playback contract shared by every Aomi film and the kit's render.mjs
  function film({ duration, seek, stage, cues }) {
    stage = stage || document.querySelector('.aomi-stage') || document.getElementById('stage');
    const sub = el('<div class="aomi-sub"></div>'); stage.appendChild(sub);
    const tl = TL(), dur = tl && tl.dur ? tl.dur : duration, allCues = cues || (tl && tl.cues) || [];
    const warp = tl && tl.anchors ? oldTime : (T => T);
    async function seekFilm(T) {
      await seek(warp(T), T);
      const c = allCues.find(q => T >= q.s && T < q.e);
      sub.textContent = c ? c.text : ''; sub.style.opacity = c ? Math.min(seg(T, c.s, c.s + .1), 1 - seg(T, c.e - .1, c.e)) : 0;
    }
    const params = new URLSearchParams(location.search);
    let playing = false;
    window.__AOMI_VIDEO__ = { duration: dur, seek: seekFilm,
      play() { playing = true; const t0 = performance.now(); const loop = async () => { if (!playing) return; await seekFilm(((performance.now() - t0) / 1000) % dur); requestAnimationFrame(loop); }; loop(); },
      pause() { playing = false; } };
    (async () => {
      await document.fonts.ready;
      await seekFilm(+(params.get('t') || 0));
      window.__AOMI_VIDEO_READY__ = true;
      if (!params.has('render') && !params.has('t')) {
        document.body.classList.add('fit');
        const fit = () => { stage.style.transform = `scale(${Math.min(innerWidth / 1920, innerHeight / 1080)})`; };
        fit(); addEventListener('resize', fit); window.__AOMI_VIDEO__.play();
      }
    })();
    return window.__AOMI_VIDEO__;
  }

  window.AOMI_KIT = { mark, MARK_PATHS, title, outro, chapter, film, oldTime, ease: { cl, seg, lerp, eio, eout, eback, win } };
})();
