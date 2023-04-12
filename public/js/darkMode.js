let darkMode = localStorage.getItem('darkMode');
const darkModeToggle = document.querySelector('#darkmode-toggle-label');

const enableDarkMode = () => {
	document.body.classList.add('darkMode');

	localStorage.setItem('darkMode', 'enabled');
};

const disableDarkMode = () => {
	document.body.classList.remove('darkMode');

	localStorage.setItem('darkMode', 'disabled');
};

if (darkMode === 'enabled') {
	enableDarkMode();
} else {
	disableDarkMode();
}

darkModeToggle.addEventListener('click', () => {
	darkMode = localStorage.getItem('darkMode');
	if (darkMode !== 'disabled') {
		disableDarkMode();
	} else {
		enableDarkMode();
	}
});
