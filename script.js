const nav = document.querySelector('.navbar');
    const setNavHeight = () => document.documentElement.style.setProperty('--nav-h', nav.offsetHeight + 'px');
    window.addEventListener('resize', setNavHeight);
    setNavHeight();

    const hamb = document.getElementById('hamb');
    const navLinks = document.getElementById('navLinks');
    hamb.addEventListener('click', () => navLinks.classList.toggle('open'));
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

    const words = ["Kelas 8D", "Sahabat Berprestasi", "Generasi Hebat"];
    const typingEl = document.getElementById('typing');
    let wi = 0, li = 0, del = false;
    function tick() {
      const word = words[wi];
      li += del ? -1 : 1;
      typingEl.textContent = word.slice(0, li);
      if (!del && li === word.length) { del = true; setTimeout(tick, 1200); return; }
      if (del && li === 0) { del = false; wi = (wi + 1) % words.length; }
      setTimeout(tick, del ? 60 : 120);
    }
    tick();

    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('show'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    const tabs = document.querySelectorAll('.tab');
    const panels = {
      senin: document.getElementById('panel-senin'),
      selasa: document.getElementById('panel-selasa'),
      rabu: document.getElementById('panel-rabu'),
      kamis: document.getElementById('panel-kamis'),
      jumat: document.getElementById('panel-jumat'),
    };
    tabs.forEach(t => t.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      t.classList.add('active');
      const key = t.dataset.day;
      Object.values(panels).forEach(p => { p.classList.remove('active'); p.hidden = true; });
      const panel = panels[key];
      panel.hidden = false;
      void panel.offsetWidth;
      panel.classList.add('active');
    }));