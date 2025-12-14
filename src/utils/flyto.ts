
export const flyToCart = (productEl: any, buttonRef: any) => {
  const cartEl = document.querySelector('.nav-cart');
  if (!cartEl || !productEl) return;

  const rect = productEl.getBoundingClientRect();
  const cartRect = cartEl.getBoundingClientRect();

  const imgClone = productEl.cloneNode(true);

  imgClone.style.position = 'fixed';
  imgClone.style.left = `${rect.left}px`;
  imgClone.style.top = `${rect.top}px`;
  imgClone.style.width = `${rect.width}px`;
  imgClone.style.height = `${rect.height}px`;
  imgClone.style.zIndex = '10000';
  imgClone.style.pointerEvents = 'none';
  imgClone.style.objectFit = 'cover';

  imgClone.style.transform = 'none';

  document.body.appendChild(imgClone);

  const destX = cartRect.left + cartRect.width / 2 - rect.width / 2;
  const destY = cartRect.top + cartRect.height / 2 - rect.height / 2;

  const flyAnim = imgClone.animate(
    [
      {
        transform: 'translate(0, 0) scale(1)',
        opacity: 1
      },
      {
        transform: `translate(${destX - rect.left}px, ${destY - rect.top}px) scale(0.1)`,
        opacity: 0
      },
    ],
    {
      duration: 500,
      easing: 'ease-in-out',
      fill: 'forwards',
    }
  );

  flyAnim.onfinish = () => {
    if (imgClone.parentNode) {
      imgClone.parentNode.removeChild(imgClone);
    }
  };
  createSparks(buttonRef)
  setTimeout(() => createSparks(cartEl as HTMLElement), 420)
  return flyAnim;
};

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  velocityX: number;
  velocityY: number;
  life: number;
  maxLife: number;
  element: HTMLElement;
}

const createSparks = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const particles: Particle[] = [];
  const particleCount = 15;

  const colors = ['#FFE082', '#FFD54F', '#FFCA28'];

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 4 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    if (!color) return

    particle.style.position = 'fixed';
    particle.style.left = `${centerX}px`;
    particle.style.top = `${centerY}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.borderRadius = '50%';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    particle.style.boxShadow = '0 0 8px currentColor';
    particle.style.opacity = '1';

    document.body.appendChild(particle);

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    const velocityX = Math.cos(angle) * speed;
    const velocityY = Math.sin(angle) * speed;

    particles.push({
      x: centerX,
      y: centerY,
      size,
      color,
      velocityX,
      velocityY,
      life: 1,
      maxLife: Math.random() * 20 + 30,
      element: particle
    });
  }

  const animate = () => {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (!p) return

      p.x += p.velocityX;
      p.y += p.velocityY;

      p.velocityX *= 0.95;
      p.velocityY *= 0.95;

      p.velocityY += 0.15;

      p.life -= 1 / p.maxLife;

      p.element.style.transform = `translate(${p.x - centerX}px, ${p.y - centerY}px)`;
      p.element.style.opacity = Math.max(0, p.life).toString();
      p.element.style.scale = p.life.toString();

      if (p.life <= 0) {
        p.element.remove();
        particles.splice(i, 1);
      }
    }

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    }
  };

  animate();
};


