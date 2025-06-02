document.addEventListener("DOMContentLoaded", () => {
  // Tema preferencia.
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const defaultTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  // Variables/constantes.
  const btnLight = document.getElementById('btn-light');
  const btnDark = document.getElementById('btn-dark');
  const hamburger = document.querySelector('.hamburger');
  const navContainer = document.querySelector('.nav-container');
  const form = document.getElementById('contact-form');

  // Inicializar tema.
  document.documentElement.setAttribute('data-theme', defaultTheme);

  // Función cambio tema.
  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    btnLight.removeAttribute('data-selected');
    btnDark.removeAttribute('data-selected');
    document.getElementById(`btn-${theme}`).setAttribute('data-selected', '');
  }

  // Cambio tema.
  btnLight.addEventListener('click', () => setTheme('light'));
  btnDark.addEventListener('click', () => setTheme('dark'));

  // Menú.
  if (hamburger && navContainer) {
    hamburger.addEventListener('click', () => {
      navContainer.classList.toggle('active');
      hamburger.classList.toggle('active');
    });
  }

  // Cerrar menú (click fuera)
  document.addEventListener('click', (e) => {
    if (navContainer && hamburger &&
        navContainer.classList.contains('active') &&
        !e.target.closest('.nav-container') && 
        !e.target.closest('.hamburger')) {
      navContainer.classList.remove('active');
      hamburger.classList.remove('active');
    }
  });

  // Cerrar el menú (click enlace).
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && navContainer && hamburger) {
        navContainer.classList.remove('active');
        hamburger.classList.remove('active');
      }
    });
  });

  // Formulario.
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const statusDiv = document.getElementById('form-message');
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        statusDiv.textContent = res.ok 
          ? 'Mensaje enviado correctamente :)' 
          : 'Error al enviar el mensaje. Por favor, vuelve a intentarlo.';
        statusDiv.className = res.ok ? 'success' : 'error';
        if (res.ok) form.reset();
      } catch {
        statusDiv.textContent = 'Error de conexión. Inténtalo de nuevo.';
        statusDiv.className = 'error';
      }
    });
  }
});

