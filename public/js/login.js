const loginFormHandler = async function (event) {
	event.preventDefault();

	const usernameEl = document.querySelector('#username-input-login');
	const passwordEl = document.querySelector('#password-input-login');

	const response = await fetch('/api/user/login', {
		method: 'POST',
		body: JSON.stringify({
			username: usernameEl.value,
			password: passwordEl.value,
		}),
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.replace('/');
	} else {
		alert('Failed to login. Please try again!');
	}
};

document
	.querySelector('#login-form')
	.addEventListener('submit', loginFormHandler);
