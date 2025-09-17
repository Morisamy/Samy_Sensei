document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.project-slider');
    const prevBtn = document.querySelector('.slider-button.prev');
    const nextBtn = document.querySelector('.slider-button.next');
    
    // Smooth scroll function for the slider
    const scrollSlider = (direction) => {
        const scrollAmount = slider.offsetWidth / 2;
        if (direction === 'next') {
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
    };

    nextBtn.addEventListener('click', () => {
        scrollSlider('next');
    });

    prevBtn.addEventListener('click', () => {
        scrollSlider('prev');
    });
});