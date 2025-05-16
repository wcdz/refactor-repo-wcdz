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

// Añadir event listener al botón
document.addEventListener('DOMContentLoaded', function() {
  checkTheme();
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
});
