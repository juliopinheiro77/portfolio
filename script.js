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
        const href = this.getAttribute('href');
        // href="#" sozinho quebrava o querySelector; agora volta ao topo
        const target = href === '#' ? document.body : document.querySelector(href);
        if (target) {
            e.preventDefault();
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
document.querySelectorAll('.project-card, .skill-category, .info-card, .sobre-text, .contact-card, .demo-card, .case-card').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ============================================
// EFEITO DE DIGITAÇÃO NO HERO
// ============================================
const heroSubtitle = document.querySelector('.hero-subtitle');
const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (heroSubtitle && !reduzirMovimento) {
    // Digita só o texto puro e restaura o HTML no final.
    // Antes, o innerHTML era montado letra a letra e as tags <span> apareciam quebradas.
    const html = heroSubtitle.innerHTML;
    const text = heroSubtitle.textContent.replace(/\s+/g, ' ').trim();
    heroSubtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        } else {
            heroSubtitle.innerHTML = html;
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
// DEMO: VALIDADOR DE CHAVE DE ACESSO NF-e
// ============================================
const chaveInput = document.getElementById('chave-nfe');

if (chaveInput) {
    const verdict = document.getElementById('demo-verdict');
    const fields = document.getElementById('demo-fields');

    const UF = {
        '11': 'RO', '12': 'AC', '13': 'AM', '14': 'RR', '15': 'PA', '16': 'AP', '17': 'TO',
        '21': 'MA', '22': 'PI', '23': 'CE', '24': 'RN', '25': 'PB', '26': 'PE', '27': 'AL',
        '28': 'SE', '29': 'BA', '31': 'MG', '32': 'ES', '33': 'RJ', '35': 'SP', '41': 'PR',
        '42': 'SC', '43': 'RS', '50': 'MS', '51': 'MT', '52': 'GO', '53': 'DF'
    };

    // Dígito verificador: módulo 11 com pesos de 2 a 9, da direita para a esquerda
    function calcularDV(chave43) {
        let soma = 0;
        let peso = 2;
        for (let i = chave43.length - 1; i >= 0; i--) {
            soma += Number(chave43[i]) * peso;
            peso = peso === 9 ? 2 : peso + 1;
        }
        const resto = soma % 11;
        return (resto === 0 || resto === 1) ? 0 : 11 - resto;
    }

    const pad = (n, len) => String(n).padStart(len, '0');
    const digitos = (len) => Array.from({ length: len }, () => Math.floor(Math.random() * 10)).join('');
    const formatar = (chave) => chave.replace(/(\d{4})(?=\d)/g, '$1 ');

    function gerarChave() {
        const hoje = new Date();
        const base = '33'                                  // UF: RJ
            + pad(hoje.getFullYear() % 100, 2) + pad(hoje.getMonth() + 1, 2)
            + '11222333000181'                             // CNPJ fictício
            + '55'                                         // modelo NF-e
            + '001'                                        // série
            + pad(Math.floor(Math.random() * 99999) + 1, 9) // número
            + '1'                                          // emissão normal
            + digitos(8);                                  // código numérico
        return base + calcularDV(base);
    }

    function campo(label, valor, extra = '') {
        return `<div class="demo-field ${extra}"><small>${label}</small><code>${valor}</code></div>`;
    }

    function validar() {
        const chave = chaveInput.value.replace(/\D/g, '');

        if (!chave.length) {
            verdict.textContent = '';
            fields.innerHTML = '';
            return;
        }

        if (chave.length !== 44) {
            verdict.className = 'demo-verdict erro';
            verdict.textContent = `A chave tem ${chave.length} dígitos. São 44.`;
            fields.innerHTML = '';
            return;
        }

        const dvCalculado = calcularDV(chave.slice(0, 43));
        const dvInformado = Number(chave[43]);
        const ok = dvCalculado === dvInformado;

        verdict.className = 'demo-verdict ' + (ok ? 'ok' : 'erro');
        verdict.textContent = ok
            ? `✓ Dígito verificador confere (${dvCalculado})`
            : `✕ DV informado ${dvInformado}, esperado ${dvCalculado}. A SEFAZ rejeitaria esta chave.`;

        const uf = chave.slice(0, 2);
        const modelo = chave.slice(20, 22);
        const cnpj = chave.slice(6, 20).replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

        fields.innerHTML =
            campo('UF', uf + (UF[uf] ? ' · ' + UF[uf] : '')) +
            campo('Ano/mês', '20' + chave.slice(2, 4) + '/' + chave.slice(4, 6)) +
            campo('CNPJ emitente', cnpj) +
            campo('Modelo', modelo + (modelo === '55' ? ' · NF-e' : modelo === '65' ? ' · NFC-e' : '')) +
            campo('Série', chave.slice(22, 25)) +
            campo('Número', String(Number(chave.slice(25, 34)))) +
            campo('Tipo de emissão', chave[34] + (chave[34] === '1' ? ' · normal' : ' · contingência')) +
            campo('Código numérico', chave.slice(35, 43)) +
            campo('DV', chave[43], 'dv');
    }

    chaveInput.addEventListener('input', validar);

    document.getElementById('btn-gerar').addEventListener('click', () => {
        chaveInput.value = formatar(gerarChave());
        validar();
    });

    document.getElementById('btn-errar').addEventListener('click', () => {
        let chave = chaveInput.value.replace(/\D/g, '');
        if (chave.length !== 44) chave = gerarChave();
        const pos = 25 + Math.floor(Math.random() * 9);      // mexe no número da nota
        const novo = (Number(chave[pos]) + 1 + Math.floor(Math.random() * 8)) % 10;
        chave = chave.slice(0, pos) + novo + chave.slice(pos + 1);
        chaveInput.value = formatar(chave);
        validar();
    });

    // Abre a demo já preenchida
    chaveInput.value = formatar(gerarChave());
    validar();
}

// ============================================
// LOG NO CONSOLE
// ============================================
console.log('%c⚡ Júlio Pinheiro | Desenvolvedor Delphi & PHP', 
    'background: linear-gradient(135deg, #22d3ee, #3b82f6); color: white; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: bold;');
console.log('%c💼 LinkedIn: linkedin.com/in/julio-pinheiro-5a521a137', 
    'color: #22d3ee; font-size: 12px;');
console.log('%c📧 Contato: juliocesar_crf_@hotmail.com', 
    'color: #22d3ee; font-size: 12px;');
