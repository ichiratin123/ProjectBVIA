function changeSlide(sliderIndex, direction) {
    const sliderWrapper = document.querySelector(`.slider-wrapperP[data-slider-index="${sliderIndex}"]`);
    const slides = sliderWrapper.querySelectorAll('.slider-itemP');
    let currentIndex = Array.from(slides).findIndex(slide => slide.style.display !== 'none');
    slides[currentIndex].style.display = 'none';
    if (direction === 1) {
        currentIndex = (currentIndex + 1) % slides.length;
    } else {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }
    slides[currentIndex].style.display = 'block';
}
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider-wrapperP');
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slider-itemP');
        slides.forEach((slide, index) => {
            slide.style.display = index === 0 ? 'block' : 'none';
        });
    });
});

let count = 0;
var text = document.querySelector('#product-count');
var productCount = document.querySelectorAll('.product-card').length;
text.textContent = productCount;