document.addEventListener('DOMContentLoaded', () => {
    const usersContainer = document.querySelector('#users');
    const status = document.querySelector('#status');
    const usersCount = document.querySelector('#usersCount');

    async function loadUsers() {
        try {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/users'
            );

            if (!response.ok) {
                throw new Error('Не удалось загрузить пользователей');
            }

            const users = await response.json();

            usersContainer.replaceChildren();
            status.textContent = '';
            usersCount.textContent = `${users.length} профилей`;

            users.forEach((user, index) => {
                const card = document.createElement('article');
                card.className = 'user-card';
                card.style.animationDelay = `${index * 60}ms`;

                const profileTop = document.createElement('div');
                profileTop.className = 'profile-top';

                const avatar = document.createElement('div');
                avatar.className = 'avatar';
                avatar.textContent = user.name
                    .split(' ')
                    .slice(0, 2)
                    .map(part => part[0])
                    .join('')
                    .toUpperCase();

                const profileInfo = document.createElement('div');

                const name = document.createElement('h3');
                name.className = 'profile-name';
                name.textContent = user.name;

                const label = document.createElement('p');
                label.className = 'profile-label';
                label.textContent = `Пользователь №${user.id}`;

                profileInfo.append(name, label);
                profileTop.append(avatar, profileInfo);

                const infoList = document.createElement('div');
                infoList.className = 'info-list';

                function createInfo(icon, title, value, isCompany = false) {
                    const item = document.createElement('div');
                    item.className = 'info-item';

                    const infoIcon = document.createElement('div');
                    infoIcon.className = 'info-icon';
                    infoIcon.textContent = icon;

                    const textBox = document.createElement('div');
                    textBox.className = 'info-text';

                    const infoLabel = document.createElement('span');
                    infoLabel.className = 'info-label';
                    infoLabel.textContent = title;

                    const infoValue = document.createElement('span');
                    infoValue.className = isCompany
                        ? 'company-tag'
                        : 'info-value';
                    infoValue.textContent = value;

                    textBox.append(infoLabel, infoValue);
                    item.append(infoIcon, textBox);

                    return item;
                }

                infoList.append(
                    createInfo('✉', 'Электронная почта: ', user.email),
                    createInfo('⌖', 'Город: ', user.address.city),
                    createInfo('▦', 'Компания: ', user.company.name, true)
                );

                const button = document.createElement('button');
                button.className = 'posts-button';
                button.innerHTML =
                    '<span class="button-icon">▤</span>' +
                    '<span>Показать публикации</span>';

                const postsContainer = document.createElement('div');
                postsContainer.className = 'posts';
                postsContainer.hidden = true;

                let postsLoaded = false;

                button.addEventListener('click', async () => {
                    if (postsLoaded) {
                        postsContainer.hidden = !postsContainer.hidden;

                        button.lastElementChild.textContent =
                            postsContainer.hidden
                                ? 'Показать публикации'
                                : 'Скрыть публикации';

                        button.firstElementChild.textContent =
                            postsContainer.hidden ? '▤' : '×';

                        return;
                    }

                    button.disabled = true;
                    button.lastElementChild.textContent = 'Загрузка...';
                    postsContainer.hidden = false;
                    postsContainer.replaceChildren();

                    const loading = document.createElement('div');
                    loading.className = 'message';
                    loading.textContent = 'Загружаем публикации...';
                    postsContainer.append(loading);

                    try {
                        const response = await fetch(
                            `https://jsonplaceholder.typicode.com/posts?userId=${user.id}`
                        );

                        if (!response.ok) {
                            throw new Error('Ошибка загрузки публикаций');
                        }

                        const posts = await response.json();
                        postsContainer.replaceChildren();

                        if (posts.length === 0) {
                            const empty = document.createElement('div');
                            empty.className = 'message';
                            empty.textContent =
                                'Публикаций пока нет.';
                            postsContainer.append(empty);
                        } else {
                            const heading = document.createElement('h4');
                            heading.className = 'posts-heading';
                            heading.textContent =
                                `Публикации (${posts.length})`;

                            postsContainer.append(heading);

                            posts.forEach((post, postIndex) => {
                                const postElement =
                                    document.createElement('article');
                                postElement.className = 'post';

                                const number =
                                    document.createElement('span');
                                number.className = 'post-number';
                                number.textContent =
                                    `ПОСТ ${(postIndex + 1)
                                        .toString()
                                        .padStart(2, '0')}`;

                                const postTitle =
                                    document.createElement('h4');
                                postTitle.textContent = post.title;

                                const postBody =
                                    document.createElement('p');
                                postBody.textContent = post.body;

                                postElement.append(
                                    number,
                                    postTitle,
                                    postBody
                                );

                                postsContainer.append(postElement);
                            });
                        }

                        postsLoaded = true;
                        button.lastElementChild.textContent =
                            'Скрыть публикации';
                        button.firstElementChild.textContent = '×';
                    } catch (error) {
                        console.error(error);

                        postsContainer.replaceChildren();

                        const errorMessage =
                            document.createElement('div');
                        errorMessage.className = 'message';
                        errorMessage.textContent =
                            'Не удалось загрузить записи. ' +
                            'Проверьте интернет и попробуйте снова.';

                        postsContainer.append(errorMessage);

                        button.lastElementChild.textContent =
                            'Повторить загрузку';
                        button.firstElementChild.textContent = '↻';
                    } finally {
                        button.disabled = false;
                    }
                });

                card.append(
                    profileTop,
                    infoList,
                    button,
                    postsContainer
                );

                usersContainer.append(card);
            });
        } catch (error) {
            console.error(error);
            status.textContent =
                'Не удалось загрузить пользователей. ' +
                'Проверьте подключение к интернету и обновите страницу.';
        }
    }

    loadUsers();
});
