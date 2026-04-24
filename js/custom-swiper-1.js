const swiper = new Swiper('.swiper', {

  autoplay: {
     delay: 3000,
     disableOnInteraction: false
   },

  // Optional parameters
  direction: 'horizontal',
  slidesPerView: 1,
  loop: true,
  speed: 1200,
  mousewheel: false,
  watchSlidesProgress: true,
  // Sin parallax: evita desplazamientos del texto al cambiar de slide (caption dentro del slide)
  parallax: false,
  spaceBetween: -1,

  // If we need pagination
   pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});