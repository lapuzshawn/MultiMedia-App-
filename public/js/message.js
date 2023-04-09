//toggle modal
function toggleModal(modalId) {
	var modal = document.getElementById(modalId);
	modal.classList.toggle('hidden');
}

const searchInput = document.getElementById('user-search-input');
const autocompleteResults = document.getElementById('autocomplete-results');

//searching user's name and autocompleting the result into the input
searchInput.addEventListener('input', async (event) => {
	const searchValue = event.target.value.trim();
	if (searchValue === '') {
		autocompleteResults.innerHTML = '';
	} else {
		try {
			const response = await fetch(
				`/api/user/users/search?search=${searchValue}`,
			);
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
			console.error(error);
		}
	}
});

//autocomplete to fill in to the searchinput
autocompleteResults.addEventListener('click', (event) => {
	const resultText = event.target.innerText;
	searchInput.value = resultText;
	autocompleteResults.innerHTML = '';
	autocompleteResults.style.display = 'none';
});

const chatButton = document.getElementById('chat-button');
chatButton.addEventListener('click', createConversation);

async function createConversation(event) {
	event.preventDefault();

	const recipientInput = document.getElementById('user-search-input');
	const recipient = recipientInput.value.trim();

	try {
		const response = await fetch('/api/messages/conversations', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username: recipient,
			}),
		});

		if (!response.ok) {
			throw new Error('Failed to create conversation');
		}

		// Redirect to the new conversation
		const conversation = await response.json();
		window.location.href = `/conversations/${conversation._id}`;
	} catch (error) {
		console.error(error);
		console.error(await error.response.json());
		// Display an error message
	}
}
