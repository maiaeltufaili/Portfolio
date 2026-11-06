document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 2. Interactive Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // 3. Modal Popup System
    const modalOverlay = document.getElementById('modal-overlay');
    const modalBtns = document.querySelectorAll('.btn-modal');
    const closeBtns = document.querySelectorAll('.modal-close');

    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);

            if (targetModal) {
                modalOverlay.classList.add('active');
                document.querySelectorAll('.modal-content').forEach(m => m.classList.remove('active'));
                targetModal.classList.add('active');
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

    // 4. Floating Particles Canvas Animation
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = [];
    const particleCount = 45;

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.5 + 0.2;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(244, 114, 182, ${this.opacity})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#f472b6';
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
    // Copy Email to Clipboard
    const copyBtn = document.getElementById('copy-email-btn');
    const emailInput = document.getElementById('email-input');

    if (copyBtn && emailInput) {
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(emailInput.value);
        copyBtn.textContent = 'Copied! ✨';
        setTimeout(() => {
            copyBtn.textContent = 'Copy 📋';
        }, 2000);
    });
}
// Contact Form Submission Handling
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const formSubmitBtn = document.getElementById('form-submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        formSubmitBtn.textContent = 'Sending... ⏳';
        formSubmitBtn.disabled = true;

        const data = new FormData(contactForm);
        
        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                formStatus.style.display = 'block';
                formStatus.style.color = '#f472b6';
                formStatus.textContent = 'Thank you! Your message has been sent. 🌸';
                contactForm.reset();
                formSubmitBtn.textContent = 'Sent! ✨';
            } else {
                throw new Error('Form response was not ok');
            }
        } catch (error) {
            formStatus.style.display = 'block';
            formStatus.style.color = '#ef4444';
            formStatus.textContent = 'Oops! There was a problem sending your message.';
            formSubmitBtn.textContent = 'Send Message ✨';
            formSubmitBtn.disabled = false;
        }
    });
}
});