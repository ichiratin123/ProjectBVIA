const slider = document.querySelector('.slider');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const silderitem = document.querySelectorAll('.slider-item');

let scrollPosition = 0;

leftBtn.addEventListener('click', () => {
    scrollPosition -= 140;
    if (scrollPosition < 0) {
        scrollPosition = 0;
    }
    slider.style.transform = `translateX(-${scrollPosition}px)`;
});
rightBtn.addEventListener('click', () => {
    const maxScroll = slider.scrollWidth - slider.parentElement.offsetWidth;
    scrollPosition += 140;
    if (scrollPosition > maxScroll) {
        scrollPosition = maxScroll;
    }
    slider.style.transform = `translateX(-${scrollPosition}px)`;
});

document.addEventListener('DOMContentLoaded', () => {
    const firstItem = document.querySelector('.slider-item');
    if (firstItem) {
        firstItem.classList.add('active');
    }
    document.querySelectorAll('.slider-item a').forEach(item => {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            document.querySelectorAll('.slider-item').forEach(i => i.classList.remove('active'));
            this.parentElement.classList.add('active');
        });
    });
});

