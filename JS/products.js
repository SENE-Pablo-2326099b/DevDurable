document.addEventListener('DOMContentLoaded', function() {
    const besoinCards = document.querySelectorAll('.besoin-card');
    const productCards = document.querySelectorAll('.product-card');
    const specialButtons = document.querySelectorAll('.filter-special');
    let activeCategory = 'all';
    const activeSpecials = new Set();

    function filterProducts() {
        productCards.forEach(product => {
            const productCategory = product.dataset.category;
            const productTags = (product.dataset.tags || '').split(/\s+/).filter(Boolean);
            let specialsMatch = true;
            if (activeSpecials.size > 0) {
                for (const s of activeSpecials) {
                    if (!productTags.includes(s)) {
                        specialsMatch = false;
                        break;
                    }
                }
            }

            if (activeCategory === 'all' || productCategory === activeCategory) {
                if (specialsMatch) {
                    product.style.display = 'block';
                } else {
                    product.style.display = 'none';
                }
            } else {
                product.style.display = 'none';
            }
        });
    }

    besoinCards.forEach(card => {
        card.addEventListener('click', function() {
            besoinCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            activeCategory = this.dataset.category;
            filterProducts();
        });
    });

    // Le JS pour les boutons de filitreages
    specialButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const tag = this.dataset.filter;
            if (!tag) return;

            if (activeSpecials.has(tag)) {
                activeSpecials.delete(tag);
                this.classList.remove('active');
            } else {
                activeSpecials.add(tag);
                this.classList.add('active');
            }
            filterProducts();
        });
    });

    filterProducts();

    const modal = document.getElementById('reserveModal');
    const reserveForm = document.getElementById('reserveForm');
    const reserveProductName = document.getElementById('reserveProductName');
    const reserveProductInput = document.getElementById('reserveProductInput');

    function openModal(productName) {
        if (!modal) return;
        reserveProductName.textContent = productName || '';
        reserveProductInput.value = productName || '';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!modal) return;
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        reserveForm.reset();
    }

    document.querySelectorAll('.btn--details').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const card = this.closest('.product-card');
            const title = card ? card.querySelector('.product-title')?.textContent.trim() : '';
            openModal(title);
        });
    });

    modal?.querySelectorAll('[data-close], .modal-close').forEach(el => {
        el.addEventListener('click', function() { closeModal(); });
    });

    reserveForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = reserveForm.elements['name'].value;
        const email = reserveForm.elements['email'].value;
        const product = reserveForm.elements['product'].value;
        if (!name || !email) {
            alert('Merci de renseigner votre nom et votre email.');
            return;
        }
        alert(`Réservation reçue pour "${product}". Merci ${name} — nous vous contacterons par ${email}.`);
        closeModal();
    });
});