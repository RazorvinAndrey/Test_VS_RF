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

})(jQuery);

// КАЛЬКУЛЯТОР ЗАКАЗА
// Элементы формы
const squareInput = document.querySelector('#square-input');
const squareRange = document.querySelector('#square-range');
const inputs = document.querySelectorAll('input');
const win_input = document.querySelector('#win-input');

// Радиокнопки
const radioType = document.querySelectorAll('input[name="type"]');
const kuhni_kol = document.querySelectorAll('input[name="kuhni_kol"]');
const vannie_kol = document.querySelectorAll('input[name="vannie_kol"]');

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
	let totalPrice = 0;

	for (const radio of radioType) {
		if (radio.checked) {
			totalPrice = parseInt(squareInput.value) * parseFloat(radio.value); // 300 000 * 1.2
			if (radio.value != 90) {

				for (const radio of kuhni_kol) {
					radio.disabled = true;
					radio.checked = false;
				}
				for (const radio of vannie_kol) {
					radio.disabled = true;
					radio.checked = false;
				}
			} else {

				for (const radio of kuhni_kol) {
					radio.disabled = false;
				}
				for (const radio of vannie_kol) {
					radio.disabled = false;
				}
			}
		}
	}

	for (const radio of vannie_kol) {
		if (radio.checked) {
			totalPrice = totalPrice + 2900 * parseFloat(radio.value);
		}
	}
	for (const radio of kuhni_kol) {
		if (radio.checked) {
			totalPrice = totalPrice + 4900 * parseFloat(radio.value);
		}
	}

	if (win_input.value > 0) {
		totalPrice = totalPrice + win_input.value * 300
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
