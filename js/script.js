/* ═══════════════════════════════════════════ CURSOR */
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  rx += (mx - rx) * 0.18;
  ry += (my - ry) * 0.18;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top = my + 'px';
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top = ry + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a,button,.skill-card,.project-card,.contact-link,.about-highlight').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});
 
/* ═══════════════════════════════════════════ LOADER */
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
let progress = 0;
const loadMessages = ['Initializing experience...', 'Loading modules...', 'Compiling shaders...', 'Almost there...'];
const loaderLabel = document.getElementById('loader-label');
const loadInterval = setInterval(() => {
  progress += Math.random() * 18 + 4;
  if (progress >= 100) { progress = 100; clearInterval(loadInterval); }
  loaderBar.style.width = progress + '%';
  const idx = Math.floor((progress/100) * loadMessages.length);
  if (loaderLabel) loaderLabel.textContent = loadMessages[Math.min(idx, loadMessages.length - 1)];
  if (progress === 100) setTimeout(hideLoader, 300);
}, 120);
function hideLoader() {
  loader.style.opacity = '0'; loader.style.transition = 'opacity 0.8s ease';
  setTimeout(() => { loader.style.display = 'none'; initHeroAnimations(); }, 800);
}
 
/* ═══════════════════════════════════════════ HERO ANIMATIONS */
function initHeroAnimations() {
  const seq = [
    { el: document.getElementById('hero-tag'), delay: 0 },
    { el: document.getElementById('hero-name'), delay: 0.15 },
    { el: document.getElementById('hero-role-wrap'), delay: 0.3 },
    { el: document.getElementById('hero-desc'), delay: 0.42 },
    { el: document.getElementById('hero-cta'), delay: 0.54 },
    { el: document.getElementById('hero-stats'), delay: 0.68 },
    { el: document.getElementById('hero-scroll'), delay: 0.9 },
  ];
  seq.forEach(({ el, delay }) => {
    if (!el) return;
    setTimeout(() => {
      el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
      el.style.opacity = '1'; el.style.transform = 'translateY(0)';
    }, delay * 1000);
  });
}
 
/* ═══════════════════════════════════════════ ROLE SWITCHER */
const roles = {
  en: ['Frontend Developer', 'AI Engineer', 'Systems Administrator'],
  es: ['Desarrollador Frontend', 'Ingeniero IA', 'Administrador de Sistemas']
};
let roleIndex = 0, currentLang = 'en';
const roleText = document.getElementById('role-text');
function cycleRole() {
  if (!roleText) return;
  roleText.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
  roleText.style.opacity = '0'; roleText.style.transform = 'translateY(-12px)';
  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles[currentLang].length;
    roleText.textContent = roles[currentLang][roleIndex];
    roleText.style.transform = 'translateY(12px)';
    setTimeout(() => {
      roleText.style.opacity = '1'; roleText.style.transform = 'translateY(0)';
    }, 50);
  }, 400);
}
setInterval(cycleRole, 2800);
 
/* ═══════════════════════════════════════════ NAV SCROLL */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});
 
/* ═══════════════════════════════════════════ SCROLL ANIMATIONS */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.style.transitionDelay || '0s';
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.fade-up, .stagger-child').forEach(el => observer.observe(el));
 
/* ═══════════════════════════════════════════ MOBILE MENU */
document.getElementById('menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.add('open');
});
function closeMobileMenu() { document.getElementById('mobile-menu').classList.remove('open'); }
 
/* ═══════════════════════════════════════════ LANGUAGE SWITCHER */
function setLang(lang) {
  currentLang = lang;
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (el.innerHTML !== undefined && val.includes('<')) el.innerHTML = val;
    else el.textContent = val;
  });
  document.querySelectorAll('[data-placeholder-' + lang + ']').forEach(el => {
    el.placeholder = el.getAttribute('data-placeholder-' + lang);
  });
  document.getElementById('btn-en').classList.toggle('active', lang === 'en');
  document.getElementById('btn-es').classList.toggle('active', lang === 'es');
  if (roleText) roleText.textContent = roles[lang][roleIndex];
  document.documentElement.lang = lang;
}
 
/* ═══════════════════════════════════════════ CONTACT FORM */
function sendMessage() {
  const name = document.getElementById('f-name').value;
  const email = document.getElementById('f-email').value;
  const subject = document.getElementById('f-subject').value;
  const message = document.getElementById('f-message').value;
  if (!name || !email || !message) {
    alert(currentLang === 'es' ? 'Por favor completa todos los campos.' : 'Please fill in all required fields.');
    return;
  }
  const btn = document.querySelector('.form-submit');
  btn.style.background = 'linear-gradient(135deg,#4ade80,#22d3ee)';
  btn.innerHTML = (currentLang === 'es' ? '✓ Enviado' : '✓ Sent') + ' →';
  setTimeout(() => {
    btn.style.background = 'linear-gradient(135deg,var(--accent),var(--accent2))';
    btn.innerHTML = (currentLang === 'es' ? 'Enviar Mensaje' : 'Send Message') + ' →';
  }, 3000);
}
 
