// PARALLAX NAS ORBES
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.gradient-orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 15;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// FALLBACK PARA IFRAMES QUE NAO CARREGAM
document.querySelectorAll('iframe').forEach(iframe => {
    iframe.addEventListener('error', function() {
        const card = this.closest('.card-image');
        if (card) {
            const placeholder = document.createElement('div');
            placeholder.style.width = '100%';
            placeholder.style.height = '100%';
            placeholder.style.background = '#0a0a0a';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.style.color = 'rgba(255,255,255,0.5)';
            placeholder.style.fontSize = '14px';
            placeholder.style.letterSpacing = '2px';
            placeholder.style.textTransform = 'uppercase';
            placeholder.textContent = this.title || 'Site Preview';
            this.parentNode.replaceChild(placeholder, this);
        }
    });
});

// OBSERVER PARA REVELAR ELEMENTOS
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '50px' });

document.querySelectorAll('.portfolio-card, .scope-item, .ads-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ANIMAÇÃO SUAVE PARA O PREÇO MENSAL
const monthlyPrice = document.querySelector('.price-number.monthly');
if (monthlyPrice) {
    setInterval(() => {
        monthlyPrice.style.animation = 'none';
        monthlyPrice.offsetHeight;
        monthlyPrice.style.animation = 'pulse 3s ease-in-out infinite';
    }, 6000);
