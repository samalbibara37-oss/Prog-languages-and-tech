
document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('#load');
    const userIdInput = document.querySelector('#userId');
    const status = document.querySelector('#status');
    const results = document.querySelector('#results');

    if (!button || !userIdInput || !status || !results) {
        alert('Ошибка: проверьте элементы в index.html');
        return;
    }

    button.addEventListener('click', async () => {
        status.textContent = 'Кнопка нажата! Проверяем данные...';
        results.replaceChildren();

        const id = userIdInput.value.trim();

        if (!id || Number(id) < 1 || Number(id) > 10) {
            status.textContent = 'Введите ID от 1 до 10';
            return;
        }

        button.disabled = true;
        status.textContent = 'Загрузка...';

        try {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/users/' + id
            );

            if (!response.ok) {
                throw new Error('Сервер ответил: ' + response.status);
            }

            const user = await response.json();

            results.innerHTML =
                '<p><b>Имя:</b> ' + user.name + '</p>' +
                '<p><b>Город:</b> ' + user.address.city + '</p>' +
                '<p><b>Компания:</b> ' + user.company.name + '</p>';

            status.textContent = 'Данные успешно загружены!';
        } catch (error) {
            status.textContent =
                'Ошибка: не удалось загрузить данные. Проверьте интернет.';
            console.error(error);
        } finally {
            button.disabled = false;
        }
    });
});
