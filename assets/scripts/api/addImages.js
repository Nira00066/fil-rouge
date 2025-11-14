import { API_BASE_URL } from "./config.js";

async function uploadEventImage() {
  const fileInput = document.getElementById("event-image");
  if (!fileInput.files[0]) return null;

  const formData = new FormData();
  formData.append("image", fileInput.files[0]);

  const res = await fetch(`${API_BASE_URL}/api/images/upload-image`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data.imageId;
}

// 👉 rendre la fonction dispo globalement
window.uploadEventImage = uploadEventImage;
