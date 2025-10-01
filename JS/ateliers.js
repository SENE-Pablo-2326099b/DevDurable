document.addEventListener('DOMContentLoaded', function() {
    // Filtrage des ateliers
    const filterButtons = document.querySelectorAll('.filter-atelier');
    const atelierCards = document.querySelectorAll('.atelier-card');
    
    function filterAteliers(type) {
        atelierCards.forEach(card => {
            if (type === 'all' || card.dataset.type === type) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterAteliers(this.dataset.type);
        });
    });
    
    // Filtrage initial
    filterAteliers('all');
});