// Detección preferencia tema.

const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';


// Variables

const btnLight = document.getElementById('btn-light');
const btnDark  = document.getElementById('btn-dark');
const navLinks = document.querySelector('.nav-links');
const form     = document.getElementById('contact-form');
const statusDiv= document.getElementById('form-message');


// Función aplicar tema.

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);

  
// Marcar botón de tema actual.
  
  btnLight.removeAttribute('data-selected');
  btnDark.removeAttribute('data-selected');
  document.getElementById(`btn-${theme}`).setAttribute('data-selected', '');
}


// Inicializar tema por defecto.

setTheme(localStorage.getItem('theme') || defaultTheme);


// Eventos cambio de tema.

btnLight.addEventListener('click', () => setTheme('light'));
btnDark .addEventListener('click', () => setTheme('dark'));


// Envío formulario.

form.addEventListener('submit', async e => {
  e.preventDefault();
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
//Feedback formulario.
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
