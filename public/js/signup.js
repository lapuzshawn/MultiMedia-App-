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

<<<<<<< HEAD
document
	.querySelector('#signup-form')
	.addEventListener('submit', signupFormHandler);
=======
const signup_form = document
    .querySelector('#signup-form')
if (signup_form) signup_form.addEventListener('submit', signupFormHandler);
>>>>>>> 2dba7ae5a12b405f76f409bc4bb09a8b52b8d513
