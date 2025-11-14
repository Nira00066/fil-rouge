document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("event-image");
  const uploadText = document.getElementById("upload-text");
  const previewContainer = document.querySelector(".image-preview");
  const previewImage = document.getElementById("preview-image");

  // 🖱️ Ouvre la sélection de fichier
  window.triggerUpload = function () {
    fileInput.click();
  };

  // 📸 Quand un fichier est choisi
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (!file) return;

    // Vérifie que c’est bien une image
    if (!file.type.startsWith("image/")) {
      alert("⚠️ Merci de sélectionner une image valide !");
      return;
    }

    // Affiche un aperçu
    const reader = new FileReader();
    reader.onload = (e) => {
      previewImage.src = e.target.result;
      previewContainer.style.display = "block";
      uploadText.style.display = "none";
    };
    reader.readAsDataURL(file);
  });

  // ❌ Supprimer l'image
  window.removeImage = function (event) {
    event.stopPropagation(); // empêche le clic d’ouvrir à nouveau la sélection
    fileInput.value = "";
    previewImage.src = "";
    previewContainer.style.display = "none";
    uploadText.style.display = "block";
  };
});
