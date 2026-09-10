const storyData = {
  memories: [
    {
      date: 'o começo',
      title: 'o começo',
      text: 'Foi aquele momento em que eu te mandei mensagem no TikTok e começámos a falar. A primeira coisa que te pedi foi um foguinho, e depois percebi que havia algo muito bonito a começar entre nós.'
    },
    {
      date: 'o primeiro momento',
      title: 'o primeiro momento',
      text: 'Foi aquele momento em que cada sorriso teu, cada brilho nos teus olhos e cada conversa me faziam ficar ainda mais apaixonado por ti, sem eu me aperceber.'
    },
    {
      date: 'a primeira memória',
      title: 'a primeira memória',
      text: 'Como esquecer o dia em que fui ver o teu jogo, no Guia FC X Seixal 1925? Foi nesse dia que me lembrei, como se fosse ontem, de como me apaixonei ainda mais por ti.'
    },
    {
      date: 'o nosso primeiro mês',
      title: 'o nosso primeiro mês',
      text: 'Um mês que parece curto quando se diz, mas que foi tão especial — mesmo sem conseguir estar sempre ao teu lado fisicamente. Um mês que me fez perceber que quero estar contigo para sempre.'
    },
    {
      date: 'amanhã',
      title: 'amanhã',
      text: 'Amanhã começa uma nova parte da nossa história, e eu mal posso esperar para a viver contigo.'
    }
  ],
  letterParagraphs: [
    'Um mês.',
    'Às vezes penso que este primeiro mês não foi só uma passagem do tempo, mas um lembrete de que a vida pode ser mesmo bonita quando alguém entra nela com calma, com carinho e com verdade.',
    'Gosto da forma como contigo tudo parece ficar mais leve. Como se existisse um jeito teu de transformar os dias comuns em coisas que valem a pena guardar.',
    'Há algo em ti que me faz sentir em paz, e isso é raro. E talvez por isso tenha gostado tanto deste mês: porque ele me ensinou que as coisas bonitas nem sempre precisam ser grandes para ficarem no coração.',
    'Eu gosto de pensar que o que nos une não está só nas palavras, mas também nas pequenas coisas que ficam sem precisar de ser explicadas — num sorriso, numa conversa, numa presença que me faz bem só por existir.',
    'Mesmo quando as coisas não são perfeitas, contigo parece que tudo ganha um pouco mais de sentido. E isso é uma das coisas mais especiais que já me aconteceu.',
    'Quero continuar a descobrir isto contigo, passo a passo, com calma e com vontade de viver tudo o que ainda há por vir.',
    'Obrigada por este mês.',
    'Obrigada por seres tu.',
    'Feliz primeiro mês. 🩵'
  ]
};

const heroLineOne = document.getElementById('heroLineOne');
const heroLineTwo = document.getElementById('heroLineTwo');
const openButton = document.getElementById('openGift');
const story = document.getElementById('story');
const qrButton = document.getElementById('qrButton');
const qrModal = document.getElementById('qrModal');
const closeQr = document.getElementById('closeQr');
const qrImage = document.getElementById('qrImage');
const musicButton = document.getElementById('musicToggle');
const audio = document.getElementById('ambientAudio');
const timelineList = document.getElementById('timelineList');
const letterContent = document.getElementById('letterContent');
const secretButton = document.getElementById('secretButton');
const secretNote = document.getElementById('secretNote');
const finalHeart = document.getElementById('finalHeart');
const finalNote = document.getElementById('finalNote');

function buildTimeline() {
  storyData.memories.forEach((memory, index) => {
    const item = document.createElement('article');
    item.className = 'timeline-item reveal';
    item.dataset.delay = String(index + 1);
    item.innerHTML = `
      <div class="date">${memory.date}</div>
      <h3 class="title">${memory.title}</h3>
      <p class="text">${memory.text}</p>
    `;
    timelineList.appendChild(item);
  });
}

function buildLetter() {
  storyData.letterParagraphs.forEach((paragraph) => {
    const p = document.createElement('p');
    p.textContent = paragraph;
    letterContent.appendChild(p);
  });

  const signature = document.createElement('p');
  signature.className = 'signature';
  signature.textContent = 'com todo o meu amor,\n eu 🩵';
  letterContent.appendChild(signature);
}

function setupRevealObserver() {
  const revealItems = document.querySelectorAll('.reveal, .reveal-line, .tomorrow-line');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -5% 0px'
  });

  revealItems.forEach((item) => observer.observe(item));
}

function setupHeroSequence() {
  heroLineOne.classList.add('is-visible');

  if (heroLineTwo) {
    setTimeout(() => {
      heroLineTwo.classList.add('is-visible');
    }, 450);
  }

  setTimeout(() => {
    openButton.classList.add('is-visible');
  }, 900);
}

