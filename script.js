// Detección preferencia usuario
const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// Elementos
const btnLight = document.getElementById('btn-light');
const btnDark = document.getElementById('btn-dark');
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const form = document.getElementById('contact-form');
const statusDiv = document.getElementById('form-message');

// Función para setear tema
function setTheme(theme) {
  document.body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  btnLight.removeAttribute('data-selected');
  btnDark.removeAttribute('data-selected');
  document.getElementById(`btn-${theme}`).setAttribute('data-selected', '');
}

// Eventos de botones
btnLight.addEventListener('click', () => setTheme('light'));
btnDark.addEventListener('click', () => setTheme('dark'));

// Inicializar tema
setTheme(localStorage.getItem('theme') || defaultTheme);

// Toggle menú móvil
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('hidden');
});

// Animaciones scroll
document.querySelectorAll('section').forEach(sec => {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) sec.classList.add('visible');
  }, { threshold: 0.1 }).observe(sec);
});

// Envío de formulario con feedback
form.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (res.ok) {
      statusDiv.textContent = 'Mensaje enviado.';
      statusDiv.className = 'success';
      form.reset();
    } else {
      statusDiv.textContent = 'Error al enviar el mensaje, por favor, vuelve a intentarlo.';
      statusDiv.className = 'error';
    }
  } catch {
    statusDiv.textContent = 'Error de red. Por favor, vuelve a intentarlo';
    statusDiv.className = 'error';
  }
});
