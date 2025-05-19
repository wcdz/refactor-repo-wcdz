function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Función para cambiar entre modo claro y oscuro
function toggleTheme() {
  const theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateThemeIcon(theme);
}

// Función para actualizar el ícono de acuerdo al tema
function updateThemeIcon(theme) {
  const themeIcon = document.getElementById('theme-icon');
  if (theme === 'dark') {
    themeIcon.data = "./assets/moon.svg";
  } else {
    themeIcon.data = "./assets/sun.svg";
  }
}

// Función para verificar el tema guardado o preferencia del sistema
function checkTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Si el usuario prefiere tema oscuro en el sistema
    document.documentElement.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
  }
}

// Función para animar elementos cuando son visibles
function animateOnScroll() {
  const elements = document.querySelectorAll('.fade-in, .slide-in');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = 1;
      
      if (element.classList.contains('from-left')) {
        element.style.transform = 'translateX(0)';
      } else if (element.classList.contains('from-right')) {
        element.style.transform = 'translateX(0)';
      }
    }
  });
}

// Suavizar el scroll para anclas
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Función para manejar el botón de volver arriba
function handleBackToTop() {
  const backToTopButton = document.getElementById('back-to-top');
  
  // Mostrar u ocultar el botón según la posición del scroll
  function toggleBackToTopButton() {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('visible');
    } else {
      backToTopButton.classList.remove('visible');
    }
  }
  
  // Evento de click para volver arriba
  if (backToTopButton) {
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    
    // También permitir usar la tecla Enter para activar el botón
    backToTopButton.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    });
    
    // Mostrar/ocultar en función del scroll
    window.addEventListener('scroll', toggleBackToTopButton);
    
    // Verificar posición inicial
    toggleBackToTopButton();
  }
}

// Función para resaltar el enlace de navegación activo
function highlightActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  // Detectar qué sección es visible actualmente
  function setActiveLink() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    // Resaltar el enlace correspondiente
    navLinks.forEach(link => {
      link.classList.remove('active-link');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active-link');
      }
    });
  }
  
  window.addEventListener('scroll', setActiveLink);
  setActiveLink(); // Comprobar enlace activo al cargar
}

// Función para precarga de imágenes críticas
function preloadCriticalImages() {
  const imagesToPreload = [
    './assets/profile-pic.png',
    './assets/sun.svg',
    './assets/moon.svg'
  ];
  
  imagesToPreload.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

// Función para efecto parallax
function setupParallaxEffect() {
  const profileSection = document.getElementById('profile');
  const profileImage = document.querySelector('.section__pic-container img');
  
  if (!profileSection || !profileImage) return;
  
  window.addEventListener('scroll', () => {
    const scrollValue = window.scrollY;
    
    // Efecto de movimiento parallax sutil para la imagen de perfil
    if (scrollValue < profileSection.offsetHeight) {
      profileImage.style.transform = `translateY(${scrollValue * 0.15}px)`;
    }
  });
  
  // Efecto de movimiento en respuesta al movimiento del ratón
  profileSection.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Calcular la posición relativa del cursor
    const moveX = (clientX - windowWidth / 2) / 25;
    const moveY = (clientY - windowHeight / 2) / 25;
    
    // Aplicar transformación a la imagen de perfil
    profileImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
  
  // Restaurar posición al salir de la sección
  profileSection.addEventListener('mouseleave', () => {
    profileImage.style.transform = 'translate(0, 0)';
  });
}

// Añadir event listener al botón de tema y scroll
document.addEventListener('DOMContentLoaded', function() {
  // Verificar tema
  checkTheme();
  
  // Event listener para botón de cambio de tema
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  // Inicializar animaciones
  animateOnScroll();
  
  // Animar al hacer scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Inicializar botón de volver arriba
  handleBackToTop();
  
  // Resaltar enlace de navegación activo
  highlightActiveNavLink();
  
  // Configurar efecto parallax
  setupParallaxEffect();
  
  // Precarga de imágenes críticas
  preloadCriticalImages();
  
  // Aplicar animaciones iniciales con delay
  setTimeout(() => {
    document.querySelectorAll('.fade-in, .slide-in').forEach(el => {
      el.style.transition = 'all 1s ease';
    });
    animateOnScroll();
  }, 300);
});
