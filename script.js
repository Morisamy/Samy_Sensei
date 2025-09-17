document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.project-slider');
    const prevBtn = document.querySelector('.slider-button.prev');
    const nextBtn = document.querySelector('.slider-button.next');
    
    // Check if slider elements exist before proceeding
    if (!slider || !prevBtn || !nextBtn) {
        console.warn("Slider elements not found. Skipping slider initialization.");
        return; 
    }

    // Determine the scroll step
    // We need to wait for images to load or ensure CSS has rendered
    // to get accurate width. Using a timeout for robustness.
    setTimeout(() => {
        const projectCard = document.querySelector('.project');
        if (!projectCard) {
            console.warn("No project cards found in the slider. Cannot calculate scroll step.");
            return;
        }
        
        // Get the computed style to accurately include margin/gap
        const style = getComputedStyle(projectCard);
        // Note: CSS 'gap' is tricky to get dynamically via JS.
        // It's safer to define a variable in JS that matches the CSS gap.
        const gap = 25; // This MUST match the 'gap' value in your CSS for .project-slider
        const scrollStep = projectCard.offsetWidth + gap;

        nextBtn.addEventListener('click', () => {
            slider.scrollLeft += scrollStep;
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollLeft -= scrollStep;
        });
    }, 100); // Small delay to ensure all assets/styles are loaded
});