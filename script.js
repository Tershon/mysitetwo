document
	.getElementById('resumeForm')
	.addEventListener('submit', function (event) {
		event.preventDefault()

		const photoInput = document.getElementById('photo')
		if (photoInput.files.length > 0) {
			const reader = new FileReader()
			reader.onload = function (e) {
				const img = document.getElementById('outputPhoto')
				img.src = e.target.result
				img.classList.remove('hidden')
			}
			reader.readAsDataURL(photoInput.files[0])
		} else {
			document.getElementById('outputPhoto').classList.add('hidden')
		}

		// Заполнение данных в блоке вывода
		document.getElementById('outputName').textContent =
			document.getElementById('name').value || 'Не указано'
		document.getElementById('outputEmail').textContent =
			document.getElementById('email').value || 'Не указано'
		document.getElementById('outputPhone').textContent =
			document.getElementById('phone').value || 'Не указано'
		document.getElementById('outputAddress').textContent =
			document.getElementById('address').value || 'Не указано'
		document.getElementById('outputBirthdate').textContent =
			document.getElementById('birthdate').value || 'Не указано'
		document.getElementById('outputAbout').textContent =
			document.getElementById('about').value || 'Не указано'
		document.getElementById('outputEducation').textContent =
			document.getElementById('education').value || 'Не указано'
		document.getElementById('outputSkills').textContent =
			document.getElementById('skills').value || 'Не указано'
		document.getElementById('outputExperience').textContent =
			document.getElementById('experience').value || 'Не указано'
		document.getElementById('outputCertificates').textContent =
			document.getElementById('certificates').value || 'Не указано'
		document.getElementById('outputLanguages').textContent =
			document.getElementById('languages').value || 'Не указано'
		document.getElementById('outputHobbies').textContent =
			document.getElementById('hobbies').value || 'Не указано'

		let linkedin = document.getElementById('linkedin').value
		if (linkedin) {
			document.getElementById('outputLinkedin').textContent = linkedin
			document.getElementById('outputLinkedin').href = linkedin
		} else {
			document.getElementById('outputLinkedin').parentElement.style.display =
				'none'
		}

		document.getElementById('resumeOutput').classList.remove('hidden')
	})

document.getElementById('downloadBtn').addEventListener('click', function () {
	const downloadBtn = document.getElementById('downloadBtn')
	downloadBtn.style.display = 'none'
})

document.getElementById('downloadBtn').addEventListener('click', function () {
	// Скрываем кнопку перед созданием PDF
	const downloadBtn = document.getElementById('downloadBtn')
	downloadBtn.style.display = 'none'

	try {
		// Генерация PDF
		html2pdf(document.getElementById('resumeOutput'))
		console.log('PDF успешно создан')
	} catch (error) {
		console.error('Ошибка при создании PDF:', error)
		alert('Произошла ошибка при создании PDF.')
	}

	downloadBtn.style.display = 'block'
})

document.addEventListener('DOMContentLoaded', function () {
	document
		.getElementById('createWordBtn')
		.addEventListener('click', function () {
			alert('Кнопка нажата!')
		})
})

document
	.getElementById('downloadDocxBtn')
	.addEventListener('click', function () {
		// Создание документа Word
		const doc = new docx.Document({
			sections: [
				{
					properties: {},
					children: [
						new docx.Paragraph({
							children: [
								new docx.TextRun(
									'ФИО: ' +
										(document.getElementById('name').value || 'Не указано')
								),
							],
						}),
						new docx.Paragraph({
							children: [
								new docx.TextRun(
									'Email: ' +
										(document.getElementById('email').value || 'Не указано')
								),
							],
						}),
						// Добавить остальные параграфы для других данных
					],
				},
			],
		})

		// Скачивание файла
		docx.Packer.toBlob(doc)
			.then(blob => {
				window.saveAs(blob, 'resume.docx')
				console.log('DOCX файл успешно создан.')
			})
			.catch(error => {
				console.error('Ошибка при создании DOCX:', error)
				alert('Произошла ошибка при создании DOCX.')
			})

		console.log(doc)
	})

// Обработчик для кнопки "Чистые бланки резюме"
document
	.getElementById('blankResumeBtn')
	.addEventListener('click', function () {
		// Путь к бланкам
		const blankFiles = [
			{ name: 'blank1.docx', label: 'Бланк 1' },
			{ name: 'blank2.docx', label: 'Бланк 2' },
			{ name: 'blank3.pdf', label: 'Бланк 3' },
		]

		const fileList = document.createElement('ul')
		blankFiles.forEach(file => {
			const listItem = document.createElement('li')
			const downloadLink = document.createElement('a')
			downloadLink.href = `/assets/blanks/${file.name}` // Путь к шаблонам
			downloadLink.download = file.name
			downloadLink.textContent = file.label

			listItem.appendChild(downloadLink)
			fileList.appendChild(listItem)
		})

		const blankContainer = document.getElementById('blankContainer')
		blankContainer.innerHTML = '' // Очистка контейнера
		blankContainer.appendChild(fileList)
	})
