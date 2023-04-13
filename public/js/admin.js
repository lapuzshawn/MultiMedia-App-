const adminFormHandler = async function(event) {
    event.preventDefault();

    const name = document.getElementById('admin-input-update-name').value;
    const facebookUrl = document.getElementById('admin-input-update-Facebook').value;
    const instagramUrl = document.getElementById('admin-input-update-Instagram').value;
    const twitterUrl = document.getElementById('admin-input-update-Twitter').value;
    const userId = document.getElementById('admin-user-id').innerText;

    
    const response = await fetch(`/api/user/${userId}`, {
        method: "PUT",
        body: JSON.stringify({
            name: name,
            facebookUrl: facebookUrl,
            instagramUrl: instagramUrl,
            twitterUrl: twitterUrl,
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        location.reload();
    } else {
        alert('Failed to update profile');
    }
};

const admin_submit_form = document.querySelector('#admin-submit')
if (admin_submit_form) admin_submit_form.addEventListener('click', adminFormHandler);


async function addMoreLinkToBio(bioId) {
    const linkValue = document.getElementById('bio-link-link-'+bioId).value;
    const labelValue = document.getElementById('bio-link-label-'+bioId).value;
    
    await createLink({ bioId, linkUrl: linkValue, label: labelValue, imageUrl: "" });

    location.reload();
}
