document.addEventListener('DOMContentLoaded', () => {

    // ─────────────────────────────────────────────
    // 1. Sticky header — add border on scroll
    // ─────────────────────────────────────────────
    const header = document.getElementById('site-header');

    const onScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run once on load


    // ─────────────────────────────────────────────
    // 2. Theme toggle (dark / light)
    // ─────────────────────────────────────────────
    const root     = document.documentElement;
    const btnDark  = document.getElementById('btnDark');
    const btnLight = document.getElementById('btnLight');

    const applyTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('vm-theme', theme);

        if (theme === 'light') {
            btnLight.classList.add('active');
            btnDark.classList.remove('active');
        } else {
            btnDark.classList.add('active');
            btnLight.classList.remove('active');
        }
    };

    // Load saved theme or system preference
    const savedTheme = localStorage.getItem('vm-theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    btnDark.addEventListener('click',  () => applyTheme('dark'));
    btnLight.addEventListener('click', () => applyTheme('light'));


    // ─────────────────────────────────────────────
    // 3. Scroll-based fade-in animation
    // ─────────────────────────────────────────────
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));


    // ─────────────────────────────────────────────
    // 4. Active nav link on scroll
    // ─────────────────────────────────────────────
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-links a');

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
    // 5. Image Modal (Lightbox)
    // ─────────────────────────────────────────────
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.modal-close');
    const projectImages = document.querySelectorAll('.row-image-container img');

    if (modal && modalImg && closeBtn) {
        projectImages.forEach(img => {
            img.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation(); // Prevent opening the project link
                modal.classList.add('show');
                modalImg.src = img.src;
            });
        });

        // Close on X click
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    // ─────────────────────────────────────────────
    // 6. Email Reveal (bot-resistant)
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

});
