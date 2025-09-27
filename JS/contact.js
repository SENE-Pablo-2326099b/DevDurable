// ========================================
// JAVASCRIPT SPÉCIFIQUE POUR LA PAGE CONTACT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // ANIMATIONS AU SCROLL
    // ========================================
    
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
    document.querySelectorAll(`
        .contact-info,
        .contact-form,
        .horaires,
        .service-card,
        .info-item
    `).forEach(el => {
        animationObserver.observe(el);
    });
    
    // ========================================
    // GESTION AVANCÉE DU FORMULAIRE
    // ========================================
    
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        // Validation en temps réel améliorée
        inputs.forEach(input => {
            // Animation au focus
            input.addEventListener('focus', function() {
                this.style.transform = 'translateY(-3px) scale(1.02)';
                this.style.boxShadow = '0 10px 25px rgba(46, 125, 50, 0.15)';
                
                // Animation du label
                const label = this.previousElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.style.transform = 'translateY(-2px)';
                    label.style.color = 'var(--primary)';
                }
            });
            
            input.addEventListener('blur', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
                
                const label = this.previousElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.style.transform = '';
                    label.style.color = '';
                }
                
                // Validation
                validateField(this);
            });
            
            // Validation pendant la saisie
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
                
                // Compteur de caractères pour textarea
                if (this.tagName === 'TEXTAREA') {
                    updateCharacterCount(this);
                }
            });
        });
        
        // Fonction de validation améliorée
        function validateField(field) {
            const value = field.value.trim();
            let isValid = true;
            let errorMessage = '';
            
            // Validation selon le type et nom du champ
            if (field.type === 'email') {
                isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                errorMessage = 'Adresse email invalide';
            } else if (field.type === 'tel') {
                isValid = /^[\d\s\-\+\(\)]+$/.test(value) && value.length >= 10;
                errorMessage = 'Numéro de téléphone invalide (min 10 chiffres)';
            } else if (field.name === 'nom') {
                isValid = value.length >= 2;
                errorMessage = 'Le nom doit contenir au moins 2 caractères';
            } else if (field.name === 'prenom') {
                isValid = value.length >= 2;
                errorMessage = 'Le prénom doit contenir au moins 2 caractères';
            } else if (field.tagName === 'TEXTAREA') {
                isValid = value.length >= 10;
                errorMessage = 'Le message doit contenir au moins 10 caractères';
            } else if (field.required) {
                isValid = value.length > 0;
                errorMessage = 'Ce champ est obligatoire';
            }
            
            // Mise à jour visuelle
            removeFieldError(field);
            
            if (isValid) {
                field.classList.remove('error');
                field.classList.add('success');
            } else {
                field.classList.add('error');
                field.classList.remove('success');
                showFieldError(field, errorMessage);
            }
            
            return isValid;
        }
        
        // Afficher les erreurs de champ
        function showFieldError(field, message) {
            let errorDiv = field.parentNode.querySelector('.field-error');
            if (!errorDiv) {
                errorDiv = document.createElement('div');
                errorDiv.className = 'field-error';
                field.parentNode.appendChild(errorDiv);
            }
            errorDiv.textContent = message;
            errorDiv.style.animation = 'slideInDown 0.3s ease-out';
        }
        
        function removeFieldError(field) {
            const errorDiv = field.parentNode.querySelector('.field-error');
            if (errorDiv) {
                errorDiv.remove();
            }
        }
        
        // Compteur de caractères pour textarea
        function updateCharacterCount(textarea) {
            let counter = textarea.parentNode.querySelector('.char-counter');
            if (!counter) {
                counter = document.createElement('div');
                counter.className = 'char-counter';
                textarea.parentNode.appendChild(counter);
            }
            
            const current = textarea.value.length;
            const max = textarea.maxLength || 500;
            counter.textContent = `${current}/${max}`;
            
            if (current > max * 0.9) {
                counter.style.color = '#ef4444';
            } else {
                counter.style.color = '#666';
            }
        }
        
        // Soumission du formulaire avec animation
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let formValid = true;
            const invalidFields = [];
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    formValid = false;
                    invalidFields.push(input);
                }
            });
            
            if (formValid) {
                // Animation de succès
                submitBtn.innerHTML = '✓ Message envoyé !';
                submitBtn.style.background = 'var(--secondary)';
                submitBtn.style.transform = 'scale(1.05)';
                submitBtn.disabled = true;
                
                // Effet de succès sur tout le formulaire
                contactForm.style.background = 'linear-gradient(135deg, #f0fdf4, #dcfce7)';
                
                // Particules de succès
                createSuccessParticles();
                
                // Simulation d'envoi
                setTimeout(() => {
                    // Réinitialiser le formulaire
                    this.reset();
                    submitBtn.innerHTML = 'Envoyer le message';
                    submitBtn.style.background = '';
                    submitBtn.style.transform = '';
                    submitBtn.disabled = false;
                    contactForm.style.background = '';
                    
                    // Nettoyer les classes de validation
                    inputs.forEach(input => {
                        input.classList.remove('success', 'error');
                        removeFieldError(input);
                    });
                }, 4000);
                
            } else {
                // Animation d'erreur
                contactForm.style.animation = 'shake 0.6s ease-in-out';
                
                setTimeout(() => {
                    contactForm.style.animation = '';
                }, 600);
                
                // Focus sur le premier champ en erreur
                if (invalidFields.length > 0) {
                    invalidFields[0].focus();
                    invalidFields[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
    
    // ========================================
    // EFFETS INTERACTIFS SUR LES CARTES
    // ========================================
    
    // Animation des éléments d'information
    document.querySelectorAll('.info-item').forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.info-icon');
            
            this.style.transform = 'translateX(10px) scale(1.02)';
            this.style.background = 'linear-gradient(135deg, var(--neutral), var(--white))';
            this.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
            
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.background = 'var(--primary)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.info-icon');
            
            this.style.transform = '';
            this.style.background = '';
            this.style.boxShadow = '';
            
            if (icon) {
                icon.style.transform = '';
                icon.style.background = '';
            }
        });
    });
    
    // Animation des cartes de service
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.service-icon');
            
            this.style.transform = 'translateY(-12px) rotateY(5deg)';
            
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(360deg)';
                icon.style.background = 'linear-gradient(45deg, var(--primary), var(--secondary))';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.service-icon');
            
            this.style.transform = '';
            
            if (icon) {
                icon.style.transform = '';
                icon.style.background = '';
            }
        });
    });
    
    // ========================================
    // HORAIRES INTERACTIFS
    // ========================================
    
    // Mise en évidence de l'horaire actuel
    function highlightCurrentTime() {
        const now = new Date();
        const currentDay = now.getDay(); // 0 = dimanche, 1 = lundi, etc.
        const currentHour = now.getHours();
        
        const dayNames = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
        const today = dayNames[currentDay];
        
        document.querySelectorAll('.horaire-item').forEach(item => {
            const dayElement = item.querySelector('.jour');
            if (dayElement && dayElement.textContent.toLowerCase().includes(today)) {
                item.style.background = 'var(--accent)';
                item.style.color = 'var(--white)';
                item.style.fontWeight = '600';
                item.style.transform = 'scale(1.05)';
                item.style.borderRadius = '8px';
            }
        });
    }
    
    // ========================================
    // CARTE INTERACTIVE (simulation)
    // ========================================
    
    // Ajouter une carte interactive simulée
    const contactInfo = document.querySelector('.contact-info');
    if (contactInfo) {
        const mapHTML = `
            <div class="interactive-map">
                <div class="map-placeholder">
                    <div class="map-pin">📍</div>
                    <p>A définir<br>13120 Gardanne</p>
                    <button class="map-btn" onclick="openMaps()">Ouvrir dans Maps</button>
                </div>
            </div>
        `;
        
        contactInfo.insertAdjacentHTML('beforeend', mapHTML);
        
        // Animation de la pin
        const mapPin = document.querySelector('.map-pin');
        if (mapPin) {
            setInterval(() => {
                mapPin.style.animation = 'bounce 1s ease-in-out';
                setTimeout(() => {
                    mapPin.style.animation = '';
                }, 1000);
            }, 3000);
        }
    }
    
    // ========================================
    // FONCTIONS UTILITAIRES
    // ========================================
    
    function createSuccessParticles() {
        const colors = ['var(--primary)', 'var(--secondary)', 'var(--accent)'];
        
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: 50%;
                top: 50%;
                animation: particleExplode 2s ease-out forwards;
                transform: translate(${(Math.random() - 0.5) * 300}px, 0);
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 2000);
        }
    }
    
    // Fonction globale pour ouvrir Maps
    window.openMaps = function() {
        window.open('https://www.google.fr/maps/place/13120+Gardanne/@43.4585656,5.4444691,13z/data=!3m1!4b1!4m6!3m5!1s0x12c9917b2992420d:0x40819a5fd970300!8m2!3d43.4525982!4d5.4717363!16s%2Fm%2F02r1_hd?entry=ttu&g_ep=EgoyMDI1MDkyNC4wIKXMDSoASAFQAw%3D%3D', '_blank');
    };
    
    // ========================================
    // STYLES CSS DYNAMIQUES
    // ========================================
    
    const style = document.createElement('style');
    style.textContent = `
        .animate-reveal {
            animation: slideInUp 0.8s ease-out forwards;
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
        
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes particleExplode {
            to {
                transform: translate(var(--random-x, 0), 150px) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        /* Styles pour les erreurs de champ */
        .field-error {
            color: #ef4444;
            font-size: 0.85rem;
            margin-top: 0.25rem;
            padding: 0.25rem 0.5rem;
            background: rgba(239, 68, 68, 0.1);
            border-radius: 6px;
            border-left: 3px solid #ef4444;
        }
        
        .char-counter {
            text-align: right;
            font-size: 0.8rem;
            color: #666;
            margin-top: 0.25rem;
        }
        
        /* Styles pour la carte interactive */
        .interactive-map {
            margin-top: 2rem;
            padding: 1.5rem;
            background: linear-gradient(135deg, var(--neutral), var(--warm));
            border-radius: 16px;
            text-align: center;
            border: 2px solid var(--accent);
        }
        
        .map-placeholder {
            padding: 2rem;
            background: var(--white);
            border-radius: 12px;
            position: relative;
        }
        
        .map-pin {
            font-size: 2rem;
            margin-bottom: 1rem;
            display: inline-block;
        }
        
        .map-btn {
            background: var(--primary);
            color: var(--white);
            border: none;
            padding: 0.8rem 1.5rem;
            border-radius: var(--btn-radius);
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 1rem;
        }
        
        .map-btn:hover {
            background: var(--secondary);
            transform: translateY(-2px);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .interactive-map {
                margin-top: 1rem;
                padding: 1rem;
            }
            
            .map-placeholder {
                padding: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ========================================
    // INITIALISATION
    // ========================================
    
    // Mettre en évidence l'horaire actuel
    highlightCurrentTime();
    
    // Ajouter maxLength aux textareas si pas présent
    document.querySelectorAll('textarea').forEach(textarea => {
        if (!textarea.maxLength) {
            textarea.maxLength = 500;
        }
        updateCharacterCount(textarea);
    });
    
    console.log('📞 JavaScript spécifique Contact chargé avec succès !');
});