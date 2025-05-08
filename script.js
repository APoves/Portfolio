document.addEventListener('DOMContentLoaded', () => {
    // Temas
    const themeBtn = document.getElementById('theme-btn');
    const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.body.setAttribute('data-theme', currentTheme);

    themeBtn.addEventListener('click', () => {
        const current = document.body.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Formulario
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        emailjs.sendForm('service_id', 'template_id', e.target)
            .then(() => {
                alert('Mensaje enviado.');
                e.target.reset();
            }, (error) => {
                alert('Error: ' + JSON.stringify(error));
            });
    });

    // Menú hamb
    document.getElementById('menu-toggle').addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    // Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
