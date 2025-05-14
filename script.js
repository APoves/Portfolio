// Tema preferencia.

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const defaultTheme = savedTheme || (prefersDark ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', defaultTheme);


// Variables/constantes.

const btnLight  = document.getElementById('btn-light');
const btnDark   = document.getElementById('btn-dark');
const navLinks  = document.querySelector('.nav-links');
const form      = document.getElementById('contact-form');
const statusDiv = document.getElementById('form-message');


// Temas.

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  btnLight.removeAttribute('data-selected');
  btnDark.removeAttribute('data-selected');
  document.getElementById(`btn-${theme}`).setAttribute('data-selected', '');
}


// Inicializar tema al cargar.

setTheme(defaultTheme);


// Cambio de tema.
btnLight.addEventListener('click', () => setTheme('light'));
btnDark .addEventListener('click', () => setTheme('dark'));


// Menú hamburg.

const hamburger    = document.querySelector('.hamburger');
const navContainer = document.querySelector('.nav-container');

hamburger?.addEventListener('click', () => {
  navContainer.classList.toggle('active');
  hamburger.classList.toggle('active');
});


// Cierre menú (click en enlace):

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      navContainer.classList.remove('active');
      hamburger?.classList.remove('active');
    }
  });
});


// Cierre menú (click fuera).

document.addEventListener('click', (e) => {
  if (navContainer.classList.contains('active') && 
     !navContainer.contains(e.target) && 
     !hamburger.contains(e.target)) {
    navContainer.classList.remove('active');
    hamburger.classList.remove('active');
  }
});


// Formulario.

form.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      statusDiv.textContent = 'Mensaje enviado correctamente.';
      statusDiv.className = 'success';
      form.reset();
    } else {
      statusDiv.textContent = 'Error al enviar el mensaje. Por favor, vuelve a intentarlo.';
      statusDiv.className = 'error';
    }
  } catch {
    statusDiv.textContent = 'El mensaje no se ha podido enviar. Por favor, vuelve a intentarlo.';
    statusDiv.className = 'error';
  }
});
