(() => {
  const root = document.documentElement;
  const bar = document.querySelector('.progress');
  let q = false;
  const upd = () => { q = false; const m = root.scrollHeight - innerHeight; bar.style.transform = 'scaleX(' + (m > 0 ? Math.min(1, scrollY / m) : 0) + ')'; };
  addEventListener('scroll', () => { if (!q) { q = true; requestAnimationFrame(upd); } }, { passive: true }); upd();
  const secs = [...document.querySelectorAll('.p-section')];
  const links = [...document.querySelectorAll('.toc a')];
  if ('IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); reveal.unobserve(e.target); } }), { threshold: .08 });
    secs.forEach(s => reveal.observe(s));
    const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + e.target.id)); }), { rootMargin: '-25% 0px -65% 0px' });
    secs.forEach(s => spy.observe(s));
  } else { secs.forEach(s => s.classList.add('in')); }
  document.getElementById('print').addEventListener('click', () => { secs.forEach(s => s.classList.add('in')); print(); });
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('trippy-trail:theme:v1', next); } catch (e) { /* storage unavailable */ }
  });
})();
