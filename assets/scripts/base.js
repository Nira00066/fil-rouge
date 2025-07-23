// Vendors
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

const productsSlider = document.querySelectorAll('.swiper');
for( let i=0; i < productsSlider.length; i++ ) {

	productsSlider[i].classList.add('slider-' + i);

	let slider = new Swiper('.slider-' + i, {
		modules: [Navigation, Pagination],
		breakpoints: {
			340: {
				slidesPerGroup: 1,
				slidesPerView: 1.5,
				spaceBetween: 4,
			},
			700: {
				// slidesPerGroup: 2,
				slidesPerView: 2.5,
			},
			1000: {
				// slidesPerGroup: 3,
				slidesPerView: 3,
			},
			1800: {
				// slidesPerGroup: 4,
				slidesPerView: 4,
			},
		},
		// freeMode: true,
		spaceBetween: 8,
		slidesPerView: 1,
		centeredSlidesBounds: false,
		centeredSlides: false,
		centerInsufficientSlides: false,
		grabCursor: true,
		watchSlidesProgress: true,
		lazy: {
			loadPrevNext: true,
		},
		navigation: {
			prevEl: '.slider' + i + ' .swiper-button-prev',
			nextEl: '.slider-' + i + ' .swiper-button-next',
		},
	});
}

import './components/Mainmenu.js';
import './action/event.js'
