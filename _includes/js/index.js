// Intersection Observer pour animer les progress bars au scroll
const statCards = document.querySelectorAll('.stat-card-modern');

const observer = new IntersectionObserver((entries, observer) => {
entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
    const card = entry.target;
    const progressBar = card.querySelector('.stat-progress-fill');
    const percentage = card.dataset.percentage || 0;
    
    // Calculer la largeur finale
    let finalWidth = percentage + '%';
    
    // Animation en cascade avec un petit délai selon la position
    setTimeout(() => {
        progressBar.style.width = finalWidth;
    }, index * 150);
    
    // Stop observing après animation
    observer.unobserve(card);
    }
});
}, {
threshold: 0.2, // Déclenche quand 20% de l'élément est visible
rootMargin: '0px 0px -100px 0px' // Déclenche un peu avant d'arriver au bas
});

// Observer chaque carte de stat
statCards.forEach(card => observer.observe(card));