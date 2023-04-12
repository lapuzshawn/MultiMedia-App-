const signupFormHandler = async function (event) {
	event.preventDefault();

	const fnameEl = document.querySelector('#fname-input-signup');
	const lnameEl = document.querySelector('#lname-input-signup');
	const usernameEl = document.querySelector('#username-input-signup');
	const emailEl = document.querySelector('#email-input-signup');
	const passwordEl = document.querySelector('#password-input-signup');

	const response = await fetch('/signup', {
		method: 'POST',
		body: JSON.stringify({
			fname: fnameEl.value,
			lname: lnameEl.value,
			username: usernameEl.value,
			email: emailEl.value,
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

// document
// 	.querySelector('#signup-submit')
// 	.addEventListener('submit', signupFormHandler);

const signup_form = document.querySelector('#signup-form')
if (signup_form) signup_form.addEventListener('submit', signupFormHandler);