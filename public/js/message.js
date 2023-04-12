//toggle modal
function toggleModal(modalId) {
	var modal = document.getElementById(modalId);
	modal.classList.toggle('hidden');
}

const messengerButton = document.querySelector('#messenger');
const newMessageModal = document.querySelector('#joinRoomModal');

messengerButton.addEventListener('click', () => {
	newMessageModal.classList.toggle('hidden');
});

const socket = io();

const joinRoomButton = document.querySelector('#joinRoomButton');
joinRoomButton.addEventListener('click', () => {
	const roomName = document.querySelector('#roomName').value;
	if (roomName !== '') {
		toggleModal('joinRoomModal');
		window.location.href = `/chat?room=${roomName}`;
		socket.emit('join-room', roomName);
	}
});
