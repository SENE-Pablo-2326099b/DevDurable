// Navigation responsive pour tous les fichiers
document.addEventListener('DOMContentLoaded', function() {
    console.log('[Navigation] Script chargé');
    const burger = document.querySelector('.header__burger');
    const nav = document.querySelector('.header__nav ul');
    const navLinks = document.querySelectorAll('.header__nav a');
    
    console.log('[Navigation] Éléments trouvés:', { burger: !!burger, nav: !!nav, navLinks: navLinks.length });

    // Toggle menu burger
    if (burger && nav) {
        console.log('[Navigation] Menu burger initialisé');
        burger.addEventListener('click', function() {
            const isOpen = nav.classList.contains('open');
            
            // Toggle classes
            nav.classList.toggle('open');
            burger.classList.toggle('active');
            
            // Update aria-expanded
            burger.setAttribute('aria-expanded', !isOpen);
            
            // Empêcher le scroll quand le menu est ouvert
            document.body.style.overflow = !isOpen ? 'hidden' : '';
        });

        // Fermer le menu au clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('open');
                burger.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Fermer le menu au clic en dehors
        document.addEventListener('click', function(e) {
            if (!burger.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('open');
                burger.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Fermer le menu avec la touche Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && nav.classList.contains('open')) {
                nav.classList.remove('open');
                burger.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Gérer le redimensionnement de la fenêtre
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                nav.classList.remove('open');
                burger.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
});