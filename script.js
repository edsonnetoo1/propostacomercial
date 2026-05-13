// Build 10 video cells
const chart2 = document.getElementById('chart2');
for (let i = 1; i <= 10; i++) {
  const cell = document.createElement('div');
  cell.className = 'video-cell';
  cell.innerHTML = `<span>${String(i).padStart(2, '0')}</span><span class="play"></span>`;
  chart2.appendChild(cell);
}

// Observer-driven animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;

    if (id === 'service-1') {
      const bars = entry.target.querySelectorAll('.bar');
      const labels = entry.target.querySelectorAll('.bar-label');
      const siteLine = entry.target.querySelector('.site-line');
      const siteTag  = entry.target.querySelector('.site-tag');

      bars.forEach((bar, i) => {
        setTimeout(() => { bar.style.height = '100%'; }, 200 + i * 230);
      });
      labels.forEach((lbl, i) => {
        setTimeout(() => lbl.classList.add('show'), 600 + i * 230);
      });
      setTimeout(() => {
        siteLine.classList.add('show');
        siteTag.classList.add('show');
      }, 1200);
    }

    if (id === 'service-2') {
      const cells = entry.target.querySelectorAll('.video-cell');
      cells.forEach((cell, i) => {
        setTimeout(() => {
          cell.classList.add('show');
          setTimeout(() => cell.classList.add('fill'), 220);
        }, 100 + i * 90);
      });
    }

    if (id === 'total-section') {
      const totalEl = document.getElementById('total');
      const target = 3000;
      const duration = 1800;
      const start = performance.now();
      function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 4);
        const cur = Math.floor(eased * target);
        totalEl.textContent = '$' + cur.toLocaleString('pt-BR').replace(/,/g, '.');
        if (t < 1) requestAnimationFrame(tick);
        else totalEl.textContent = '$3.000';
      }
      requestAnimationFrame(tick);
    }

    observer.unobserve(entry.target);
  });
}, { threshold: 0.22 });

document.querySelectorAll('#service-1, #service-2, #total-section').forEach(el => observer.observe(el));
