document.getElementById('scroll-down').addEventListener('click', function () {
	window.scrollBy({
		top: window.innerHeight, // Прокрутка на 1 экран вниз
		behavior: 'smooth',
	})
})
