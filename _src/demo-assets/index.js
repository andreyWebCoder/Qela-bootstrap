// < !-- ============copy class icon=============== -->
let icons = document.querySelector(".--icons");

if (icons) {
	icons.addEventListener('click', (event) => {
		const classIcon = event.target.className;
		navigator.clipboard.writeText(classIcon).then(() => {
			showToast(`Скопировано: ${classIcon}`);
		}).catch(err => {
			console.error('Ошибка копирования:', err);
		});
	});
}
// Функция уведомления
function showToast(message) {
	// 1. Ищем по ID, это надежнее, чтобы не плодить элементы
	let toast = document.getElementById('main-toast');

	if (!toast) {
		toast = document.createElement('div');
		toast.id = 'main-toast';
		// Добавляем класс '--toast-custom' для управления видимостью
		toast.className = '--toast-custom position-fixed p-2 bg-success-300 text-success-900 rounded-3 shadow-sm';
		document.body.appendChild(toast);
	}

	// 2. Полностью перезаписываем текст, чтобы старый не оставался
	toast.textContent = message;

	// 3. Показываем
	toast.classList.add('visible');

	// 4. Сбрасываем старый таймер, если он был
	clearTimeout(toast.timer);

	toast.timer = setTimeout(() => {
		toast.classList.remove('visible');
	}, 2000);
}
// < !-- ============copy class icon=============== -->