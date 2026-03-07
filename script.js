/* ============================================
   HACKER TERMINAL PORTFOLIO — Script
   ============================================ */

// ─── Matrix Rain ─────────────────────────
(function initMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF{}[]<>/\\|';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops = new Array(columns).fill(1);

    window.addEventListener('resize', () => {
        columns = Math.floor(canvas.width / fontSize);
        drops = new Array(columns).fill(1);
    });

    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);
})();


// ─── Typing Effect ───────────────────────
(function initTyping() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const phrases = [
        'Cybersecurity Enthusiast',
        'Bug Bounty Hunter',
        'Vulnerability Researcher',
        'Penetration Tester',
        'Security Analyst',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let pauseTime = 0;

    function type() {
        const current = phrases[phraseIndex];

        if (pauseTime > 0) {
            pauseTime--;
            requestAnimationFrame(() => setTimeout(type, 60));
            return;
        }

        if (!deleting) {
            el.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                pauseTime = 30; // pause at end
                deleting = true;
            }
        } else {
            el.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
            }
        }

        const speed = deleting ? 35 : 70;
        requestAnimationFrame(() => setTimeout(type, speed));
    }

    setTimeout(type, 800);
})();


// ─── Smooth Scroll for Nav ───────────────
document.querySelectorAll('.nav-cmd').forEach(link => {
    link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }

            // update active state
            document.querySelectorAll('.nav-cmd').forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // close mobile menu
            document.querySelector('.nav-links')?.classList.remove('open');
        }
    });
});


// ─── Mobile Menu Toggle ──────────────────
const mobileToggle = document.getElementById('mobile-toggle');
if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        document.querySelector('.nav-links')?.classList.toggle('open');
    });
}


// ─── Active Nav on Scroll ────────────────
(function initScrollSpy() {
    const sections = document.querySelectorAll('.section, .hero-section');
    const navCmds = document.querySelectorAll('.nav-cmd');

    function update() {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });

        navCmds.forEach(cmd => {
            cmd.classList.remove('active');
            if (cmd.getAttribute('href') === '#' + current) {
                cmd.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', update, { passive: true });
})();


// ─── Scroll Reveal (IntersectionObserver) ─
(function initReveal() {
    const revealSections = document.querySelectorAll('.reveal-section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealSections.forEach(section => observer.observe(section));
})();


// ─── Skill Bars Animation ────────────────
(function initSkillBars() {
    const bars = document.querySelectorAll('.skill-bar-fill');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const pct = bar.getAttribute('data-percent');
                bar.style.width = pct + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });

    bars.forEach(bar => observer.observe(bar));
})();


// ─── Stats Counter Animation ─────────────
(function initCounters() {
    const statValues = document.querySelectorAll('.stat-value');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'), 10);
                let count = 0;
                const duration = 1500;
                const increment = target / (duration / 16);

                function step() {
                    count += increment;
                    if (count < target) {
                        el.textContent = Math.floor(count);
                        requestAnimationFrame(step);
                    } else {
                        el.textContent = target;
                    }
                }
                requestAnimationFrame(step);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(val => observer.observe(val));
})();