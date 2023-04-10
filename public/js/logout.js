const logout = async function () {
	const response = await fetch('/api/user/logout', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
	});
	console.log(response)
	if (response.ok) {
		document.location.replace('/login');
	} else {
		alert('Failed to log out');
	}
};

const logout_link = document.querySelector('#logout-link')
if (logout_link) logout_link.addEventListener('click', logout);
