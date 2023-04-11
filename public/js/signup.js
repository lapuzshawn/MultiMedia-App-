const signupFormHandler = async function (event) {
	event.preventDefault();

	const nameEl = document.querySelector('#name-input-signup');
	const usernameEl = document.querySelector('#username-input-signup');
	const passwordEl = document.querySelector('#password-input-signup');

	const response = await fetch('/api/users/signup', {
		method: 'POST',
		body: JSON.stringify({
			name: nameEl.value,
			username: usernameEl.value,
			password: passwordEl.value,
		}),
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.replace('/');
	} else {
		alert('Failed to sign up');
	}
};

document
	.querySelector('#signup-form')
	.addEventListener('submit', signupFormHandler);
