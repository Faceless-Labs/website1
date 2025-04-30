document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    let width, height;
    const stars = [];
    const lines = [];
    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
  
    function initCanvas() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars.length = 0;
      lines.length = 0;
  
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random()
        });
      }
  
      for (let i = 0; i < 30; i++) {
        lines.push({
          x: Math.random() * width,
          y: Math.random() * height,
          length: Math.random() * 100 + 50,
          angle: Math.random() * Math.PI * 2
        });
      }
    }
  
    function animate() {
      ctx.clearRect(0, 0, width, height);
      const offsetY = scrollY * 0.2;
      const parallaxX = (mouseX - width / 2) * 0.02;
      const parallaxY = (mouseY - height / 2) * 0.02;
  
      stars.forEach(s => {
        ctx.beginPath();
        ctx.globalAlpha = s.alpha;
  
        let posX = (s.x + parallaxX) % width;
        let posY = (s.y + offsetY + parallaxY) % height;
  
        if (posX < 0) posX += width;
        if (posY < 0) posY += height;
  
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowBlur = 4;
        ctx.shadowColor = '#ffffff';
        ctx.arc(posX, posY, s.size * 1.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset
        
      });
  
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = '#8e2de2';
  
      lines.forEach(l => {
        const dx = Math.cos(l.angle) * l.length;
        const dy = Math.sin(l.angle) * l.length;
        ctx.beginPath();
  
        let posX = (l.x + parallaxX) % width;
        let posY = (l.y + offsetY + parallaxY) % height;
  
        if (posX < 0) posX += width;
        if (posY < 0) posY += height;
  
        ctx.moveTo(posX, posY);
        ctx.lineTo(posX + dx, posY + dy);
        ctx.stroke();
      });
  
      requestAnimationFrame(animate);
    }
  
    function handleScroll() {
      scrollY = window.scrollY;
    }
  
    function handleMouseMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }
  
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', initCanvas);
  
    initCanvas();
    animate();
  
    // Fade-in Sections
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
  
    sections.forEach(section => observer.observe(section));
  });
  