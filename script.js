// Nav links functionality (for index.html)
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.nav-link-custom').forEach(link => {
        link.addEventListener('click', function (e) {
            // Remove active class from all links
            document.querySelectorAll('.nav-link-custom').forEach(el => el.classList.remove('active', 'text-dark'));
            document.querySelectorAll('.nav-link-custom').forEach(el => el.classList.add('text-dark'));

            // Add active class to clicked link and remove text-dark
            this.classList.add('active');
            this.classList.remove('text-dark');
        });
    });
});

