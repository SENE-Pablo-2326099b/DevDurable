document.addEventListener('DOMContentLoaded', function() {
    // Si besoin, afficher les produits
    const productCards = document.querySelectorAll('.product');
    productCards.forEach(product => {
        product.style.opacity = '1';
        product.style.transform = 'none';
    });
});