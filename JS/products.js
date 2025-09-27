// ========================================
// JAVASCRIPT SPÉCIFIQUE POUR LA PAGE BOUTIQUE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Sécurité : vérifier la présence de la grille produits
    const productSection = document.querySelector('.products-grid');
    if (!productSection) {
        console.warn('[products.js] Aucune section .products-grid trouvée — script arrêté.');
        return;
    }
    
    // ========================================
    // FILTRAGE DES PRODUITS
    // ========================================
    
    // Éléments de filtrage
    const besoinCards = document.querySelectorAll('.besoin-card');
    const filterSpecials = document.querySelectorAll('.filter-special');
    const productCards = document.querySelectorAll('.product-card');
    
    let activeCategory = 'all';
    let activeSpecialFilters = [];
    
    // Fonction de filtrage principal (déjà robuste si données manquantes)
    function filterProducts() {
        productCards.forEach(product => {
            const productCategory = product.dataset.category;
            const productTags = product.dataset.tags ? product.dataset.tags.split(' ') : [];
            
            // Vérifier la catégorie
            const matchCategory = activeCategory === 'all' || productCategory === activeCategory;
            
            // Vérifier les filtres spéciaux
            const matchSpecial = activeSpecialFilters.length === 0 || 
                                activeSpecialFilters.some(filter => productTags.includes(filter));
            
            // Afficher/masquer le produit
            if (matchCategory && matchSpecial) {
                product.style.display = 'block';
                product.classList.add('show');
            } else {
                product.style.display = 'none';
                product.classList.remove('show');
            }
        });
        
        // Animation d'entrée pour les produits visibles
        setTimeout(() => {
            document.querySelectorAll('.product-card.show').forEach((product, index) => {
                product.style.animationDelay = `${index * 0.1}s`;
                product.classList.add('animate-in');
            });
        }, 50);
    }
    
    // Gestion des catégories de besoin
    besoinCards.forEach(card => {
        card.addEventListener('click', function() {
            // Retirer l'état actif de toutes les cartes
            besoinCards.forEach(c => c.classList.remove('active'));
            
            // Activer la carte cliquée
            this.classList.add('active');
            activeCategory = this.dataset.category;
            
            // Filtrer les produits
            filterProducts();
            
            // Animation de la carte sélectionnée
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Gestion des filtres spéciaux
    filterSpecials.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.dataset.filter;

            if (!filterValue) return; // sécurité

            if (this.classList.contains('active')) {
                this.classList.remove('active');
                activeSpecialFilters = activeSpecialFilters.filter(f => f !== filterValue);
            } else {
                this.classList.add('active');
                if (!activeSpecialFilters.includes(filterValue)) {
                    activeSpecialFilters.push(filterValue);
                }
            }
            filterProducts();
        });
    });
    
    // ========================================
    // ANIMATIONS AU SCROLL
    // ========================================
    
    // Observer pour les animations d'entrée
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-reveal');
                }, index * 100);
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments animables
    document.querySelectorAll('.stat-card, .product-card, .besoin-card, .filters__container').forEach(el => {
        animationObserver.observe(el);
    });
    
    // ========================================
    // EFFETS INTERACTIFS
    // ========================================
    
    // Effet de survol amélioré sur les produits
    productCards.forEach(product => {
        const productImage = product.querySelector('.product__image img');
        
        product.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
        });
        product.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Animation sur les stat-cards
    document.querySelectorAll('.stat-card').forEach(stat => {
        const statNumber = stat.querySelector('.stat-number');
        
        stat.addEventListener('mouseenter', function() {
            if (statNumber) {
                statNumber.style.transform = 'scale(1.2)';
                statNumber.style.color = 'var(--secondary)';
            }
        });
        
        stat.addEventListener('mouseleave', function() {
            if (statNumber) {
                statNumber.style.transform = '';
                statNumber.style.color = '';
            }
        });
    });
    
    // ========================================
    // COMPTEURS ANIMÉS
    // ========================================
    
    function animateCounters() {
        document.querySelectorAll('.stat-number').forEach(counter => {
            const text = counter.textContent;
            const number = parseInt(text.replace(/[^\d]/g, ''));
            
            if (number && !counter.hasAttribute('data-animated')) {
                counter.setAttribute('data-animated', 'true');
                
                let current = 0;
                const increment = number / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        current = number;
                        clearInterval(timer);
                    }
                    
                    // Conserver le format original
                    if (text.includes('tonnes')) {
                        counter.textContent = Math.floor(current) + ' tonnes';
                    } else if (text.includes('mois')) {
                        counter.textContent = Math.floor(current) + ' mois';
                    } else if (text.includes('%')) {
                        counter.textContent = '-' + Math.floor(current) + '%';
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                }, 40);
            }
        });
    }
    
    // Observer pour déclencher les compteurs
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stats').forEach(stats => {
        counterObserver.observe(stats);
    });
    
    // ========================================
    // RECHERCHE INSTANTANÉE
    // ========================================
    
    // Ajouter une barre de recherche si elle n'existe pas
    const filtersContainer = document.querySelector('.filters__container');
    if (filtersContainer && !document.querySelector('.search-input')) {
        const searchHTML = `
            <div class="search-container">
                <input type="text" class="search-input" placeholder="🔍 Rechercher un produit..." />
            </div>
        `;
        filtersContainer.insertAdjacentHTML('afterend', searchHTML);
        
        // Fonctionnalité de recherche
        const searchInput = document.querySelector('.search-input');
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            productCards.forEach(product => {
                const title = product.querySelector('.product-title').textContent.toLowerCase();
                const description = product.querySelector('.product-desc').textContent.toLowerCase();
                const category = product.querySelector('.product__category').textContent.toLowerCase();
                
                const matches = title.includes(searchTerm) || 
                              description.includes(searchTerm) || 
                              category.includes(searchTerm);
                
                if (searchTerm === '' || matches) {
                    product.style.display = 'block';
                    product.classList.add('search-match');
                } else {
                    product.style.display = 'none';
                    product.classList.remove('search-match');
                }
            });
        });
    }
    
    // ========================================
    // BOUTONS D'ACTION
    // ========================================
    
    // Gestion des boutons "Réserver"
    document.querySelectorAll('.btn btn--details, .btn--details').forEach(btn => { // tolère erreurs markup
        if (!btn) return;
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Animation du bouton
            this.style.transform = 'scale(0.95)';
            this.innerHTML = '✓ Réservé !';
            this.style.background = 'var(--secondary)';
            
            // Reset après animation
            setTimeout(() => {
                this.style.transform = '';
                this.innerHTML = 'Réserver';
                this.style.background = '';
            }, 2000);
            
            // Effet de particules (optionnel)
            createSuccessParticles(this);
        });
    });
    
    // Fonction pour créer des particules de succès
    function createSuccessParticles(button) {
        const rect = button.getBoundingClientRect();
        
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: var(--secondary);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
                animation: particleUp 1s ease-out forwards;
                transform: translate(${(Math.random() - 0.5) * 100}px, 0);
            `;
            
            document.body.appendChild(particle);
            
            // Supprimer la particule après animation
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }
    
    // Injecte uniquement l'animation des particules si non déjà définie
    if (!document.getElementById('products-inline-animations')) {
        const style = document.createElement('style');
        style.id = 'products-inline-animations';
        style.textContent = '@keyframes particleUp { to { transform: translate(var(--random-x, 0), -100px); opacity: 0; } }';
        document.head.appendChild(style);
    }
    
    // Lancement initial du filtrage pour appliquer l'état par défaut
    filterProducts();

    console.log('[products.js] Initialisation terminée. Produits:', productCards.length, 'Catégorie active:', activeCategory);
});