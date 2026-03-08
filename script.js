/* ============================================
   PORTFOLIO — Script (Mint & Gold Theme)
   ============================================ */

// ─── Particle Network Background ─────────
(function initParticles() {
    const canvas = document.getElementById('matrix-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const PARTICLE_COUNT = 80;
    const CONNECTION_DIST = 150;
    const MOUSE_DIST = 200;

    let mouse = { x: -999, y: -999 };
    document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 2 + 0.5;
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(100, 210, 163, 0.5)';
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECTION_DIST) {
                    const alpha = (1 - dist / CONNECTION_DIST) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(100, 210, 163, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
            // Mouse connection
            const dx = particles[i].x - mouse.x;
            const dy = particles[i].y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < MOUSE_DIST) {
                const alpha = (1 - dist / MOUSE_DIST) * 0.3;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(212, 160, 106, ${alpha})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        requestAnimationFrame(animate);
    }
    animate();
})();


// ─── Typing Effect ───────────────────────
(function initTyping() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const phrases = [
        'Security Researcher',
        'Bug Bounty Hunter | 470+ Rep',
        'Penetration Tester',
        'Vulnerability Researcher',
        'CTF Organizer & Problem Setter',
        'Earned Monetary Rewards',
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
                pauseTime = 30;
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
            document.querySelectorAll('.nav-cmd').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
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
                const targetAttr = el.getAttribute('data-target');
                if (!targetAttr || isNaN(parseInt(targetAttr, 10))) {
                    observer.unobserve(el);
                    return;
                }
                const target = parseInt(targetAttr, 10);
                const prefix = el.getAttribute('data-prefix') || '';
                const suffix = el.getAttribute('data-suffix') || '';
                let count = 0;
                const duration = 1500;
                const increment = target / (duration / 16);

                function format(n) {
                    return prefix + n.toLocaleString() + suffix;
                }

                function step() {
                    count += increment;
                    if (count < target) {
                        el.textContent = format(Math.floor(count));
                        requestAnimationFrame(step);
                    } else {
                        el.textContent = format(target);
                    }
                }
                requestAnimationFrame(step);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(val => observer.observe(val));
})();