const carouselItems = document.querySelectorAll('.carousel-item');
let currentItem = 0;
function showItem(index) {
  carouselItems.forEach((item, i) => {
    item.style.transform = `translateX(${(i - index) * 100}%)`;
  });
}
function nextItem() {
  currentItem = (currentItem + 1) % carouselItems.length;
  showItem(currentItem);
}
setInterval(nextItem, 2000); // Cambia la imagen cada 2 segundos (2000 milisegundos)