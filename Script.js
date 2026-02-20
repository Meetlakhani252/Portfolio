 const toggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  toggle.addEventListener('click', () => {
    const t = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  });

  // MOBILE MENU
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  function closeMobile() { mobileMenu.classList.remove('open'); }

  // BACK TO TOP
  const backTop = document.getElementById('backTop');
  window.addEventListener('scroll', () => {
    backTop.classList.toggle('show', window.scrollY > 500);
  });

  // FADE IN
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // SKILL FILTER
  document.querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-cat]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      document.querySelectorAll('.skill-card').forEach(card => {
        card.classList.toggle('hidden', cat !== 'all' && card.dataset.cat !== cat);
      });
    });
  });

  // PROJECT FILTER
  document.querySelectorAll('[data-proj]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-proj]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tag = btn.dataset.proj;
      document.querySelectorAll('.proj-card').forEach(card => {
        const tags = card.dataset.tags || '';
        card.classList.toggle('hidden', tag !== 'all' && !tags.includes(tag));
      });
    });
  });

  // FORM
  function handleFormSubmit() {
    const msg = document.getElementById('formMsg');
    msg.style.display = 'block';
    msg.classList.add('success');
    setTimeout(() => { msg.style.display = 'none'; }, 4000);
  }

  // RESUME DOWNLOAD PLACEHOLDER
  function downloadResume() {
    alert('📄 Resume download coming soon! Connect with me on LinkedIn for now.');
  }

  // ANIMATE SKILL BARS ON VISIBLE
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const bar = e.target.querySelector('.skill-fill');
        if (bar) { const w = bar.style.width; bar.style.width = '0'; setTimeout(() => bar.style.width = w, 100); }
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.skill-card').forEach(c => barObs.observe(c));