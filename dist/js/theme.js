
const swiper = new Swiper('.swiper', {
    loop: true, // pour que ça tourne en boucle
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: 4, // Combien de slides visibles
    spaceBetween: 10, // Espace entre les slides en px
  });
  