window.addEventListener('DOMContentLoaded', () => {

    let counter = 0;

    const advantagesPrevBtn = document.querySelector('.advantages__button.prev');
    const advantagesNextBtn = document.querySelector('.advantages__button.next');
    const advantagesList = document.querySelector('.advantages__list');

    const swipeAdvantegesNext = () => {
        const containerWidth = document.querySelector('.container').clientWidth;
        const advantageWidth = document.querySelector('.advantages__list-item').clientWidth;
        const visibleAdvantagesNumber = Math.round(containerWidth / advantageWidth);
        console.log(visibleAdvantagesNumber)
        if(counter !== 5 - visibleAdvantagesNumber){
            ++counter
            advantagesList.style.transform = `translateX(-${advantageWidth * counter}px)`;
        }
    };

    const swipeAdvantegesPrev = () => {
        const advantageWidth = document.querySelector('.advantages__list-item').clientWidth;
        if(counter !== 5 && counter !== 0){
            --counter
            advantagesList.style.transform = `translateX(-${advantageWidth * counter}px)`;
        }
    };

    advantagesNextBtn.addEventListener('click', () => swipeAdvantegesNext());
    advantagesPrevBtn.addEventListener('click', () => swipeAdvantegesPrev());

    const options = {
        rootMargin: '0px',
        threshold: 0
    };

    const sectionTopAnim = function(entries, observer) {
        entries.forEach((entry) => {

            const { isIntersecting } = entry;

            if(isIntersecting){
                setTimeout(() => {
                    document.querySelectorAll('.advantages__list-item').forEach((item) => {
                        item.classList.add('visible')
                    })
                    document.querySelector('.header').classList.add('visible');
                    document.querySelector('.advantages__buttons').classList.add('visible');
                }, 500)
            }

        });
    };

    const sectionAnim = function(entries, observer) {
        entries.forEach((entry) => {

            const { target, isIntersecting } = entry;

            if(isIntersecting){
                target.classList.add('visible')
            }

        });
    };
    
    const observer = new IntersectionObserver( sectionTopAnim, options );
    const observer2 = new IntersectionObserver( sectionAnim, options );
    
    const sectionTop = document.querySelector('.section-top');
    const sectionSchema = document.querySelector('.section-schema');
    const sectionProducts = document.querySelector('.section-products');

    observer.observe(sectionTop);
    observer2.observe(sectionSchema);
    observer2.observe(sectionProducts);

});
