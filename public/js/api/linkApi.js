const getAllLink = async function ({}) {
    const response = await fetch(`/api/link`);
    const data = await response.json();
    return data;
  };
  
  const getLink = async function ({ id }) {
    const response = await fetch(`/api/link/${id}`);
    const data = await response.json();
    return data;
  };
  
  const createLink = async function ({ bioId, linkUrl, label, imageUrl }) {
    const response = await fetch(`/api/link?bioId=${bioId}`, {
      method: "POST",
      body: JSON.stringify({
        linkUrl: linkUrl,
        label: label,
        imageUrl: imageUrl,
      }),
      headers: { "Content-Type": "application/json" },
    });
    return response;
  };
  
  const updateLink = async function ({ id, linkUrl, label, imageUrl }) {
    const response = await fetch(`/api/link/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        linkUrl: linkUrl,
        label: label,
        imageUrl: imageUrl,
      }),
      headers: { "Content-Type": "application/json" },
    });
    return response;
  };
  
  const deleteLink = async function ({ id }) {
    const response = await fetch(`/api/link/${id}`, {
      method: "DELETE",
    });
    return response;
  };
  