const STORAGE_KEY = 'user_profile_data';
const inputs = document.querySelectorAll('input');
const status = document.getElementById('status');

// Restore
const savedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
if (savedData) {
    if (savedData.name) document.getElementById('name').value = savedData.name;
    // ... same for others
}

// Save
inputs.forEach(input => {
    input.addEventListener('input', () => {
        const data = {
            name: document.getElementById('name').value,
            group: document.getElementById('group').value,
            city: document.getElementById('city').value
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        // Show status
        status.style.opacity = 1;
        // hide after 1s
    });
});