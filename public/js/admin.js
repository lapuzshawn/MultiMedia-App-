const adminFormHandler = async function(event) {
    event.preventDefault();

    const nameEl = document.querySelector('#name-input-signup');
    const usernameEl = document.querySelector('#username-input-signup');
    const passwordEl = document.querySelector('#password-input-signup');
/*
const adminHeader = document.querySelector(".admin-header");

const avatarImg = document.querySelector(".admin-header_avatar");
avatarImg.src = profile.avatar;
avatarImg.alt = "admin Picture";

const username = document.querySelector(".admin-header_username");
username.textContent = profile.name;

const description = document.querySelector(".admin-header_description");
description.textContent = "Influencer | San Francisco, CA";

if (!viewMyProfile) {
  const messageLink = document.querySelector(".admin-header_message");
  messageLink.href = `/message/${admin.userId}`;
}

// Show the admin header
adminHeader.style.display = "block";

*/
    const response = await fetch('/admin', {
        method: "PUT",
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

const signup_form = document
    .querySelector('#signup-form')
if (signup_form) signup_form.addEventListener('submit', signupFormHandler);