document.addEventListener('DOMContentLoaded', () => {

    // ─────────────────────────────────────────────
    // 1. Sticky header — add glass on scroll
    // ─────────────────────────────────────────────
    const header = document.getElementById('site-header');

    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();


    // ─────────────────────────────────────────────
    // 2. Theme management (light/dark)
    // ─────────────────────────────────────────────
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    const updateThemeIcon = (theme) => {
        if (!themeIcon) return;
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun';
        } else {
            themeIcon.className = 'fa-solid fa-moon';
        }
    };

    const applyTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('vm-theme', theme);
        updateThemeIcon(theme);
    };

    const savedTheme = localStorage.getItem('vm-theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = root.getAttribute('data-theme') || 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    }


    // ─────────────────────────────────────────────
    // 3. Mobile hamburger menu
    // ─────────────────────────────────────────────
    const hamburger   = document.getElementById('hamburger');
    const mobileMenu  = document.getElementById('mobileMenu');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
        });

        // Close on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileMenu.classList.remove('open');
            });
        });
    }


    // ─────────────────────────────────────────────
    // 4. Scroll-based fade-in animation
    // ─────────────────────────────────────────────
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


    // ─────────────────────────────────────────────
    // 5. Active nav link highlighting on scroll
    // ─────────────────────────────────────────────
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove('active'));
                const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
                if (active) active.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(section => sectionObserver.observe(section));


    // ─────────────────────────────────────────────
    // 6. Image Modal (Lightbox)
    // ─────────────────────────────────────────────
    const modal       = document.getElementById('image-modal');
    const modalImg    = document.getElementById('modal-image');
    const closeBtn    = document.querySelector('.modal-close');
    const projectImgs = document.querySelectorAll('.row-image-container img');

    if (modal && modalImg && closeBtn) {
        projectImgs.forEach(img => {
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                modal.classList.add('show');
                modalImg.src = img.src;
                modal.setAttribute('aria-hidden', 'false');
            });
        });

        const closeModal = () => {
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden', 'true');
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
        });
    }


    // ─────────────────────────────────────────────
    // 7. Email Reveal (bot-resistant)
    // ─────────────────────────────────────────────
    const revealBtn = document.getElementById('revealEmailBtn');
    const emailEl   = document.getElementById('contactEmail');

    if (revealBtn && emailEl) {
        revealBtn.addEventListener('click', () => {
            const u = emailEl.dataset.u;
            const d = emailEl.dataset.d;
            const t = emailEl.dataset.t;
            const c = emailEl.dataset.c;
            const email = `${u}@${d}.${t}.${c}`;
            emailEl.innerHTML = `<a href="mailto:${email}">${email}</a>`;
            revealBtn.style.display = 'none';
        });
    }


    // ─────────────────────────────────────────────
    // 8. Smooth active section highlight for
    //    mobile menu links too
    // ─────────────────────────────────────────────
    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (hamburger && mobileMenu &&
            !header.contains(e.target)) {
            hamburger.classList.remove('open');
            mobileMenu.classList.remove('open');
        }
    });

});
