document.addEventListener('DOMContentLoaded', () => {
    // Animated Counter
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the number, the faster the counter

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });

    // Project Slider
    const slider = document.querySelector('.project-slider');
    const prevBtn = document.querySelector('.slider-button.prev');
    const nextBtn = document.querySelector('.slider-button.next');
    const projectWidth = document.querySelector('.project').offsetWidth + 20; // width + gap
    let currentIndex = 0;

    nextBtn.addEventListener('click', () => {
        const totalProjects = slider.children.length;
        if (currentIndex < totalProjects - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to the start
        }
        slider.style.transform = `translateX(-${currentIndex * projectWidth}px)`;
    });

    prevBtn.addEventListener('click', () => {
        const totalProjects = slider.children.length;
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalProjects - 1; // Loop to the end
        }
        slider.style.transform = `translateX(-${currentIndex * projectWidth}px)`;
    });
});