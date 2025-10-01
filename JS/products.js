document.addEventListener('DOMContentLoaded', function() {
    const besoinCards = document.querySelectorAll('.besoin-card');
    const productCards = document.querySelectorAll('.product-card');
    let activeCategory = 'all';

    function filterProducts() {
        productCards.forEach(product => {
            const productCategory = product.dataset.category;
            if (activeCategory === 'all' || productCategory === activeCategory) {
                product.style.display = 'block';
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

    filterProducts();
});