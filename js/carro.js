let shoppingContainer = document.getElementById("shoppingContainer");
let carrito = JSON.parse(localStorage.getItem("productosCarritos")) || [];
let productosCarrito = data.filter((producto) => carrito.includes(producto.id));

let listaProductos = document.getElementById("lista-productos");
let contadorProductos = 0;
let precioProductos = 0;
let descuentoTotal = 0;

function renderCarrito(array, contenedor) {
  if (array.length == 0) {
    contenedor.innerHTML = `<h2>No hay productos en su bolsa</h2>`;
    return;
  }

  contenedor.innerHTML = "";
  let template = "";
  array.forEach((obj) => {
    template = `
    <div class="flex flex-col   p-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]  my-4 bg-white rounded-lg items-center ">
        <img class="w-[100px]" src="${obj.imagen}" alt="">
        <h2>${obj.marca} ${obj.modelo} </h2>
        <h3> Precio: $ ${obj.precio}</h3>
        <h3>Cantidad disponible: ${obj.stock}</h3>
        <button class='flex ' data-deleteCard='${obj.id}'>
        <img class='w-[30px]' src="./assests/img/cart_off_icon_135804.png" alt="" data-delete-card='${obj.id}'>
        </button>
   </div>
    
    </div>`;
    contenedor.innerHTML += template;
  });
}

let articulos = [];
if (carrito) {
  articulos = data.filter((prod) => carrito.includes(prod.id));

  // Renderizar el carrito
  renderCarrito(articulos, shoppingContainer);
  // Guardar el carrito actualizado en el localStorage
}

shoppingContainer.addEventListener("click", (e) => {
  let id = e.target.dataset.deleteCard;
  if (id) {
    carrito = carrito.filter((prod) => prod != id);
    id = articulos.filter((producto) => id != producto.id);
    articulos = id;
  }
  localStorage.setItem("productosCarritos", JSON.stringify(carrito));
  renderCarrito(id, shoppingContainer);
  location.reload();
});




function renderInput (producto,contenedor)  {
    let template = document.createElement("template");
    template=''
    producto.forEach(producto =>{
        template =`
        <h2>${producto.marca} ${producto.modelo} ${producto.id}</h2>
    <p data-precio='${producto.id}'> - $${producto.precio}  (Descuento del ${producto.descuento}%)</p>
    <div class='flex flex-row items-center'>
    <button class='p-3 ' data-boton-mas='${producto.cantidad}' data-id ='${producto.id}'>+</button>
    
    <input type="text" class="w-[20px]" name="" max='100' min='1' value='1' id="" data-cantidad='${producto.id}'>
    
    <button class='p-3 ' data-boton-menos='${producto.cantidad}' data-id ='${producto.id}'>-</button>
    </div>
  `
  contenedor.innerHTML += template
})

};
renderInput(articulos, listaProductos,);
//BOOTONES
let numeroCantidadSuma = 1
listaProductos.addEventListener('click', e => {
    

        let mas = e.target.dataset.botonMas;
        let menos = e.target.dataset.botonMenos;
        
        
        if (mas) {
            let idCapturado = e.target.dataset.id
            console.log(idCapturado);
            let cantidadd = document.querySelector(`input[data-cantidad="${idCapturado}"]`)
            //console.log(parseInt(cantidadd.value));
            cantidadd.value = parseInt(cantidadd.value )+ 1
            console.log(cantidadd.value);
        }
        
        if (menos) {
            let idCapturado = e.target.dataset.id
            console.log(idCapturado);
            let cantidadd = document.querySelector(`input[data-cantidad="${idCapturado}"]`)
            //console.log(parseInt(cantidadd.value));
            cantidadd.value = parseInt(cantidadd.value )- 1
            console.log(cantidadd.value);
        }
    
});
console.log(numeroCantidadSuma)

//-------------------------------------------------------------------------------
/* let cantidad = document.querySelector('p[data-cantidad="${producto.id}"]')
console.log(cantidad); */
let multiplicarPorPrecio= precio =>
    numeroCantidadSuma * precio;

/* let precio = ar
let total= multiplicarPorPrecio()

// Ejemplo de uso:
let precioUnitario = articulos.filter(precio =>  ) // Ejemplo de precio
let total = multiplicarPorPrecio(precioUnitario);
console.log(total) */; // Mostrará el total multiplicado por el precio


//funcion para calcular el precio con descuento
let calcularPrecionConDescuento = (precio, descuento) =>
  precio - precio * (descuento / 100);
let calcularNuevoValor = (precioDescuento, cantidad) =>
  precioDescuento * cantidad;


function agregarProducto( precio, descuento) {
  incrementarContador();
  sumarProducto(precio);
  calcularDescuentoTotal(precio, descuento);

  listaProductos.appendChild(producto);

  actualizarCarrito();
}

let incrementarContador = () => contadorProductos++;

let sumarProducto = (precio) =>
  (precioProductos += precio);

//funcion para calcular desc total
let calcularDescuentoTotal = (precio, descuento) =>
  (descuentoTotal += (precio * descuento) / 100); 

function actualizarCarrito() {
  let precioConDescuento = precioProductos - descuentoTotal;

  document.getElementById("descuento").textContent = 'hola'
  document.getElementById("contador-productos").textContent = contadorProductos;
  document.getElementById("precio-productos").textContent = precioProductos.toFixed(2);
  document.getElementById("total-productos").textContent = precioConDescuento.toFixed(2);
}



//[id,cantidad]
//addeventlistener
//reduce*/
