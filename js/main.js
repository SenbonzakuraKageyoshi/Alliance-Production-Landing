window.addEventListener('DOMContentLoaded', () => {
    let counter = 0;

    const advantagesPrevBtn = document.querySelector('.advantages__button.prev');
    const advantagesNextBtn = document.querySelector('.advantages__button.next');
    const advantagesList = document.querySelector('.advantages__list');    

    const swipeAdvantegesNext = () => {
        const containerWidth = document.querySelector('.advantages__list').clientWidth;
        const advantageWidth = document.querySelector('.advantages__list-item').clientWidth;
        const visibleAdvantagesNumber = Math.round(containerWidth / advantageWidth);
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

    const thresholdValue = window.innerWidth > 1340 ? 0.4 : 0.2;

    console.log(thresholdValue)

    const options = {
        rootMargin: '0px',
        threshold: thresholdValue
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

    const sectionProductionAnim = function(entries, observer) {
        entries.forEach((entry) => {

            const { target, isIntersecting } = entry;

            if(isIntersecting){
                target.classList.add('visible')

                setTimeout(() => {
                    document.querySelectorAll('.production__list-item-icon').forEach((item) => {
                        item.classList.add('visible')
                    })
                }, 900)
            }

        });
    };
    
    const observer = new IntersectionObserver( sectionTopAnim, options );
    const observer2 = new IntersectionObserver( sectionAnim, options );
    const observer3 = new IntersectionObserver( sectionProductionAnim, options );
    
    const sectionTop = document.querySelector('.section-top');
    const sectionSchema = document.querySelector('.section-schema');
    const sectionProducts = document.querySelector('.section-products');
    const sectionRelation = document.querySelector('.section-relation');
    const sectionProduction = document.querySelector('.section-production');

    observer.observe(sectionTop);   
    observer2.observe(sectionSchema);
    observer2.observe(sectionProducts); 
    observer2.observe(sectionRelation); 
    observer3.observe(sectionProduction);

    const openMenuBtn = document.querySelector('.menu-btn.open');
    const closeMenuBtn = document.querySelector('.menu-btn.close');

    openMenuBtn.addEventListener('click', () => {
        document.querySelector('.header').classList.add('active')
    });

    closeMenuBtn.addEventListener('click', () => {
        document.querySelector('.header').classList.remove('active')
    });

    const scrollToSection = ({ target }) => {
        const sectionName = target.getAttribute('data-to');
        document.querySelector(`.${sectionName}`).scrollIntoView({behavior: 'smooth'});
        
        if(document.querySelector('.header.active')){
            document.querySelector('.header.active').classList.remove('active');
        }
    }

    document.querySelectorAll('.nav__list-link').forEach((item) => item.addEventListener('click', (e) => scrollToSection(e)))
});
