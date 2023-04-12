//toggle modal
function toggleModal(modalId) {
	var modal = document.getElementById(modalId);
	modal.classList.toggle('hidden');
}

const searchInput = document.querySelector('#search-input');
const autocompleteResults = document.querySelector('#autocomplete-results');

//searching user's name and autocompleting the result into the input
searchInput.addEventListener('input', async (event) => {
	const searchValue = event.target.value.trim();
	if (searchValue === '') {
		autocompleteResults.innerHTML = '';
	} else {
		try {
			const response = await fetch(`/api/user/search?search=${searchValue}`);
			const users = await response.json();
			if (users.length > 0) {
				const autocompleteResultsHTML = users
					.map(
						(user) => `<div class="autocomplete-result">${user.username}</div>`,
					)
					.join('');
				autocompleteResults.innerHTML = autocompleteResultsHTML;
				autocompleteResults.style.display = 'block';
			} else {
				autocompleteResults.innerHTML =
					'<div class="autocomplete-result">No results found</div>';
				autocompleteResults.style.display = 'none';
			}
		} catch (error) {
			res.status(500).json(error);
		}
	}
});

//Search the user's username with an eventlistener for a enter key to send to the profile page of the search username
searchInput.addEventListener('keydown', async (event) => {
	if (event.keyCode === 13) {
		const query = searchInput.value;
		const response = await fetch(`/api/user/username/${query}`);
		const data = await response.json();
		const userId = data.id;
		console.log(userId);
		window.location.href = `/profile/${userId}`;
	}
});

//autocomplete to fill in to the searchinput
autocompleteResults.addEventListener('click', (event) => {
	const resultText = event.target.innerText;
	searchInput.value = resultText;
	autocompleteResults.innerHTML = '';
	autocompleteResults.style.display = 'none';
});

const messengerButton = document.querySelector('#messenger');
const newMessageModal = document.querySelector('#joinRoomModal');
const roomName = document.querySelector('#roomName');

messengerButton.addEventListener('click', () => {
	newMessageModal.classList.toggle('hidden');
});

const socket = io();

//Eventlistener for join room button
const joinRoomButton = document.querySelector('#joinRoomButton');
joinRoomButton.addEventListener('click', () => {
	const roomName = document.querySelector('#roomName').value;
	if (roomName !== '') {
		window.location.href = `/chat?room=${roomName}`;
		socket.emit('join-room', roomName);
	}
});

//Eventlistener for enter key
roomName.addEventListener('keydown', (event) => {
	const roomName = document.querySelector('#roomName').value;
	if (event.keyCode === 13) {
		window.location.href = `/chat?room=${roomName}`;
		socket.emit('join-room', roomName);
	}
});
