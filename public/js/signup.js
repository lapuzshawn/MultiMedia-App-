const signupFormHandler = async function (event) {
	event.preventDefault();

	const nameEl = document.querySelector('#name-input-signup');
	const usernameEl = document.querySelector('#username-input-signup');
	const passwordEl = document.querySelector('#password-input-signup');

	const response = await fetch('/api/user', {
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

const signup_form = document.querySelector('#signup-form');
if (signup_form) signup_form.addEventListener('submit', signupFormHandler);
