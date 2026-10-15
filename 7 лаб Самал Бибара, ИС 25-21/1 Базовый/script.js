
const student = {
    about: {
        title: "О себе",
        content: `
            <p><strong>Имя:</strong> Самал</p>
            <p><strong>Статус:</strong> Студентка</p>
            <p><strong>Специальность:</strong> Информационные технологии</p>
            <p><strong>О себе:</strong> Изучаю программирование и современные технологии.</p>
        `
    },

    skills: {
        title: "Мои навыки",
        content: `
            <ul>
                <li>HTML — создание сайтов</li>
                <li>CSS — оформление страниц</li>
                <li>JavaScript — интерактивность</li>
                <li>Python — программирование</li>
                <li>SQL — работа с базами данных</li>
            </ul>
        `
    },

    contacts: {
        title: "Контакты",
        content: `
            <p><strong>Email:</strong> student@example.com</p>
            <p><strong>Город:</strong> Алматы</p>
        `
    }
};

const content = document.getElementById("content");
const tabs = document.querySelectorAll(".tab");

function showTab(tabName) {
    const data = student[tabName];

    if (!data) {
        tabName = "about";
    }

    const selectedData = student[tabName];

    content.innerHTML = `
        <h2>${selectedData.title}</h2>
        ${selectedData.content}
    `;

    tabs.forEach(tab => {
        tab.classList.toggle(
            "active",
            tab.dataset.tab === tabName
        );
    });

    localStorage.setItem("studentCardTab", tabName);
}

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        showTab(tab.dataset.tab);
    });
});

const savedTab = localStorage.getItem("studentCardTab");

showTab(student[savedTab] ? savedTab : "about");
