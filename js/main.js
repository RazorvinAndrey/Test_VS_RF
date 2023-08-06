(function ($) {
	"use strict";

	// Back to top button
	$(window).scroll(function () {
		if ($(this).scrollTop() > 200) {
			$('.back-to-top').fadeIn('slow');
		} else {
			$('.back-to-top').fadeOut('slow');
		}
	});
	$('.back-to-top').click(function () {
		$('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
		return false;
	});

	$(window).scroll(function () {
		// const pricee = document.querySelector('#total-price');
		// var topic = pricee.top + pageYOffset
		if ($(this).scrollTop() > 200) {
			$('.calc-price').css('position', 'sticky');
		} else {
			$('.calc-price').css('position', 'static');
		}
	});


	// Dropdown on mouse hover
	$(document).ready(function () {
		function toggleNavbarMethod() {
			if ($(window).width() > 992) {
				$('.navbar .dropdown').on('mouseover', function () {
					$('.dropdown-toggle', this).trigger('click');
				}).on('mouseout', function () {
					$('.dropdown-toggle', this).trigger('click').blur();
				});
			} else {
				$('.navbar .dropdown').off('mouseover').off('mouseout');
			}
		}
		toggleNavbarMethod();
		$(window).resize(toggleNavbarMethod);
	});


	// Testimonials carousel
	$(".testimonials-carousel").owlCarousel({
		autoplay: true,
		dots: true,
		loop: true,
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 1
			},
			768: {
				items: 2
			},
			992: {
				items: 3
			}
		}
	});


	// Portfolio isotope and filter
	var portfolioIsotope = $('.portfolio-container').isotope({
		itemSelector: '.portfolio-item',
		layoutMode: 'fitRows'
	});

	$('#portfolio-flters li').on('click', function () {
		$("#portfolio-flters li").removeClass('filter-active');
		$(this).addClass('filter-active');

		portfolioIsotope.isotope({ filter: $(this).data('filter') });
	});

})(jQuery);

// КАЛЬКУЛЯТОР ЗАКАЗА
// Элементы формы
const squareInput = document.querySelector('#square-input');
const squareRange = document.querySelector('#square-range');
const inputs = document.querySelectorAll('input');

// Радиокнопки
const radioType = document.querySelectorAll('input[name="type"]');
const radioBuilding = document.querySelectorAll('input[name="building"]');
const radioRooms = document.querySelectorAll('input[name="rooms"]');

// Чекбоксы
const ceilings = document.querySelector('input[name="ceiling"]');
const walls = document.querySelector('input[name="walls"]');
const floor = document.querySelector('input[name="floor"]');

const basePrice = 6000;
const totalPriceElement = document.querySelector('#total-price');

// Связка range c тектовым полем
// Слушаем событие input
squareRange.addEventListener('input', function () {
	squareInput.value = squareRange.value;
});

// Связка текстового поля с range
squareInput.addEventListener('input', function () {
	squareRange.value = squareInput.value;
});

function calculate() {
	let totalPrice = basePrice * parseInt(squareInput.value); // 300 000

	for (const radio of radioType) {
		if (radio.checked) {
			totalPrice = totalPrice * parseFloat(radio.value); // 300 000 * 1.2
		}
	}

	for (const radio of radioBuilding) {
		if (radio.checked) {
			totalPrice = totalPrice * parseFloat(radio.value); // 360 000 * 1.1 = 390 000
		}
	}

	for (const radio of radioRooms) {
		if (radio.checked) {
			totalPrice = totalPrice * parseFloat(radio.value); // 390 000 * 0.8 = 350 000
		}
	}

	if (ceilings.checked) {
		totalPrice = totalPrice + parseFloat(ceilings.value) * parseInt(squareInput.value);
	}

	if (walls.checked) {
		totalPrice = totalPrice * parseFloat(walls.value); // ---
	}

	if (floor.checked) {
		totalPrice = totalPrice * parseFloat(floor.value); // ---
	}

	const formatter = new Intl.NumberFormat('ru');
	totalPriceElement.innerText = formatter.format(totalPrice);
}

calculate();

for (const input of inputs) {
	input.addEventListener('input', function () {
		calculate();
	});
}

var price = $('.total-price');  // navigation block
var foot = $('.footer');        // may be: navbar.parent();

$(window).scroll(function () {
	var nsc = $(document).scrollTop();
	var bp1 = foot.offset().top;
	var bp2 = bp1 + foot.outerHeight() - $(window).height();

	if (nsc > bp1) { price.css('position', 'fixed'); }
	else { price.css('position', 'absolute'); }
	if (nsc > bp2) { price.css('top', bp2 - nsc); }
	else { price.css('top', '0'); }
});
