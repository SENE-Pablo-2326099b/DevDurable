// Navigation responsive pour tous les fichiers
document.addEventListener('DOMContentLoaded', function() {
    console.log('[Navigation] Script chargé');
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav ul');
    
    console.log('[Navigation] Éléments trouvés:', { burger: !!burger, nav: !!nav });

    // Toggle menu burger
    if (burger && nav) {
        console.log('[Navigation] Menu burger initialisé');
        burger.addEventListener('click', function() {
            nav.classList.toggle('open');
            burger.classList.toggle('active');
        });

        // Fermer le menu au clic sur un lien
        document.querySelectorAll('.header__nav a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('open');
                burger.classList.remove('active');
            });
        });
    }
});