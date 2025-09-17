document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.project-slider');
    const prevBtn = document.querySelector('.slider-button.prev');
    const nextBtn = document.querySelector('.slider-button.next');
    
    // Get the exact width of one project card, including the gap
    // This makes sure the slider moves one card at a time
    const projectCard = document.querySelector('.project');
    const style = getComputedStyle(projectCard);
    const cardWidth = projectCard.offsetWidth + parseInt(style.marginLeft) + parseInt(style.marginRight);
    
    // The number of visible cards in the slider container
    const visibleCards = Math.floor(slider.offsetWidth / cardWidth);

    nextBtn.addEventListener('click', () => {
        // Scroll forward by the width of one card
        slider.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        // Scroll backward by the width of one card
        slider.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });
});