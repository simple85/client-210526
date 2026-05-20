function init() {

  // ─── HEADER SCROLL ───
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ─── MOBILE NAV ───
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('active');
      document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── GSAP + SCROLLTRIGGER ───
  gsap.registerPlugin(ScrollTrigger);
  gsap.ticker.lagSmoothing(0);

  // Hero Animations (only on home page)
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    gsap.to('.hero-badge', { opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power3.out' });
    gsap.to('.hero h1', { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' });
    gsap.to('.hero-text', { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: 'power3.out' });
    gsap.to('.hero-buttons', { opacity: 1, y: 0, duration: 0.6, delay: 1.1, ease: 'power3.out' });
    gsap.to('.hero-stats', { opacity: 1, y: 0, duration: 0.6, delay: 1.3, ease: 'power3.out' });

    // Speedometer: visible at 0 on load, races to 240 on scroll
    const speedometer = document.getElementById('heroSpeedometer');
    if (speedometer) {
      gsap.to('.hero-speedometer', { opacity: 1, duration: 0.8, delay: 0.8, ease: 'power2.out' });

      const needleEl = document.querySelector('.speedo-needle');
      const arcEl = document.querySelector('.speedo-arc-fill');
      const maxScroll = 500;
      needleEl.setAttribute('transform', 'rotate(-90 150 170)');
      window.addEventListener('scroll', () => {
        const progress = Math.min(window.scrollY / maxScroll, 1);
        const rotation = -90 + (180 * progress);
        const dashoffset = 377 - (377 * progress);
        needleEl.setAttribute('transform', 'rotate(' + rotation + ' 150 170)');
        arcEl.style.strokeDashoffset = dashoffset;
      });
    }

    // Floating tools gentle animation
    gsap.to('.float-wrench', {
      y: -15, rotation: 8,
      duration: 4, ease: 'sine.inOut', yoyo: true, repeat: -1
    });
    gsap.to('.float-gear', {
      rotation: 360,
      duration: 40, ease: 'none', repeat: -1
    });
    gsap.to('.float-piston', {
      y: -20, rotation: -5,
      duration: 5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1
    });

    // Counter animation
    document.querySelectorAll('.counter').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      ScrollTrigger.create({
        trigger: counter,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function () {
              counter.textContent = Math.round(this.targets()[0].val);
            }
          });
        }
      });
    });
  }

  // Scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  revealElements.forEach(el => {
    const toVars = { opacity: 1, duration: 0.8, ease: 'power3.out' };
    if (el.classList.contains('reveal-left') || el.classList.contains('reveal-right')) toVars.x = 0;
    else toVars.y = 0;

    gsap.to(el, {
      ...toVars,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });

  // Service cards staggered animation
  const serviceCards = document.querySelectorAll('.service-card');
  if (serviceCards.length > 0) {
    gsap.fromTo(serviceCards,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: serviceCards[0].parentElement,
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // Value cards staggered
  const valueCards = document.querySelectorAll('.value-card');
  if (valueCards.length > 0) {
    gsap.fromTo(valueCards,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: valueCards[0].parentElement,
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // Service detail alternating animations
  document.querySelectorAll('.service-detail').forEach(detail => {
    const img = detail.querySelector('.service-detail-img');
    const content = detail.querySelector('.service-detail-content');
    if (img && content) {
      const isReverse = detail.classList.contains('reverse');
      gsap.fromTo(img,
        { x: isReverse ? 60 : -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: detail, start: 'top 80%', once: true }
        }
      );
      gsap.fromTo(content,
        { x: isReverse ? -60 : 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, delay: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: detail, start: 'top 80%', once: true }
        }
      );
    }
  });

  // Gallery stagger
  const galleryItems = document.querySelectorAll('.about-gallery-item');
  if (galleryItems.length > 0) {
    gsap.fromTo(galleryItems,
      { scale: 0.9, opacity: 0 },
      {
        scale: 1, opacity: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: galleryItems[0].parentElement,
          start: 'top 80%',
          once: true
        }
      }
    );
  }

  // ─── CONTACT FORM ───
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#name');
      const phone = contactForm.querySelector('#phone');
      const message = contactForm.querySelector('#message');

      let valid = true;
      [name, phone, message].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#e53935';
          valid = false;
        } else {
          field.style.borderColor = '';
        }
      });

      if (!valid) return;

      contactForm.style.display = 'none';
      formSuccess.classList.add('show');
    });

    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
      });
    });
  }

  // ─── COOKIE BANNER ───
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieModal = document.getElementById('cookieModal');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieDecline = document.getElementById('cookieDecline');
  const cookieOptionsBtn = document.getElementById('cookieOptionsBtn');
  const cookieModalOverlay = document.getElementById('cookieModalOverlay');
  const cookieModalSave = document.getElementById('cookieModalSave');
  const cookieModalDecline = document.getElementById('cookieModalDecline');

  function getCookieConsent() {
    try { return localStorage.getItem('cookie_consent'); } catch { return null; }
  }

  function setCookieConsent(value) {
    try { localStorage.setItem('cookie_consent', value); } catch {}
  }

  function hideBanner() {
    if (cookieBanner) cookieBanner.classList.remove('show');
  }

  function hideModal() {
    if (cookieModal) cookieModal.classList.remove('show');
  }

  if (!getCookieConsent() && cookieBanner) {
    setTimeout(() => cookieBanner.classList.add('show'), 1500);
  }

  if (cookieAccept) {
    cookieAccept.addEventListener('click', () => {
      setCookieConsent('all');
      hideBanner();
    });
  }

  if (cookieDecline) {
    cookieDecline.addEventListener('click', () => {
      setCookieConsent('necessary');
      hideBanner();
    });
  }

  if (cookieOptionsBtn) {
    cookieOptionsBtn.addEventListener('click', () => {
      hideBanner();
      if (cookieModal) cookieModal.classList.add('show');
    });
  }

  if (cookieModalOverlay) {
    cookieModalOverlay.addEventListener('click', hideModal);
  }

  if (cookieModalSave) {
    cookieModalSave.addEventListener('click', () => {
      const analytics = document.getElementById('cookieAnalytics');
      const marketing = document.getElementById('cookieMarketing');
      const consent = {
        necessary: true,
        analytics: analytics ? analytics.checked : false,
        marketing: marketing ? marketing.checked : false
      };
      setCookieConsent(JSON.stringify(consent));
      hideModal();
    });
  }

  if (cookieModalDecline) {
    cookieModalDecline.addEventListener('click', () => {
      setCookieConsent('necessary');
      hideModal();
    });
  }

}

let _initialized = false;
function safeInit() { if (!_initialized) { _initialized = true; init(); } }
document.addEventListener('DOMContentLoaded', safeInit);
if (document.readyState !== 'loading') safeInit();
