document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.project-slider');
    const prevBtn = document.querySelector('.slider-button.prev');
    const nextBtn = document.querySelector('.slider-button.next');
    
    // Check if the slider element exists on the page
    if (!slider || !prevBtn || !nextBtn) {
        return; // Exit if the elements are not found
    }

    // Get the exact width of a single project card, including its gap
    const projectCard = document.querySelector('.project');
    const gap = 25; // This value must match the 'gap' in your CSS
    const cardWidth = projectCard.offsetWidth + gap;

    nextBtn.addEventListener('click', () => {
        // Move the slider to the left by the width of one card
        slider.scrollLeft += cardWidth;
    });

    prevBtn.addEventListener('click', () => {
        // Move the slider to the right by the width of one card
        slider.scrollLeft -= cardWidth;
    });
});