function startParticles() {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles';
  document.body.appendChild(particlesContainer);

  const symbols = ['🩵', '✦', '•', '✧', '💙', '✨'];

  for (let i = 0; i < 20; i += 1) {
    const particle = document.createElement('span');
    particle.className = 'particle';
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.fontSize = `${0.7 + Math.random() * 1.3}rem`;
    particle.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 140}px`);
    particle.style.animationDuration = `${7 + Math.random() * 6}s`;

    particlesContainer.appendChild(particle);

    setTimeout(() => particle.remove(), 13000);
  }

  setTimeout(() => particlesContainer.remove(), 15000);
}

function setupParallax() {
  const parallaxItems = document.querySelectorAll('[data-parallax]');

  const update = () => {
    parallaxItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const mid = window.innerHeight / 2;
      const dist = (rect.top - mid) * 0.05;
      item.style.setProperty('--parallax-shift', `${dist}px`);
    });
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}

function setupMusic() {
  if (!musicButton || !audio) {
    return;
  }

  audio.preload = 'auto';
  musicButton.classList.remove('is-playing');
  musicButton.classList.add('is-paused');
  musicButton.setAttribute('aria-pressed', 'false');

  musicButton.addEventListener('click', async () => {
    try {
      if (audio.paused) {
        await audio.play();
      } else {
        audio.pause();
      }
    } catch (error) {
      musicButton.classList.remove('is-playing');
      musicButton.classList.add('is-paused');
      musicButton.setAttribute('aria-label', 'Música indisponível neste navegador');
    }
  });

  audio.addEventListener('play', () => {
    musicButton.classList.add('is-playing');
    musicButton.classList.remove('is-paused');
    musicButton.setAttribute('aria-pressed', 'true');
  });

  audio.addEventListener('pause', () => {
    musicButton.classList.remove('is-playing');
    musicButton.classList.add('is-paused');
    musicButton.setAttribute('aria-pressed', 'false');
  });

  audio.addEventListener('error', () => {
    musicButton.classList.remove('is-playing');
    musicButton.classList.add('is-paused');
    musicButton.setAttribute('aria-pressed', 'false');
    musicButton.setAttribute('aria-label', 'Música indisponível neste navegador');
  });
}

async function startMusic() {
  if (!audio || !musicButton) {
    return;
  }

  musicButton.classList.add('is-visible');

  try {
    if (audio.paused) {
      await audio.play();
    }
  } catch (error) {
    musicButton.classList.remove('is-playing');
    musicButton.classList.add('is-paused');
    musicButton.setAttribute('aria-label', 'Música indisponível neste navegador');
  }
}

function openGift() {
  document.body.classList.add('story-open');
  story.scrollIntoView({ behavior: 'smooth', block: 'start' });
  startParticles();
  startMusic();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const firstReveal = document.querySelector('.intro');
  if (firstReveal) {
    firstReveal.classList.add('is-visible');
  }
}

function setupSecretDetails() {
  if (secretButton && secretNote) {
    secretButton.addEventListener('click', () => {
      secretNote.classList.add('is-visible');
    });
  }

  if (finalHeart && finalNote) {
    finalHeart.addEventListener('click', () => {
      finalNote.classList.add('is-visible');
    });
  }
}

function getQrTargetUrl() {
  return new URL(window.location.href).href;
}

function setupQr() {
  if (!qrButton || !qrModal || !closeQr || !qrImage) {
    return;
  }

  const qrUrlText = document.querySelector('.qr-url');

  qrButton.addEventListener('click', async () => {
    const qrTargetUrl = await getQrTargetUrl();

    qrModal.classList.add('is-open');
    qrModal.setAttribute('aria-hidden', 'false');
    qrImage.src = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(qrTargetUrl);

    if (qrUrlText) {
      qrUrlText.textContent = qrTargetUrl;
    }
  });

  closeQr.addEventListener('click', () => {
    qrModal.classList.remove('is-open');
    qrModal.setAttribute('aria-hidden', 'true');
  });

  qrModal.addEventListener('click', (event) => {
    if (event.target === qrModal) {
      qrModal.classList.remove('is-open');
      qrModal.setAttribute('aria-hidden', 'true');
    }
  });
}

function init() {
  buildTimeline();
  buildLetter();
  setupRevealObserver();
  setupHeroSequence();
  setupParallax();
  setupMusic();
  setupSecretDetails();
  setupQr();

  if (openButton) {
    openButton.addEventListener('click', openGift);
  }
}

init();