const mobileNavButton = document.querySelector('.mobile-nav-btn');
const mobileNav = document.querySelector('.mobile-nav');
const navIcon = document.querySelector('.nav-icon');

mobileNavButton.addEventListener('click', () => {
	const isOpen = mobileNav.classList.toggle('mobile-nav--open');
	navIcon.classList.toggle('nav-icon--active', isOpen);
	document.body.classList.toggle('no-scroll', isOpen);
	mobileNavButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.mobile-nav a').forEach((link) => {
	link.addEventListener('click', () => {
		mobileNav.classList.remove('mobile-nav--open');
		navIcon.classList.remove('nav-icon--active');
		document.body.classList.remove('no-scroll');
		mobileNavButton.setAttribute('aria-expanded', 'false');
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const planLabel = document.querySelector('#booking-plan');

	// Кнопка выбранной карточки ведёт на форму бронирования,
	// остальные предлагают выбрать свой тариф
	const setSelectedButton = (card) => {
		const button = card.querySelector('.price__button');
		if (!button) return;
		if (card.classList.contains('active')) {
			button.textContent = 'Book Now';
			button.href = '#booking';
			button.classList.add('price__button--selected');
		} else {
			button.textContent = 'Select This Plan';
			button.href = '#!';
			button.classList.remove('price__button--selected');
		}
	};

	const syncPlanLabel = (card) => {
		if (!planLabel) return;
		const plan = card
			.querySelector('.price__card-title')
			?.textContent.trim();
		const price = card
			.querySelector('.price__card-text .number')
			?.textContent.trim();
		planLabel.textContent = `${plan} — $${price} per hour`;
	};

	const currentCard = document.querySelector('.price__card.active');
	if (currentCard) syncPlanLabel(currentCard);

	document.querySelectorAll('.price__button').forEach((button) => {
		button.addEventListener('click', (event) => {
			const card = button.closest('.price__card');
			// Клик по кнопке уже выбранной карточки не перехватываем:
			// она ведёт на форму бронирования
			if (!card || card.classList.contains('active')) return;

			event.preventDefault();

			const previousCard = document.querySelector(
				'.price__card.active',
			);

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

			// Кнопка выбранной карточки показывает действие,
			// остальные возвращаются к предложению выбора
			if (previousCard) setSelectedButton(previousCard);
			setSelectedButton(card);
			syncPlanLabel(card);

			// Выбранная карточка доезжает до центра: она всегда видна
			// целиком, по краям остаются только неактивные соседи
			if (pricingSlider) {
				const slides = Array.from(card.parentElement.children);
				pricingSlider.slideTo(slides.indexOf(card));
			}
		});
	});

	// Демо-форма: ничего не отправляет и не хранит, только
	// показывает подтверждение
	const bookingForm = document.querySelector('.booking__form');
	const bookingSuccess = document.querySelector('.booking__success');

	bookingForm?.addEventListener('submit', (event) => {
		event.preventDefault();

		if (!bookingForm.checkValidity()) {
			bookingForm.reportValidity();
			return;
		}

		bookingForm.hidden = true;
		bookingSuccess.hidden = false;
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
			// Чуть больше одного слайда: края соседних карточек с ценами
			// остаются видны, не нужно держать цифры в памяти при свайпе
			320: { slidesPerView: 1.25, spaceBetween: 20 },
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
	'.booking__wrapper',
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
