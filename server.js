const WebSocket = require('ws')

const server = new WebSocket.Server({ port: 3000 })

let messages = [] // Массив для хранения сообщений

server.on('connection', socket => {
	console.log('Новый пользователь подключился')

	// Отправляем историю сообщений при подключении
	socket.send(JSON.stringify({ type: 'history', messages }))

	socket.on('message', message => {
		console.log('Сообщение:', message)

		const data = JSON.parse(message)
		if (data.type === 'message') {
			messages.push(data) // Сохраняем сообщение в истории

			// Отправляем сообщение всем пользователям
			server.clients.forEach(client => {
				if (client.readyState === WebSocket.OPEN) {
					client.send(JSON.stringify(data))
				}
			})
		}
	})

	socket.on('close', () => {
		console.log('Пользователь отключился')
	})
})

console.log('Сервер запущен на порту 3000')
