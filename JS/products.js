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

            // Toggle active state
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
});