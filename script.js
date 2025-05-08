document.addEventListener('DOMContentLoaded', () => {
    // Temas
    const themeBtn = document.getElementById('theme-btn');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // AMini aimaciones en scroll
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

    // Formulario
    const form = document.getElementById('contact-form');
    const messageDiv = document.getElementById('form-message');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                messageDiv.textContent = 'Mensaje enviado correctamente.';
                messageDiv.className = 'visible success';
                form.reset();
            } else {
                throw new Error('Error en el servidor');
            }
        } catch (error) {
            messageDiv.textContent = 'Error al enviar el mensaje. Por favor, vuelve a intentarlo.';
            messageDiv.className = 'visible error';
        }

        setTimeout(() => {
            messageDiv.className = '';
        }, 5000);
    });
});
