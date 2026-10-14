// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// MENU MOBILE
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ============================================
// SCROLL SUAVE
// ============================================
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

// ============================================
// ANIMAÇÃO DE ENTRADA (FADE IN)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar fade-in nos elementos
document.querySelectorAll('.project-card, .skill-category, .info-card, .sobre-text, .contact-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ============================================
// EFEITO DE DIGITAÇÃO NO HERO
// ============================================
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.innerHTML;
    heroSubtitle.innerHTML = '';
    let i = 0;
    
    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }
    
    // Iniciar após um pequeno delay
    setTimeout(typeWriter, 500);
}

// ============================================
// PARALLAX NOS BLOBS
// ============================================
document.addEventListener('mousemove', (e) => {
    const blobs = document.querySelectorAll('.bg-blob');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.5;
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// ============================================
// LOG NO CONSOLE
// ============================================
console.log('%c⚡ Júlio Pinheiro | Desenvolvedor Delphi & PHP', 
    'background: linear-gradient(135deg, #22d3ee, #3b82f6); color: white; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: bold;');
console.log('%c💼 LinkedIn: linkedin.com/in/julio-pinheiro-5a521a137', 
    'color: #22d3ee; font-size: 12px;');
console.log('%c📧 Contato: juliocesar_crf_@hotmail.com', 
    'color: #22d3ee; font-size: 12px;');