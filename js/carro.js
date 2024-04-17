let carrito = JSON.parse(localStorage.getItem("productosCarritos")) || [];
let productosCarrito = data.filter((producto) => carrito.includes(producto.id));

let listaProductos = document.getElementById("lista-productos");
let contadorProductos = 0;
let precioProductos = 0;
let descuentoTotal = 0;

let articulos = [];
if (carrito) {
  articulos = data.filter((prod) => carrito.includes(prod.id));
  renderInput(articulos, listaProductos);
}

function renderInput (producto,contenedor)  {
    let template = document.createElement("template");
    template=''
    producto.forEach(producto =>{
        template =`
      <div class="flex flex-wrap gap-4 items-center justify-center">
        <img class="w-[75px]" src="${producto.imagen}" alt="">
        <h2>${producto.marca} ${producto.modelo} ${producto.id}</h2>
        <p data-precio='${producto.id}'> - $${producto.precio}  (Descuento del ${producto.descuento}%)</p>
        <div class='flex flex-row items-center'>
        
        <button class='p-3 ' data-boton-menos='${producto.cantidad}' data-id ='${producto.id}'>-</button>
        <input type="text" class="w-[20px]" name="" max='100' min='1' value='1' id="" data-cantidad='${producto.id}'>
        <button class='p-3 ' data-boton-mas='${producto.cantidad}' data-id ='${producto.id}'>+</button>
        </div>
        <button class='flex ' data-deleteCard='${producto.id}'>
        <img class='w-[30px]' src="./assests/img/cart_off_icon_135804.png" alt="" data-delete-card='${producto.id}'>
        </button>
      </div>
  `
  contenedor.innerHTML += template
})

listaProductos.addEventListener("click", (e) => {
  let id = e.target.dataset.deleteCard;
  console.log(id);
  if (id) {
    carrito = carrito.filter((prod) => prod != id);
    id = articulos.filter((producto) => id != producto.id);
    console.log(carrito);
    console.log(id);
  
  }
  localStorage.setItem("productosCarritos", JSON.stringify(carrito));
  renderInput(id, listaProductos);
  location.reload();
});

};
//BOTONES
let numeroCantidadSuma = 1
listaProductos.addEventListener('click', e => {
    

        let mas = e.target.dataset.botonMas;
        let menos = e.target.dataset.botonMenos;
        /*
        if (mas || menos) {
          let idCapturado = e.target.dataset.id
          let cantidadd = document.querySelector('input[data-cantidad="${idCapturado}"]')
          let producto = data.find(item => item.id == idCapturado)
          if (cantidadd && producto) {
            if (mas && parseInt(cantidadd.value) < producto.stock) {
              cantidadd.value = parseInt(cantidadd.value) + 1;
              precioProductos += producto.precio
            }else if(menos && parseInt(cantidadd.value) > producto.stock){
              cantidadd.value = parseInt(cantidadd.value) - 1;
              precioProductos -= producto.precio
            }
          }
          document.getElementById('total-productos').textContent = `Total: $${precioProductos}`
        }
        */
        
        if (mas) {
            let idCapturado = e.target.dataset.id
            console.log(idCapturado);
            let cantidadd = document.querySelector(`input[data-cantidad="${idCapturado}"]`)
            //console.log(parseInt(cantidadd.value));
            aumentarCantidad(e.target, precioPro)
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

let decrementarContador = () => contadorProductos--;

let restarProducto = (precio) => precioProductos -= precio

let sumarProducto = (precio) => precioProductos += precio;

//funcion para calcular desc total
let calcularDescuentoTotal = (precio, descuento) =>
  (descuentoTotal += (precio * descuento) / 100); 

function actualizarCarrito() {
  let precioConDescuento = precioProductos - descuentoTotal;

  function disminuirCantidad(button, precio, descuento){
    let cantidadElemento = button.previousElementSibling
    let cantidad = parseInt(cantidadElemento.textContent)
    if (cantidad > 1) {
      cantidad--
      cantidadElemento.textContent = cantidad
      decrementarContador()
      restarProductoProducto(precio)
      calcularDescuentoTotal(precio, descuento)
      actualizarCarrito()
    }
  }
  

function aumentarCantidad(button, precio, descuento){
  let cantidadElemento = button.previousElementSibling
  let cantidad = parseInt(cantidadElemento.textContent)
  cantidad++
  cantidadElemento.textContent = cantidad
  incrementarContador()
  sumarProducto(precio)
  calcularDescuentoTotal(precio, descuento)
  actualizarCarrito()
}

  document.getElementById("descuento").textContent = descuentoTotal.toFixed(2)
  document.getElementById("contador-productos").textContent = contadorProductos;
  document.getElementById("precio-productos").textContent = precioProductos.toFixed(2);
  document.getElementById("total-productos").textContent = precioConDescuento.toFixed(2);
}



//[id,cantidad]
//addeventlistener
//reduce*/
