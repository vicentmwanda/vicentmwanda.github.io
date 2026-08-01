document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target); // Stop observing once it has appeared
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Parallax effect for background shapes
    document.addEventListener('mousemove', (e) => {
        const shape1 = document.querySelector('.shape-1');
        const shape2 = document.querySelector('.shape-2');
        
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        if (shape1) {
            shape1.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        }
        if (shape2) {
            shape2.style.transform = `translate(-${x * 50}px, -${y * 50}px)`;
        }
    });
});
