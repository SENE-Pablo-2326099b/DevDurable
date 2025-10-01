document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav ul');
    if (!burger || !nav) return;

    burger.addEventListener('click', function() {
        const open = nav.classList.toggle('open');
        burger.classList.toggle('active');
        document.body.style.overflow = open ? 'hidden' : '';
    });

    document.querySelectorAll('.header__nav a').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('open');
            burger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});