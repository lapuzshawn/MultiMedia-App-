const getAllBio = async function ({}) {
  const response = await fetch(`/api/bio`);
  const data = await response.json();
  return data;
};

const getBio = async function ({ id }) {
  const response = await fetch(`/api/bio/${id}`);
  const data = await response.json();
  return data;
};

const createBio = async function ({ linkUrl }) {
  const response = await fetch(`/api/bio`, {
    method: "POST",
    body: JSON.stringify({
      linkUrl: linkUrl,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

const updateBio = async function ({ id, linkUrl, thumbnail }) {
  const response = await fetch(`/api/bio/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      linkUrl: linkUrl,
      thumbnail: thumbnail,
    }),
    headers: { "Content-Type": "application/json" },
  });
  return response;
};

const deleteBio = async function ({ id }) {
  const response = await fetch(`/api/bio/${id}`, {
    method: "DELETE",
  });
  return response;
};

const searchBio = async function ({ linkUrl }) {
  const response = await fetch(`/api/bio/search?linkUrl=${linkUrl}`);
  const data = await response.json();
  return data;
}
