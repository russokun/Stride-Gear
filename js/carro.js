let carrito = JSON.parse(localStorage.getItem("productosCarritos")) || []
let productosCarrito = data.filter((producto) => carrito.includes(producto.id))

let listaProductos = document.getElementById("lista-productos") 
let contadorProductos = 0
let precioProductos = 0
let descuentoTotal = 0

if (carrito) {
  renderInput(productosCarrito, listaProductos)
}

function renderInput(productos, contenedor) {
  // Limpiar el contenido del contenedor
  contenedor.innerHTML = ''

  // Recorrer los productos y renderizar cada uno
  productos.forEach(producto => {
    let template = `
          <div class="flex flex-wrap gap-4 items-center justify-center">
              <img class="w-[75px]" src="${producto.imagen}" alt="">
              <h2>${producto.marca} ${producto.modelo} ${producto.id}</h2>
              <p data-precio='${producto.id}'> - $${producto.precio}  (Descuento del ${producto.descuento}%)</p>
              <div class='flex flex-row items-center'>
                  <button class='p-3' data-boton-menos='${producto.id}'>-</button>
                  <input type="text" class="w-[20px]" name="" max='100' min='1' value='1' id="" data-cantidad='${producto.id}'>
                  <button class='p-3' data-boton-mas='${producto.id}'>+</button>
              </div>
              <button class='flex' data-deleteCard='${producto.id}'>
                  <img class='w-[30px]' src="./assests/img/cart_off_icon_135804.png" alt="" data-delete-card='${producto.id}'>
              </button>
          </div>
      `;
    // Agregar el template al contenedor
    contenedor.innerHTML += template
  });

  // Aplicar eventos a los botones
  contenedor.querySelectorAll("[data-boton-menos]").forEach(boton => {
    boton.addEventListener("click", disminuirCantidad)
  });

  contenedor.querySelectorAll("[data-boton-mas]").forEach(boton => {
    boton.addEventListener("click", aumentarCantidad)
  });

  contenedor.querySelectorAll("[data-deleteCard]").forEach(boton => {
    boton.addEventListener("click", eliminarProducto)
  })
}

// Función para eliminar un producto del carrito
function eliminarProducto(e) {
  let id = e.target.dataset.deleteCard
  if (id) {
    carrito = carrito.filter((prod) => prod !== id)
    localStorage.setItem("productosCarritos", JSON.stringify(carrito))
    productosCarrito = productosCarrito.filter(producto => producto.id !== id)
    renderInput(productosCarrito, listaProductos)
    actualizarCarrito()
  }
}

// Función para aumentar la cantidad de un producto en el carrito
function aumentarCantidad(e) {
  let id = e.target.dataset.botonMas
  let inputCantidad = document.querySelector(`input[data-cantidad="${id}"]`)
  let producto = productosCarrito.find(prod => prod.id === id)
  if (inputCantidad && producto) {
    if (parseInt(inputCantidad.value) < producto.stock) {
      inputCantidad.value = parseInt(inputCantidad.value) + 1
      actualizarCarrito()
    }
  }
}

// Función para disminuir la cantidad de un producto en el carrito
function disminuirCantidad(e) {
  let id = e.target.dataset.botonMenos
  let inputCantidad = document.querySelector(`input[data-cantidad="${id}"]`)
  if (inputCantidad) {
    if (parseInt(inputCantidad.value) > 1) {
      inputCantidad.value = parseInt(inputCantidad.value) - 1
      actualizarCarrito()
    }
  }
}

// Función para actualizar el carrito de compras y los precios
function actualizarCarrito() {
  // Resetear los valores
  contadorProductos = 0
  precioProductos = 0
  descuentoTotal = 0

  // Recorrer los productos en el carrito y calcular los totales
  productosCarrito.forEach(producto => {
    contadorProductos++;
    let cantidad = parseInt(document.querySelector(`input[data-cantidad="${producto.id}"]`).value)
    precioProductos += producto.precio * cantidad
    descuentoTotal += (producto.precio * producto.descuento / 100) * cantidad
  });

  // Actualizar los elementos en el DOM con los nuevos valores
  document.getElementById("contador-productos").textContent = contadorProductos
  document.getElementById("precio-productos").textContent = precioProductos.toFixed(2)
  document.getElementById("descuento").textContent = descuentoTotal.toFixed(2)

  // Calcular el precio final con descuento
  let precioConDescuento = precioProductos - descuentoTotal
  document.getElementById("total-productos").textContent = precioConDescuento.toFixed(2)

  // Guardar el estado actual del carrito en localStorage
  localStorage.setItem("productosCarritos", JSON.stringify(carrito))
}
// Llamada inicial para cargar el carrito al cargar la página
actualizarCarrito()