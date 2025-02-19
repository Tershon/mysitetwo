document.addEventListener('DOMContentLoaded', function () {
	const images = document.querySelectorAll('.thumbnail')
	const fullscreenContainer = document.getElementById('fullscreen-container')
	const fullscreenImg = document.getElementById('fullscreen-img')
	const closeBtn = document.querySelector('.close-btn')

	// Открытие изображения на весь экран
	images.forEach(img => {
		img.addEventListener('click', function () {
			fullscreenImg.src = img.src
			fullscreenContainer.classList.remove('hidden')
		})
	})

	// Закрытие полноэкранного режима
	closeBtn.addEventListener('click', function () {
		fullscreenContainer.classList.add('hidden')
	})

	// Закрытие по клику на фон
	fullscreenContainer.addEventListener('click', function (e) {
		if (e.target === fullscreenContainer) {
			fullscreenContainer.classList.add('hidden')
		}
	})
})
