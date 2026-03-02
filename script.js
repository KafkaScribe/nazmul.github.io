document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    navLinks.forEach(navLink => navLink.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });
    });

    const sectionContainers = document.querySelectorAll('.section-container');
    
    const sectionObserverOptions = {
        root: null,
        rootMargin: '-50px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('section-animate');
                    
                    const children = entry.target.querySelectorAll('.skill-card, .contact-card');
                    children.forEach((child, i) => {
                        setTimeout(() => {
                            child.classList.add('element-animate');
                        }, i * 150);
                    });
                }, index * 100);
                
                sectionObserver.unobserve(entry.target);
            }
        });
    }, sectionObserverOptions);

    sectionContainers.forEach(section => {
        sectionObserver.observe(section);
    });
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            heroSection.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
            
            const profileCard = document.querySelector('.profile-card');
            if (profileCard) {
                profileCard.style.transform = `translateY(${scrollPosition * 0.1}px) scale(${1 - scrollPosition * 0.0005})`;
                profileCard.style.boxShadow = `0 ${5 + scrollPosition * 0.05}px ${10 + scrollPosition * 0.1}px rgba(0, 0, 0, 0.2)`;
            }
        });
        
        const nameTitle = document.querySelector('.name-title');
        if (nameTitle) {
            nameTitle.innerHTML = nameTitle.textContent.split('').map(
                letter => `<span class="animated-letter">${letter}</span>`
            ).join('');
            
            document.querySelectorAll('.animated-letter').forEach((letter, i) => {
                letter.style.animationDelay = `${i * 0.1}s`;
            });
        }
    }

    const skillObserverOptions = {
        threshold: 0.5
    };

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, skillObserverOptions);

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        skillObserver.observe(skillsSection);
    }

    const allSections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });
    
    enhanceHomepage();
});

const enhanceHomepage = () => {
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.classList.add('bounce-in');
        
        icon.addEventListener('mouseenter', () => {
            icon.classList.add('pulse');
        });
        
        icon.addEventListener('mouseleave', () => {
            setTimeout(() => {
                icon.classList.remove('pulse');
            }, 300);
        });
    });
    
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.innerHTML = `<span class="title-underline">${title.textContent}</span>`;
    });
    
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('skill-card-hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('skill-card-hover');
        });
    });
    
    document.body.classList.add('enhanced');
};

// Custom cursor
const cursor = document.querySelector('.cursor-follower');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Header scroll effect
const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scrolled');
    }
    if (currentScroll > lastScroll && !header.classList.contains('scrolled')) {
        header.classList.add('scrolled');
    }
    if (currentScroll < lastScroll && header.classList.contains('scrolled')) {
        header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    localStorage.setItem('theme', body.classList.contains('dark-theme') ? 'dark' : 'light');
});

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
}

// Smooth reveal on scroll
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

document.querySelectorAll('.reveal-section').forEach(section => {
    sectionObserver.observe(section);
});

// Stats counter animation
const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    const startCounting = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                counters.forEach(counter => {
                    const target = +counter.innerText;
                    let count = 0;
                    const duration = 2000;
                    const increment = target / (duration / 16);

                    const updateCount = () => {
                        if (count < target) {
                            count += increment;
                            counter.innerText = Math.floor(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            counter.innerText = target;
                        }
                    };

                    updateCount();
                });
                hasAnimated = true;
            }
        });
    };

    const statsObserver = new IntersectionObserver(startCounting, {
        threshold: 0.5,
    });

    statsObserver.observe(statsSection);
}

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-bar');
skillBars.forEach(bar => {
    const percent = bar.getAttribute('data-percent');
    bar.style.width = percent;
});

// Initialize on page load
window.addEventListener('load', () => {
    // Split text animation
    document.querySelectorAll('.split-text').forEach(text => {
        text.style.opacity = '1';
    });
});

// Tilt effect for cards using vanilla-tilt
VanillaTilt.init(document.querySelectorAll(".tilt-effect"), {
    max: 5,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// Profile ring rotation pause on hover
const profileWrapper = document.querySelector('.profile-image-wrapper');
const profileRing = document.querySelector('.profile-ring');

profileWrapper.addEventListener('mouseenter', () => {
    profileRing.style.animationPlayState = 'paused';
});

profileWrapper.addEventListener('mouseleave', () => {
    profileRing.style.animationPlayState = 'running';
});