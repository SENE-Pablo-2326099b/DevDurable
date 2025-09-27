// ========================================
// JAVASCRIPT SPÉCIFIQUE POUR LA PAGE D'ACCUEIL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // ANIMATIONS SPÉCIALES DU HERO
    // ========================================
    
    const hero = document.querySelector('.hero');
    const heroTitle = hero?.querySelector('h1');
    const heroText = hero?.querySelector('p');
    const heroButtons = hero?.querySelectorAll('.btn');
    
    // Animation séquentielle du hero
    if (hero) {
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.style.animation = 'slideInDown 1s ease-out forwards';
            }
        }, 200);
        
        setTimeout(() => {
            if (heroText) {
                heroText.style.animation = 'slideInUp 1s ease-out forwards';
            }
        }, 600);
        
        setTimeout(() => {
            heroButtons.forEach((btn, index) => {
                btn.style.animation = `fadeInScale 0.8s ease-out ${0.2 + index * 0.1}s forwards`;
            });
        }, 1000);
    }
    
    // ========================================
    // ANIMATIONS DES CARTES MISSIONS
    // ========================================
    
    const missionCards = document.querySelectorAll('.mission-card');
    
    // Observer pour les missions
    const missionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('mission-animate');
                }, index * 200);
            }
        });
    }, { threshold: 0.2 });
    
    missionCards.forEach(card => {
        missionObserver.observe(card);
        
        // Effet de survol amélioré
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.mission-icon');
            
            this.style.transform = 'translateY(-15px) scale(1.05)';
            this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
            
            if (icon) {
                icon.style.transform = 'scale(1.3) rotate(10deg)';
                icon.style.textShadow = '0 0 20px rgba(46, 125, 50, 0.5)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.mission-icon');
            
            this.style.transform = '';
            this.style.boxShadow = '';
            
            if (icon) {
                icon.style.transform = '';
                icon.style.textShadow = '';
            }
        });
    });
    
    // ========================================
    // ANIMATIONS DES PRODUITS VEDETTES
    // ========================================
    
    const productCards = document.querySelectorAll('.product');
    
    productCards.forEach((product, index) => {
        // Animation d'entrée décalée
        setTimeout(() => {
            product.style.opacity = '1';
            product.style.transform = 'translateY(0)';
        }, 1200 + index * 150);
        
        // Effet de survol avec rotation légère
        product.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(5deg) scale(1.03)';
            this.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
            
            // Animation de l'image produit
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        product.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
            
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = '';
            }
        });
    });
    
    // ========================================
    // COMPTEURS ANIMÉS POUR LES STATISTIQUES
    // ========================================
    
    function animateNumbers() {
        // Créer des statistiques si elles n'existent pas
        const stats = [
            { number: 500, suffix: '+', label: 'Familles aidées' },
            { number: 2, suffix: ' tonnes', label: 'Déchets évités' },
            { number: 75, prefix: '-', suffix: '%', label: 'Économies moyennes' },
            { number: 18, suffix: ' mois', label: 'Garantie solidaire' }
        ];
        
        const valuesSection = document.querySelector('.valeurs');
        if (valuesSection && !document.querySelector('.stats-counter')) {
            const statsHTML = `
                <div class="stats-counter">
                    <h2>Nos Impacts</h2>
                    <div class="stats-grid">
                        ${stats.map(stat => `
                            <div class="stat-item">
                                <div class="stat-number" data-number="${stat.number}" data-prefix="${stat.prefix || ''}" data-suffix="${stat.suffix}">0${stat.suffix}</div>
                                <div class="stat-label">${stat.label}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            valuesSection.insertAdjacentHTML('afterend', statsHTML);
            
            // Observer pour déclencher l'animation
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounters();
                        statsObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            const statsCounter = document.querySelector('.stats-counter');
            if (statsCounter) {
                statsObserver.observe(statsCounter);
            }
        }
    }
    
    function animateCounters() {
        document.querySelectorAll('.stat-number[data-number]').forEach(counter => {
            const target = parseInt(counter.dataset.number);
            const prefix = counter.dataset.prefix || '';
            const suffix = counter.dataset.suffix || '';
            
            let current = 0;
            const increment = target / 60;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                counter.textContent = prefix + Math.floor(current) + suffix;
            }, 30);
        });
    }
    
    // ========================================
    // EFFET PARALLAXE AVANCÉ
    // ========================================
    
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallaxe sur le hero
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        
        // Parallaxe sur les missions
        missionCards.forEach((card, index) => {
            const speed = 0.2 + (index * 0.1);
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // ========================================
    // NEWSLETTER INTERACTIVE
    // ========================================
    
    const newsletterForm = document.querySelector('.cta__form');
    if (newsletterForm) {
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitBtn = newsletterForm.querySelector('button');
        
        // Animation au focus
        if (emailInput) {
            emailInput.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.05)';
                this.style.boxShadow = '0 0 30px rgba(46, 125, 50, 0.2)';
            });
            
            emailInput.addEventListener('blur', function() {
                this.parentElement.style.transform = '';
                this.style.boxShadow = '';
            });
        }
        
        // Validation améliorée
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = emailInput.value;
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            
            if (isValid) {
                // Animation de succès
                submitBtn.innerHTML = '✓ Inscrit !';
                submitBtn.style.background = 'var(--secondary)';
                
                // Effet de confettis
                createConfetti(submitBtn);
                
                // Reset
                setTimeout(() => {
                    emailInput.value = '';
                    submitBtn.innerHTML = 'S\'inscrire';
                    submitBtn.style.background = '';
                }, 3000);
                
            } else {
                // Animation d'erreur
                emailInput.style.animation = 'shake 0.5s ease-in-out';
                emailInput.style.borderColor = '#ef4444';
                
                setTimeout(() => {
                    emailInput.style.animation = '';
                    emailInput.style.borderColor = '';
                }, 500);
            }
        });
    }
    
    // ========================================
    // PARTICULES FLOTTANTES DANS LE HERO
    // ========================================
    
    function createHeroParticles() {
        if (!hero) return;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'hero-particle';
            particle.style.cssText = `
                position: absolute;
                width: 6px;
                height: 6px;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: floatParticle ${4 + Math.random() * 3}s ease-in-out infinite;
                left: ${Math.random() * 100}%;
                top: ${50 + Math.random() * 40}%;
                animation-delay: ${Math.random() * 2}s;
            `;
            hero.appendChild(particle);
        }
    }
    
    // ========================================
    // FONCTIONS UTILITAIRES
    // ========================================
    
    function createConfetti(element) {
        const rect = element.getBoundingClientRect();
        const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
        
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${rect.left + rect.width/2}px;
                top: ${rect.top + rect.height/2}px;
                animation: confettiExplode 1.5s ease-out forwards;
                transform: translate(${(Math.random() - 0.5) * 200}px, 0);
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 1500);
        }
    }
    
    // ========================================
    // STYLES CSS DYNAMIQUES
    // ========================================
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes floatParticle {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(120deg); }
            66% { transform: translateY(10px) rotate(240deg); }
        }
        
        @keyframes confettiExplode {
            to {
                transform: translate(var(--random-x, 0), 200px) rotate(720deg);
                opacity: 0;
            }
        }
        
        .mission-animate {
            animation: slideInUp 0.8s ease-out forwards;
        }
        
        .stats-counter {
            background: var(--white);
            padding: 3rem 2rem;
            margin: 3rem 0;
            border-radius: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .stats-counter h2 {
            color: var(--primary);
            margin-bottom: 2rem;
            font-size: 2rem;
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
        }
        
        .stat-item {
            padding: 1.5rem;
        }
        
        .stat-number {
            font-size: 3rem;
            font-weight: 700;
            color: var(--primary);
            margin-bottom: 0.5rem;
            transition: all 0.3s ease;
        }
        
        .stat-label {
            color: #666;
            font-weight: 500;
            text-transform: uppercase;
            font-size: 0.9rem;
            letter-spacing: 1px;
        }
        
        /* Initialisation des produits */
        .product {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease;
        }
        
        /* Responsive pour les stats */
        @media (max-width: 768px) {
            .stats-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 1rem;
            }
            
            .stat-number {
                font-size: 2rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ========================================
    // INITIALISATION
    // ========================================
    
    // Créer les particules du hero
    createHeroParticles();
    
    // Initialiser les statistiques
    animateNumbers();
    
    console.log('🏠 JavaScript spécifique Accueil chargé avec succès !');
});