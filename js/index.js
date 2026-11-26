const mobileNavButton = document.querySelector('.mobile-nav-btn');
const mobileNav = document.querySelector('.mobile-nav');
const navIcon = document.querySelector('.nav-icon');

mobileNavButton.onclick = () => {
	mobileNav.classList.toggle('mobile-nav--open');
	navIcon.classList.toggle('nav-icon--active');
	document.body.classList.toggle('no-scroll');
};

document.querySelectorAll('.mobile-nav a').forEach((link) => {
	link.addEventListener('click', () => {
		mobileNav.classList.remove('mobile-nav--open');
		navIcon.classList.remove('nav-icon--active');
		document.body.classList.remove('no-scroll');
	});
});

document.addEventListener('DOMContentLoaded', () => {
	document.querySelectorAll('.price__button').forEach((button) => {
		button.addEventListener('click', (event) => {
			event.preventDefault();

			const card = button.closest('.price__card');
			if (!card) return;

			document
				.querySelectorAll('.price__card')
				.forEach((item) => item.classList.remove('active'));
			card.classList.add('active');

			document.querySelectorAll('.price__card').forEach((item) => {
				if (item === card) return;

				item
					.querySelector('.price__card-list')
					?.classList.remove('active');
				item
					.querySelectorAll('.price__card-item')
					.forEach((el) => el.classList.remove('active'));
				item
					.querySelector('.price__card-title')
					?.classList.remove('active');
			});

			card
				.querySelector('.price__card-list')
				?.classList.add('active');
			card
				.querySelectorAll('.price__card-item')
				.forEach((el) => el.classList.add('active'));
			card
				.querySelector('.price__card-title')
				?.classList.add('active');
		});
	});
});

let pricingSlider = null;

const initPricingSlider = () => {
	pricingSlider = new Swiper('.mySwiper', {
		slidesPerView: 3,
		spaceBetween: 30,
		centeredSlides: true,
		initialSlide: 1,
		loop: false,
		breakpoints: {
			890: { slidesPerView: 3 },
			540: { slidesPerView: 2 },
			320: { slidesPerView: 1 },
		},
	});
};

const destroyPricingSlider = () => {
	pricingSlider?.destroy(true, true);
	pricingSlider = null;
};

// Слайдер нужен только когда все три тарифа не влезают на экран:
// три карточки по 360px плюс отступы контейнера занимают 1110px
const pricingMedia = window.matchMedia('(max-width: 1109px)');

const syncPricingSlider = () => {
	if (pricingMedia.matches && !pricingSlider) initPricingSlider();
	if (!pricingMedia.matches && pricingSlider) destroyPricingSlider();
};

syncPricingSlider();
pricingMedia.addEventListener('change', syncPricingSlider);

const revealTargets = [
	'.aboutVR-img',
	'.aboutVR__content',
	'.aboutPC__img',
	'.aboutPC__content',
	'.price__wrapper',
	'.footer__wrapper',
];

const revealElements = revealTargets
	.map((selector) => document.querySelector(selector))
	.filter(Boolean);

revealElements.forEach((element, index) => {
	element.classList.add('reveal');
	if (index % 2 === 1) element.classList.add('reveal--delay');
});

const revealObserver = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			entry.target.classList.add('revealed');
			revealObserver.unobserve(entry.target);
		});
	},
	{ threshold: 0.2 },
);

revealElements.forEach((element) => revealObserver.observe(element));
