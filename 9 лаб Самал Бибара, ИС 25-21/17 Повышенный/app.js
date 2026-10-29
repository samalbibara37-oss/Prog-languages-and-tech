
document.addEventListener('DOMContentLoaded', () => {
    const usersList = document.querySelector('#usersList');
    const userSearch = document.querySelector('#userSearch');
    const globalStatus = document.querySelector('#globalStatus');

    const userCount = document.querySelector('#userCount');
    const postCount = document.querySelector('#postCount');
    const commentCount = document.querySelector('#commentCount');
    const sidebarCount = document.querySelector('#sidebarCount');

    const welcome = document.querySelector('#welcome');
    const profile = document.querySelector('#profile');

    const profileAvatar = document.querySelector('#profileAvatar');
    const profileName = document.querySelector('#profileName');
    const profileUsername = document.querySelector('#profileUsername');
    const profileEmail = document.querySelector('#profileEmail');
    const profileCity = document.querySelector('#profileCity');
    const profileCompany = document.querySelector('#profileCompany');

    const profilePostCount = document.querySelector('#profilePostCount');
    const postsStatus = document.querySelector('#postsStatus');
    const postsList = document.querySelector('#postsList');

    const commentsSection = document.querySelector('#commentsSection');
    const selectedPost = document.querySelector('#selectedPost');
    const selectedCommentCount =
        document.querySelector('#selectedCommentCount');
    const commentsStatus = document.querySelector('#commentsStatus');
    const commentsList = document.querySelector('#commentsList');

    let users = [];
    let selectedUserId = null;
    let selectedPostId = null;
    let userRequestNumber = 0;
    let postRequestNumber = 0;

    const API = 'https://jsonplaceholder.typicode.com';

    function initials(name) {
        return name
            .split(/\s+/)
            .slice(0, 2)
            .map(part => part[0] || '')
            .join('')
            .toUpperCase();
    }

    function setLoading(element, message) {
        element.replaceChildren();

        const spinner = document.createElement('span');
        spinner.className = 'spinner';

        element.append(spinner, document.createTextNode(message));
    }

    function showMessage(container, message, retry) {
        container.replaceChildren();

        const box = document.createElement('div');
        box.className = 'empty-state';
        box.textContent = message;

        if (retry) {
            const button = document.createElement('button');
            button.className = 'retry-button';
            button.textContent = 'Попробовать снова';
            button.addEventListener('click', retry);
            box.append(document.createElement('br'), button);
        }

        container.append(box);
    }

    async function request(url) {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }

        return response.json();
    }

    function renderUsers() {
        const query = userSearch.value.trim().toLowerCase();

        const filteredUsers = users.filter(user =>
            `${user.name} ${user.username} ${user.email}`
                .toLowerCase()
                .includes(query)
        );

        usersList.replaceChildren();
        sidebarCount.textContent = filteredUsers.length;

        if (filteredUsers.length === 0) {
            showMessage(usersList, 'Пользователи не найдены.');
            return;
        }

        filteredUsers.forEach((user, index) => {
            const button = document.createElement('button');
            button.className = 'user-item';

            if (user.id === selectedUserId) {
                button.classList.add('active');
            }

            button.style.animationDelay = `${index * 25}ms`;

            const avatar = document.createElement('span');
            avatar.className = 'user-avatar';
            avatar.textContent = initials(user.name);

            const info = document.createElement('span');
            info.className = 'user-item-info';

            const name = document.createElement('span');
            name.className = 'user-item-name';
            name.textContent = user.name;

            const email = document.createElement('span');
            email.className = 'user-item-email';
            email.textContent = user.email;

            const arrow = document.createElement('span');
            arrow.className = 'user-arrow';
            arrow.textContent = '›';

            info.append(name, email);
            button.append(avatar, info, arrow);

            button.addEventListener('click', () => {
                selectUser(user);
            });

            usersList.append(button);
        });
    }

    async function selectUser(user) {
        selectedUserId = user.id;
        selectedPostId = null;

        const currentRequest = ++userRequestNumber;
        ++postRequestNumber;

        renderUsers();

        welcome.hidden = true;
        profile.hidden = false;

        profileAvatar.textContent = initials(user.name);
        profileName.textContent = user.name;
        profileUsername.textContent = `@${user.username} · ID ${user.id}`;
        profileEmail.textContent = user.email;
        profileCity.textContent = user.address.city;
        profileCompany.textContent = user.company.name;

        profilePostCount.textContent = '…';
        postsList.replaceChildren();
        setLoading(postsStatus, 'Загружаем публикации пользователя...');
        commentsSection.hidden = true;
        commentsList.replaceChildren();
        selectedPost.replaceChildren();
        selectedCommentCount.textContent = '0';

        postCount.textContent = '…';
        commentCount.textContent = '—';

        try {
            const posts = await request(
                `${API}/posts?userId=${user.id}`
            );

            if (currentRequest !== userRequestNumber) return;

            profilePostCount.textContent = posts.length;
            postCount.textContent = posts.length;
            postsStatus.textContent = '';

            if (posts.length === 0) {
                showMessage(postsList, 'У пользователя пока нет публикаций.');
                return;
            }

            renderPosts(posts);
        } catch (error) {
            if (currentRequest !== userRequestNumber) return;

            console.error(error);

            profilePostCount.textContent = '!';
            postCount.textContent = '—';

            showMessage(
                postsList,
                'Не удалось загрузить публикации. Проверьте интернет.',
                () => selectUser(user)
            );

            postsStatus.textContent = '';
        }
    }

    function renderPosts(posts) {
        postsList.replaceChildren();

        posts.forEach((post, index) => {
            const button = document.createElement('button');
            button.className = 'post-card';

            const meta = document.createElement('div');
            meta.className = 'post-meta';

            const number = document.createElement('span');
            number.className = 'post-number';
            number.textContent =
                `ПУБЛИКАЦИЯ ${(index + 1).toString().padStart(2, '0')}`;

            const action = document.createElement('span');
            action.className = 'post-action';
            action.textContent = 'Читать комментарии →';

            meta.append(number, action);

            const title = document.createElement('h3');
            title.textContent = post.title;

            const body = document.createElement('p');
            body.textContent = post.body;

            button.append(meta, title, body);

            button.addEventListener('click', () => {
                loadComments(post, button);
            });

            postsList.append(button);
        });
    }

    async function loadComments(post, selectedButton) {
        if (selectedPostId === post.id) {
            commentsSection.hidden = !commentsSection.hidden;
            return;
        }

        selectedPostId = post.id;
        const currentRequest = ++postRequestNumber;

        document.querySelectorAll('.post-card').forEach(button => {
            button.classList.remove('active');
        });

        selectedButton.classList.add('active');

        commentsSection.hidden = false;
        commentsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });

        selectedPost.replaceChildren();

        const postTitle = document.createElement('strong');
        postTitle.textContent = post.title;

        const postText = document.createElement('div');
        postText.textContent = post.body;
        postText.style.marginTop = '7px';

        selectedPost.append(postTitle, postText);

        selectedCommentCount.textContent = '…';
        commentCount.textContent = '…';

        setLoading(commentsStatus, 'Загружаем комментарии к публикации...');
        commentsList.replaceChildren();

        try {
            const comments = await request(
                `${API}/posts/${post.id}/comments`
            );

            if (currentRequest !== postRequestNumber) return;

            commentsStatus.textContent = '';
            selectedCommentCount.textContent = comments.length;
            commentCount.textContent = comments.length;

            if (comments.length === 0) {
                showMessage(
                    commentsList,
                    'К этой публикации пока нет комментариев.'
                );
                return;
            }

            comments.forEach(comment => {
                const card = document.createElement('article');
                card.className = 'comment-card';

                const avatar = document.createElement('div');
                avatar.className = 'comment-avatar';
                avatar.textContent = initials(comment.name);

                const content = document.createElement('div');
                content.className = 'comment-content';

                const name = document.createElement('h3');
                name.className = 'comment-name';
                name.textContent = comment.name;

                const email = document.createElement('span');
                email.className = 'comment-email';
                email.textContent = comment.email;

                const body = document.createElement('p');
                body.className = 'comment-body';
                body.textContent = comment.body;

                content.append(name, email, body);
                card.append(avatar, content);
                commentsList.append(card);
            });
        } catch (error) {
            if (currentRequest !== postRequestNumber) return;

            console.error(error);
            selectedCommentCount.textContent = '!';
            commentCount.textContent = '—';

            showMessage(
                commentsList,
                'Не удалось загрузить комментарии. Проверьте интернет.',
                () => loadComments(post, selectedButton)
            );

            commentsStatus.textContent = '';
        }
    }

    async function init() {
        setLoading(globalStatus, 'Загружаем список пользователей...');

        try {
            users = await request(`${API}/users`);

            userCount.textContent = users.length;
            sidebarCount.textContent = users.length;
            globalStatus.textContent = '';

            renderUsers();

            // Автоматически открываем первого пользователя.
            if (users.length > 0) {
                await selectUser(users[0]);
            }
        } catch (error) {
            console.error(error);

            userCount.textContent = '—';
            globalStatus.textContent =
                'Не удалось загрузить пользователей. Проверьте подключение.';

            const retry = document.createElement('button');
            retry.className = 'retry-button';
            retry.textContent = 'Повторить загрузку';
            retry.addEventListener('click', init);
            globalStatus.append(' ', retry);
        }
    }

    userSearch.addEventListener('input', renderUsers);

    init();
});
