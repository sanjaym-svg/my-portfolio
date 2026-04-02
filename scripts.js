/* ============================================
   SANJAY M — Premium Portfolio
   Animations & Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ========== CURSOR GLOW ==========
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && window.innerWidth > 1024) {
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  } else if (cursorGlow) {
    cursorGlow.style.display = 'none';
  }

  // ========== LOADING SCREEN ==========
  const loader = document.getElementById('loader');
  const loaderName = document.getElementById('loaderName');
  const loaderTagline = document.getElementById('loaderTagline');
  const loaderProgress = document.getElementById('loaderProgress');
  const loaderBar = document.getElementById('loaderBar');
  const nameSpans = loaderName ? loaderName.querySelectorAll('span') : [];

  function playLoadingAnimation() {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(loader, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => {
            loader.style.display = 'none';
            document.body.classList.remove('loading');
            initScrollAnimations();
            animateHero();
          }
        });
      }
    });

    // Show progress bar
    tl.to(loaderProgress, { opacity: 1, duration: 0.4, ease: 'power2.out' }, 0);

    // Animate progress bar
    tl.to(loaderBar, {
      width: '100%',
      duration: 2.2,
      ease: 'power2.inOut'
    }, 0);

    // Animate each letter
    tl.to(nameSpans, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.7,
      stagger: 0.08,
      ease: 'back.out(1.4)'
    }, 0.3);

    // Gradient text on name
    tl.to(loaderName, {
      backgroundImage: 'linear-gradient(135deg, #00D4FF, #7B2FFF)',
      webkitBackgroundClip: 'text',
      webkitTextFillColor: 'transparent',
      duration: 0.6,
      ease: 'power2.inOut'
    }, 1.5);

    // Show tagline
    tl.to(loaderTagline, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out'
    }, 1.8);

    return tl;
  }

  // Wait for GSAP to load, then play
  function waitForGSAP() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      playLoadingAnimation();
    } else {
      setTimeout(waitForGSAP, 100);
    }
  }
  waitForGSAP();

  // ========== HERO ANIMATION ==========
  function animateHero() {
    const heroElements = document.querySelectorAll('.hero .reveal');
    gsap.fromTo(heroElements,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out'
      }
    );

    // Counter animation
    document.querySelectorAll('.counter').forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      gsap.to({ val: 0 }, {
        val: target,
        duration: 2.5,
        delay: 0.5,
        ease: 'power2.out',
        onUpdate: function () {
          counter.textContent = Math.floor(this.targets()[0].val) + '+';
        }
      });
    });
  }

  // ========== SCROLL ANIMATIONS ==========
  function initScrollAnimations() {
    // Reveal from bottom
    gsap.utils.toArray('.reveal').forEach(el => {
      // Skip hero reveals (handled separately)
      if (el.closest('.hero')) return;

      gsap.fromTo(el,
        { opacity: 0, y: 24 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            end: 'top 65%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out'
        }
      );
    });

    // Reveal from left
    gsap.utils.toArray('.reveal-left').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: -30 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out'
        }
      );
    });

    // Reveal from right
    gsap.utils.toArray('.reveal-right').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, x: 30 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power2.out'
        }
      );
    });

    // Stagger service cards
    gsap.utils.toArray('.services-grid').forEach(grid => {
      const cards = grid.querySelectorAll('.service-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 24 },
        {
          scrollTrigger: {
            trigger: grid,
            start: 'top 82%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power2.out'
        }
      );
    });

    // Stagger project cards
    gsap.utils.toArray('.projects-grid').forEach(grid => {
      const cards = grid.querySelectorAll('.project-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 24 },
        {
          scrollTrigger: {
            trigger: grid,
            start: 'top 82%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out'
        }
      );
    });

    // Stagger skill tags
    gsap.utils.toArray('.skill-group').forEach(group => {
      const tags = group.querySelectorAll('.skill-tag');
      gsap.fromTo(tags,
        { opacity: 0, y: 16, scale: 0.92 },
        {
          scrollTrigger: {
            trigger: group,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.2)'
        }
      );
    });

    // Stagger why-cards
    gsap.utils.toArray('.why-me-grid').forEach(grid => {
      const cards = grid.querySelectorAll('.why-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 24 },
        {
          scrollTrigger: {
            trigger: grid,
            start: 'top 82%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out'
        }
      );
    });

    // Who-help items — integrated directly (no setTimeout hack)
    gsap.utils.toArray('.who-help-list').forEach(list => {
      const items = list.querySelectorAll('.who-help-item');
      gsap.fromTo(items,
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: list,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out'
        }
      );
    });

    // Trust cards stagger
    gsap.utils.toArray('.trust-grid').forEach(grid => {
      const cards = grid.querySelectorAll('.trust-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 20 },
        {
          scrollTrigger: {
            trigger: grid,
            start: 'top 82%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    });

    // Feedback cards stagger
    gsap.utils.toArray('.feedback').forEach(section => {
      const reveals = section.querySelectorAll('.reveal');
      gsap.fromTo(reveals,
        { opacity: 0, y: 24 },
        {
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power2.out'
        }
      );
    });

    // Parallax on hero orbs
    gsap.to('.hero-orb-1', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      },
      y: -150,
      ease: 'none'
    });

    gsap.to('.hero-orb-2', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      },
      y: -100,
      ease: 'none'
    });

    // Section dividers fade in
    gsap.utils.toArray('.section-divider').forEach(div => {
      gsap.fromTo(div, { scaleX: 0 }, {
        scrollTrigger: {
          trigger: div,
          start: 'top 92%',
          toggleActions: 'play none none none'
        },
        scaleX: 1,
        duration: 1.4,
        ease: 'power2.out'
      });
    });
  }

  // ========== NAVBAR ==========
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  // Scroll detection for navbar
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-links a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // ========== SMOOTH SCROLL ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========== MAGNETIC EFFECT ON BUTTONS ==========
  if (window.innerWidth > 1024) {
    document.querySelectorAll('.btn, .contact-btn, .social-link').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, {
          x: x * 0.15,
          y: y * 0.15,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });
  }

  // ========== TILT EFFECT ON CARDS ==========
  if (window.innerWidth > 1024) {
    document.querySelectorAll('.service-card, .project-card, .why-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateX = (y - 0.5) * -6;
        const rotateY = (x - 0.5) * 6;

        gsap.to(card, {
          rotateX: rotateX,
          rotateY: rotateY,
          y: -8,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 1000
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          duration: 0.6,
          ease: 'power2.out'
        });
      });
    });
  }

  // ========== SKILL TAG INITIAL STATE ==========
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(16px) scale(0.92)';
  });

  // ========== WHO HELP ITEMS INITIAL STATE ==========
  document.querySelectorAll('.who-help-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
  });

  // ========== FEEDBACK SYSTEM ==========
  const feedbackForm = document.getElementById('feedbackForm');
  const feedbackDisplay = document.getElementById('feedbackDisplay');
  const starRating = document.getElementById('starRating');
  let selectedRating = 0;

  // Star rating interaction
  if (starRating) {
    const stars = starRating.querySelectorAll('.star-btn');
    stars.forEach(star => {
      star.addEventListener('mouseenter', () => {
        const val = parseInt(star.dataset.value);
        stars.forEach(s => {
          s.classList.toggle('hovered', parseInt(s.dataset.value) <= val);
        });
      });

      star.addEventListener('mouseleave', () => {
        stars.forEach(s => s.classList.remove('hovered'));
      });

      star.addEventListener('click', () => {
        selectedRating = parseInt(star.dataset.value);
        stars.forEach(s => {
          s.classList.toggle('selected', parseInt(s.dataset.value) <= selectedRating);
        });
      });
    });
  }

  // Load and render feedback
  function loadFeedback() {
    const feedbacks = JSON.parse(localStorage.getItem('portfolio_feedbacks') || '[]');
    if (!feedbackDisplay) return;

    if (feedbacks.length === 0) {
      feedbackDisplay.innerHTML = '<p class="no-feedback">No feedback yet. Be the first to share your thoughts!</p>';
      return;
    }

    feedbackDisplay.innerHTML = feedbacks.map(fb => `
      <div class="feedback-card">
        <div class="feedback-card-header">
          <div class="feedback-avatar">${fb.name.charAt(0).toUpperCase()}</div>
          <div>
            <h4>${escapeHTML(fb.name)}</h4>
            <div class="feedback-stars">${'★'.repeat(fb.rating)}${'☆'.repeat(5 - fb.rating)}</div>
          </div>
        </div>
        <p>${escapeHTML(fb.message)}</p>
        <span class="feedback-date">${new Date(fb.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
      </div>
    `).join('');
  }

  function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Submit feedback
  if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('feedbackName').value.trim();
      const message = document.getElementById('feedbackMessage').value.trim();

      if (!name || !message || selectedRating === 0) {
        showToast('Please fill in all fields and select a rating.', 'error');
        return;
      }

      const feedbacks = JSON.parse(localStorage.getItem('portfolio_feedbacks') || '[]');
      feedbacks.unshift({
        name,
        message,
        rating: selectedRating,
        date: new Date().toISOString()
      });
      localStorage.setItem('portfolio_feedbacks', JSON.stringify(feedbacks));

      feedbackForm.reset();
      selectedRating = 0;
      if (starRating) {
        starRating.querySelectorAll('.star-btn').forEach(s => s.classList.remove('selected'));
      }

      loadFeedback();
      showToast('Thank you for your feedback! 🎉', 'success');

      // Animate new card in
      const firstCard = feedbackDisplay.querySelector('.feedback-card');
      if (firstCard) {
        gsap.fromTo(firstCard,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' }
        );
      }
    });
  }

  // Toast notification
  function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    gsap.fromTo(toast,
      { opacity: 0, y: 30, x: '-50%' },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );

    setTimeout(() => {
      gsap.to(toast, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => toast.remove()
      });
    }, 3000);
  }

  // Load feedback on page load
  loadFeedback();
});
