import $ from 'jquery';
import 'slick-carousel/slick/slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';

let elemCarouselSlick;
let carouselItems;
const windowBreakpoints = {
  xl: {
    size: 1200,
    slides: 3,
  },
  lg: {
    size: 992,
    slides: 2,
  },
};

const unsetSlick = () => {
  try {
    elemCarouselSlick.slick('unslick');
    elemCarouselSlick.off('beforeChange');
  } catch (err) {
    console.error(err);
  }
};

const setSlick = (nbSlides) => {
  try {
    elemCarouselSlick.slick({
      slidesToShow: nbSlides,
      slidesToScroll: nbSlides,
      centerMode: nbSlides === 3,
      dots: true,
      arrows: true,
      // draggable: false,
      infinite: true,
      // mobileFirst: true,
      // nextArrow: '<button type="button" className="slick-next">Next</button>',
      prevArrow: '<a class="carousel-control-prev" href="#" role="button"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a>',
      // prevArrow: '<button type="button" className="slick-prev">Previous</button>',
      nextArrow: '<a class="carousel-control-next" href="#" role="button"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a>',
      // speed: 3000, // default
      // swpipeToSlide: false, // default
      // zIndex: 1000, // default
      // rtl: true,
    });

    // handling spacing between last and before last item when items is impair number of items in a slideToShow of 2 (lg: 992 - 1200)
    if (nbSlides === windowBreakpoints.lg.slides) {
      elemCarouselSlick.on('beforeChange', (evt, slick, currentSlide, nextSlide) => {
        if (nextSlide === (carouselItems - 1) && (carouselItems % nbSlides !== 0)) {
          // console.log('lastScroll and odd');
          slick.$slides[nextSlide].style.marginRight = 0;
          slick.$slides[nextSlide].style.marginLeft = '0.5rem';
          slick.$slides[nextSlide - 1].style.marginLeft = 0;
          slick.$slides[nextSlide - 1].style.marginRight = '0.5rem';
        } else {
          slick.$slides[7].style.marginRight = '';
          slick.$slides[7].style.marginLeft = '';
          slick.$slides[8].style.marginLeft = '';
          slick.$slides[8].style.marginRight = '';
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const initSlick = (nbItems) => {
  carouselItems = nbItems;
  elemCarouselSlick = $('.carouselSlick');

  if (window.innerWidth >= windowBreakpoints.xl.size) {
    setSlick(windowBreakpoints.xl.slides);
  } else if (window.innerWidth >= windowBreakpoints.lg.size && window.innerWidth < windowBreakpoints.xl.size) {
    setSlick(windowBreakpoints.lg.slides);
  }
};

const slickHandler = () => {
  try {
    if (window.innerWidth >= windowBreakpoints.xl.size) { // > 1200
      if (elemCarouselSlick.slick('getSlick').unslicked) {
        setSlick(windowBreakpoints.xl.slides);
      } else if (elemCarouselSlick.slick('slickGetOption', 'slidesToShow') !== windowBreakpoints.xl.slides) {
        unsetSlick();
        setSlick(windowBreakpoints.xl.slides);
      }
    } else if (window.innerWidth >= windowBreakpoints.lg.size && window.innerWidth < windowBreakpoints.xl.size) {
      if (elemCarouselSlick.slick('getSlick').unslicked) { // 992 - 1200
        setSlick(windowBreakpoints.lg.slides);
      } else if (elemCarouselSlick.slick('slickGetOption', 'slidesToShow') !== windowBreakpoints.lg.slides) {
        unsetSlick();
        setSlick(windowBreakpoints.lg.slides);
      }
    } else if (!elemCarouselSlick.slick('getSlick').unslicked) unsetSlick();
  } catch (err) { // in case when slick object has not been instantiated yet, as with small mobile viewport
    // console.error(err);
    if (window.innerWidth >= windowBreakpoints.xl.size) { // > 1200
      setSlick(windowBreakpoints.xl.slides);
    } else if (window.innerWidth >= windowBreakpoints.lg.size && window.innerWidth < windowBreakpoints.xl.size) { // 992 - 1200
      setSlick(windowBreakpoints.lg.slides);
    }
  }
};

const debounce = (fn, ms) => {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this);
    }, ms);
  };
};

export {
  unsetSlick,
  initSlick,
  slickHandler,
  debounce,
};
