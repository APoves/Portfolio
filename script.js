cted');
  btnDark.removeAttribute('data-selected');
  document.getElementById(`btn-${theme}`).setAttribute('data-selected', '');
}

// ——————————————————————
// Inicializar tema al cargar la página
// ——————————————————————
setTheme(localStorage.getItem('theme') || defaultTheme);

// Eventos de cambio de tema
btnLight.addEventListener('click', () => setTheme('light'));
btnDark .addEventListener('click', () => setTheme('dark'));

// ————————————————
// Toggle menú móvil
// ————————————————
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// ———————————————
// Animaciones on scroll
// ———————————————
document.querySelectorAll('section').forEach(sec => {
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) sec.classList.add('visible');
  }, { threshold: 0.1 }).observe(sec);
});

// —————————————————————————
// Envío de formulario con feedback
// —————————————————————————
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
    statusDiv.textContent = 'Error de red. Por favor, vuelve a intentarlo.';
    statusDiv.className = 'error';
  }
});
