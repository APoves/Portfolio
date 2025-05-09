document.addEventListener('DOMContentLoaded', () => {
    // Tema (light/dark)
    const themeBtn = document.getElementById('theme-btn');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Animaciones en scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Menú hamburguesa en móvil
    const menuToggle = document.getElementById('menu-toggle');
    menuToggle.addEventListener('change', (e) => {
        document.body.style.overflow = e.target.checked ? 'hidden' : 'auto';
    });

    // Formulario de contacto
    const form = document.getElementById('contact-form');
    // Opcional: elemento donde mostraremos el estado del envío
    const statusDiv = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Mostrar mensaje de éxito
                if (statusDiv) {
                    statusDiv.textContent = 'Mensaje enviado.';
                    statusDiv.classList.remove('error');
                    statusDiv.classList.add('success');
                } else {
                    alert('Mensaje enviado.');
                }
                form.reset();
            } else {
                // Mostrar mensaje de error
                if (statusDiv) {
                    statusDiv.textContent = 'Mensaje no enviado. Por favor, vuelve a intentarlo.';
                    statusDiv.classList.remove('success');
                    statusDiv.classList.add('error');
                } else {
                    alert('Mensaje no enviado. Por favor, vuelve a intentarlo.');
                }
            }
        } catch (error) {
            // Manejar error de red
            if (statusDiv) {
                statusDiv.textContent = 'Error de red. Por favor, comprueba tu conexión e inténtalo de nuevo.';
                statusDiv.classList.remove('success');
                statusDiv.classList.add('error');
            } else {
                alert('Error de red. Por favor, comprueba tu conexión e inténtalo de nuevo.');
            }
        }
    });

});