/* ═══════════════════════════════════════════ THREE.JS BACKGROUND */
(function initThree() {
  const canvas = document.getElementById('hero-canvas');
  if (!window.THREE) return;
  const W = canvas.offsetWidth, H = canvas.offsetHeight;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
  camera.position.z = 5;
 
  // Particles
  const count = window.innerWidth < 768 ? 1200 : 2800;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const colors = [
    new THREE.Color(0x6e57ff),
    new THREE.Color(0x4fc8ff),
    new THREE.Color(0xff6b9d),
    new THREE.Color(0xf0c060),
  ];
  for (let i = 0; i < count; i++) {
    const r = 12 + Math.random() * 8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
    pos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
    pos[i*3+2] = r * Math.cos(phi);
    const c = colors[Math.floor(Math.random() * colors.length)];
    col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
    sizes[i] = Math.random() * 2.5 + 0.5;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
 
  const mat = new THREE.ShaderMaterial({
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vOpacity;
      uniform float uTime;
      void main() {
        vColor = color;
        vec3 p = position;
        float wave = sin(uTime * 0.4 + p.x * 0.3 + p.y * 0.2) * 0.15;
        p.z += wave;
        vOpacity = 0.3 + 0.7 * (1.0 - abs(p.z) / 20.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = size * (300.0 / -gl_Position.z);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vOpacity;
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        if (d > 1.0) discard;
        float alpha = (1.0 - d) * vOpacity * 0.85;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    uniforms: { uTime: { value: 0 } },
    transparent: true, vertexColors: true, depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const particles = new THREE.Points(geo, mat);
  scene.add(particles);
 
  // Nebula rings
  for (let i = 0; i < 3; i++) {
    const ringGeo = new THREE.TorusGeometry(3 + i * 1.5, 0.008, 2, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: [0x6e57ff, 0x4fc8ff, 0xff6b9d][i],
      transparent: true, opacity: 0.12,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2 + (i * 0.4);
    ring.rotation.y = i * 0.6;
    scene.add(ring);
  }
 
  let mouseX = 0, mouseY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
  });
 
  let t = 0;
  function animate() {
    if (document.getElementById('hero').getBoundingClientRect().bottom < 0) {
      requestAnimationFrame(animate); return;
    }
    t += 0.005;
    mat.uniforms.uTime.value = t;
    particles.rotation.y = t * 0.04 + mouseX * 0.08;
    particles.rotation.x = t * 0.02 + mouseY * 0.04;
    scene.children.forEach((c, i) => {
      if (c.type === 'Mesh') { c.rotation.z = t * (0.05 + i * 0.02); }
    });
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
 
  window.addEventListener('resize', () => {
    const W2 = canvas.offsetWidth, H2 = canvas.offsetHeight;
    renderer.setSize(W2, H2);
    camera.aspect = W2 / H2;
    camera.updateProjectionMatrix();
  });
})();
 
/* ═══════════════════════════════════════════ AUDIO */
let audioCtx = null, gainNode = null, isPlaying = false;
function toggleAudio() {
  const btn = document.getElementById('audio-btn');
  if (!isPlaying) {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      gainNode = audioCtx.createGain();
      gainNode.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gainNode.connect(audioCtx.destination);
      function createTone(freq, type) {
        const osc = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        osc.type = type; osc.frequency.value = freq;
        g.gain.setValueAtTime(0.08, audioCtx.currentTime);
        osc.connect(g); g.connect(gainNode); osc.start();
        return osc;
      }
      createTone(60, 'sine');
      createTone(120, 'sine');
      createTone(180, 'triangle');
      const buf = audioCtx.createBuffer(1, audioCtx.sampleRate * 2, audioCtx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.015;
      const src = audioCtx.createBufferSource();
      src.buffer = buf; src.loop = true;
      const filt = audioCtx.createBiquadFilter();
      filt.type = 'lowpass'; filt.frequency.value = 400;
      src.connect(filt); filt.connect(gainNode); src.start();
    } else { audioCtx.resume(); }
    btn.textContent = '🔊'; isPlaying = true;
  } else {
    audioCtx.suspend(); btn.textContent = '🔇'; isPlaying = false;
  }
}
 
/* ═══════════════════════════════════════════ SMOOTH ANCHOR SCROLL */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});
