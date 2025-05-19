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
});
