document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".category_card[data-category]");

  cards.forEach((card) => {
    const category = card.dataset.category;
    if (!category) return;

    card.style.cursor = "pointer";

    card.addEventListener("click", () => {
      // Chemin selon où est ton fichier events.html
      window.location.href = `./pages/events.html?category=${category}`;
    });
  });
});
