// script.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Configuración del Tema
    const themeBtn = document.getElementById('theme-btn');
    let currentTheme = localStorage.getItem('theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.body.setAttribute('data-theme', currentTheme);

    // 2. Configuración EmailJS (REEMPLAZAR CON TUS DATOS)
    const serviceID = 'service_tnn826n'; // Tu Service ID de EmailJS
    const templateID = 'ID:template_dnxkz25'; // Tu Template ID de EmailJS

    // 3. Animaciones al hacer scroll
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

    // 4. Manejo del Formulario
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        formMessage.style.display = 'block';

        emailjs.sendForm(serviceID, templateID, e.target)
            .then(() => {
                formMessage.textContent = 'Mensaje enviado correctamente';
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
                contactForm.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
                formMessage.textContent = 'Error al enviar el mensaje. Por favor, vuelve a intentarlo de nuevo.';
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
            })
            .finally(() => {
                setTimeout(() => {
                    formMessage.classList.remove('success', 'error');
                    formMessage.style.display = 'none';
                }, 5000);
            });
    });

    // 5. Toggle del Tema
    themeBtn.addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 6. Menú Hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    menuToggle.addEventListener('change', (e) => {
        document.body.style.overflow = e.target.checked ? 'hidden' : 'auto';
    });

    // 7. Smooth Scroll para los enlaces del menú
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Cerrar menú móvil después de hacer clic
                if (window.innerWidth <= 768) {
                    menuToggle.checked = false;
                    document.body.style.overflow = 'auto';
                }
            }
        });
    });

    // 8. Cerrar menú al hacer clic fuera en móvil
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !e.target.closest('nav') && 
            !e.target.closest('.menu-btn')) {
            menuToggle.checked = false;
            document.body.style.overflow = 'auto';
        }
    });
});
