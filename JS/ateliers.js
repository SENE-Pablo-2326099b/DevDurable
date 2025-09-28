

document.addEventListener('DOMContentLoaded', function() {
    
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
                }, index * 150);
            }
        });
    }, observerOptions);
    
    // Observer tous les éléments animables
    document.querySelectorAll(`
        .atelier-card,
        .inscription-form,
        .hero
    `).forEach(el => {
        animationObserver.observe(el);
    });
    

    // Effet de survol amélioré sur les cartes d'atelier
    document.querySelectorAll('.atelier-card').forEach((card, index) => {
        const icon = card.querySelector('.atelier-icon');
        const date = card.querySelector('.atelier-date');
        
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px) rotateY(5deg)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            
            // Animation de l'icône
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(10deg)';
                icon.style.background = 'var(--primary)';
            }
            
            // Animation de la date
            if (date) {
                date.style.transform = 'scale(1.05)';
                date.style.background = 'var(--secondary)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            if (icon) {
                icon.style.transform = '';
                icon.style.background = '';
            }
            
            if (date) {
                date.style.transform = '';
                date.style.background = '';
            }
        });
        
        // Animation d'entrée séquentielle
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    const inscriptionForm = document.querySelector('.inscription-form form');
    
    if (inscriptionForm) {
        // Validation en temps réel
        const inputs = inscriptionForm.querySelectorAll('input, select');
        
        inputs.forEach(input => {
            // Animation au focus
            input.addEventListener('focus', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 25px rgba(46, 125, 50, 0.15)';
                this.style.borderColor = 'var(--primary)';
            });
            
            input.addEventListener('blur', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                this.style.borderColor = '';
                
                // Validation
                validateInput(this);
            });
            
            // Validation pendant la saisie
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateInput(this);
                }
            });
        });
        
        // Fonction de validation
        function validateInput(input) {
            const value = input.value.trim();
            let isValid = true;
            
            // Validation selon le type
            if (input.type === 'email') {
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            } else if (input.type === 'tel') {
                isValid = /^[\d\s\-\+\(\)]+$/.test(value) && value.length >= 10;
            } else if (input.required) {
                isValid = value.length > 0;
            }
            
            // Mise à jour visuelle
            if (isValid) {
                input.classList.remove('error');
                input.classList.add('success');
            } else {
                input.classList.add('error');
                input.classList.remove('success');
            }
            
            return isValid;
        }
        
        // Soumission du formulaire
        inscriptionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let formValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    formValid = false;
                }
            });
            
            const submitBtn = this.querySelector('button[type="submit"]');
            
            if (formValid) {
                // Animation de succès
                submitBtn.innerHTML = '✓ Inscription enregistrée !';
                submitBtn.style.background = 'var(--secondary)';
                submitBtn.style.transform = 'scale(1.05)';
                
                // Effet de confettis
                createConfetti();
                
                // Réinitialiser le formulaire
                setTimeout(() => {
                    this.reset();
                    submitBtn.innerHTML = 'S\'inscrire';
                    submitBtn.style.background = '';
                    submitBtn.style.transform = '';
                    
                    inputs.forEach(input => {
                        input.classList.remove('success', 'error');
                    });
                }, 3000);
                
            } else {
                // Animation d'erreur
                submitBtn.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    submitBtn.style.animation = '';
                }, 500);
                
                // Focus sur le premier champ en erreur
                const firstError = this.querySelector('.error');
                if (firstError) {
                    firstError.focus();
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    
    // Ajouter des boutons favoris aux cartes
    document.querySelectorAll('.atelier-card').forEach(card => {
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.innerHTML = '♡';
        favoriteBtn.setAttribute('aria-label', 'Ajouter aux favoris');
        
        card.appendChild(favoriteBtn);
        
        favoriteBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.innerHTML = '♡';
                this.style.color = '#666';
                
                // Animation de retrait
                this.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
            } else {
                this.classList.add('active');
                this.innerHTML = '♥';
                this.style.color = 'var(--primary)';
                
                // Animation d'ajout avec effet de pulsation
                this.style.transform = 'scale(1.3)';
                this.style.animation = 'pulse 0.6s ease-out';
                
                setTimeout(() => {
                    this.style.transform = '';
                    this.style.animation = '';
                }, 600);
                
                // Créer des petits cœurs flottants
                createFloatingHearts(this);
            }
        });
    });
    

    // Créer une barre de filtres
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const filtersHTML = `
            <div class="ateliers-filters">
                <button class="filter-atelier active" data-type="all">Tous les ateliers</button>
                <button class="filter-atelier" data-type="reparation">Réparation</button>
                <button class="filter-atelier" data-type="formation">Formation</button>
                <button class="filter-atelier" data-type="sensibilisation">Sensibilisation</button>
            </div>
        `;
        
        heroSection.insertAdjacentHTML('afterend', filtersHTML);
        
        // Gestion du filtrage
        const filterButtons = document.querySelectorAll('.filter-atelier');
        const atelierCards = document.querySelectorAll('.atelier-card');
        
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // Mise à jour des boutons
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const filterType = this.dataset.type;
                
                // Filtrage des cartes
                atelierCards.forEach((card, index) => {
                    const cardType = card.dataset.type || 'reparation';
                    
                    if (filterType === 'all' || cardType === filterType) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    
    // Créer des confettis
    function createConfetti() {
        const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
        
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: 50%;
                top: 50%;
                animation: confettiFall 2s ease-out forwards;
                transform: translate(${(Math.random() - 0.5) * 200}px, 0);
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 2000);
        }
    }
    
    // Créer des cœurs flottants
    function createFloatingHearts(button) {
        const rect = button.getBoundingClientRect();
        
        for (let i = 0; i < 3; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '♥';
            heart.style.cssText = `
                position: fixed;
                color: var(--primary);
                font-size: 12px;
                pointer-events: none;
                z-index: 9999;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
                animation: heartFloat 1.5s ease-out forwards;
                transform: translate(${(Math.random() - 0.5) * 40}px, 0);
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 1500);
        }
    }
    
    const style = document.createElement('style');
    style.textContent = `
        /* Styles pour les animations */
        .animate-reveal {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes confettiFall {
            to {
                transform: translate(var(--random-x, 0), 300px) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes heartFloat {
            to {
                transform: translate(var(--random-x, 0), -50px);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.3); }
        }
        
        /* Styles pour les filtres d'ateliers */
        .ateliers-filters {
            background: var(--white);
            padding: 2rem;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            margin-bottom: 2rem;
        }
        
        .filter-atelier {
            padding: 0.8rem 1.5rem;
            margin: 0 0.5rem;
            border: 2px solid #ddd;
            background: var(--white);
            border-radius: var(--btn-radius);
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
            color: var(--text);
        }
        
        .filter-atelier:hover {
            border-color: var(--primary);
            background: var(--neutral);
            transform: translateY(-2px);
        }
        
        .filter-atelier.active {
            background: var(--primary);
            border-color: var(--primary);
            color: var(--white);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(46, 125, 50, 0.3);
        }
        
        /* Styles pour les boutons favoris */
        .favorite-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: rgba(255,255,255,0.9);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #666;
        }
        
        .favorite-btn:hover {
            background: var(--white);
            transform: scale(1.1);
        }
        
        .favorite-btn.active {
            color: var(--primary);
        }
        
        /* Styles pour la validation des formulaires */
        .form-group input.error,
        .form-group select.error {
            border-color: #ef4444;
            background-color: #fef2f2;
            animation: shake 0.5s ease-in-out;
        }
        
        .form-group input.success,
        .form-group select.success {
            border-color: #22c55e;
            background-color: #f0fdf4;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
        
        /* Position relative pour les cartes (pour les boutons favoris) */
        .atelier-card {
            position: relative;
            overflow: hidden;
        }
        
        /* Animation d'entrée pour les cartes */
        .atelier-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .ateliers-filters {
                padding: 1rem;
            }
            
            .filter-atelier {
                display: block;
                margin: 0.5rem auto;
                width: 100%;
                max-width: 200px;
            }
        }
    `;
    document.head.appendChild(style);

    // Ajouter des attributs data-type aux cartes si pas présents
    document.querySelectorAll('.atelier-card').forEach((card, index) => {
        if (!card.dataset.type) {
            const types = ['reparation', 'formation', 'sensibilisation'];
            card.dataset.type = types[index % types.length];
        }
    });
});