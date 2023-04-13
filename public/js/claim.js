const inputClaim = document.getElementById("input-claim");
const claimLinkButton = document.getElementById("claim-link");
const availabilitySpan = document.getElementById("availability");

const checkBioAvailable = async function (linkUrl) {
  try {
    const bio = await searchBio({linkUrl});
    console.log("bio ", !!bio)
    if (!!bio) {
      return false;
    }
    return true;
  } catch (error) {
    return true;
  }
};

inputClaim.addEventListener("input", async (e) => {
  const inputValue = e.target.value.trim();

  if (inputValue === "") {
    availabilitySpan.innerText = "";
    return;
  }

  const isAvailable = await checkBioAvailable(inputValue);

  if (isAvailable) {
    availabilitySpan.innerText = "Available";
    availabilitySpan.style.color = "green";
  } else {
    availabilitySpan.innerText = "Not available";
    availabilitySpan.style.color = "red";
  }
});

claimLinkButton.addEventListener("click", async function(e) {
  e.preventDefault();
  const linkBio = inputClaim.value;
  console.log(linkBio)
  createBio({ linkUrl: linkBio })
  availabilitySpan.innerText = "";
  inputClaim.value = ""
}, false);
