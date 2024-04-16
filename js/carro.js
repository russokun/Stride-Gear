let shoppingContainer = document.getElementById('shoppingContainer')
let carrito = []

carrito = JSON.parse(localStorage.getItem('productosCarritos'))
function renderCarrito(array, contenedor) {

    contenedor.innerHTML = ''
    let template = ''
    array.forEach(obj => {
        template = `
    <div class="flex flex-col   p-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]  my-4  ">
        <img class="w-[100px]" src="${obj.imagen}" alt="">
        <h2>${obj.marca} ${obj.modelo} </h2>
        <h3> Precio: ${obj.precio}</h3>
        <h3>Cantidad disponible: ${obj.stock}</h3>
        
   </div>
    
    </div>`
        contenedor.innerHTML += template

    });
}
let articulos = []
//console.log(renderCarrito(carrito,shoppingContainer));
if (carrito) {
    articulos = data.filter(prod => carrito.includes(prod.id))
    renderCarrito(articulos, shoppingContainer)
}

let contadorProductos = 0;
let precioProductos = 0;
let descuentoTotal = 0;


function agregarProducto(nombre, precio, descuento) {
    contadorProductos++;
    let precioConDescuento = precio - (precio * descuento / 100);
    precioProductos += precioConDescuento;
    descuentoTotal += (precio * descuento / 100);

    let listaProductos = document.getElementById('lista-productos');
    let producto = document.createElement('div');
    producto.classList.add('producto');
    producto.innerHTML = `
                <p>${nombre} - $${precio.toFixed(2)}  (Descuento del ${descuento}%)</p>
                <button onclick="eliminarProducto(this, ${precio}, ${descuento})">Eliminar</button>
                <button onclick="disminuirCantidad(this, ${precio}, ${descuento})">-</button> 
                <span class="cantidad">1 </span> 
                <button onclick="aumentarCantidad(this, ${precio}, ${descuento})">+</button> 
            `;
    listaProductos.appendChild(producto);

    actualizarCarrito();
}

function eliminarProducto(button, precio, descuento) {
    let producto = button.parentNode;
    let cantidad = parseInt(producto.querySelector('.cantidad').textContent);
    contadorProductos -= cantidad;
    precioProductos -= precio * cantidad;
    descuentoTotal -= (precio * descuento / 100) * cantidad; // Restar el descuento del producto eliminado
    producto.remove();
    actualizarCarrito();
}

function disminuirCantidad(button, precio, descuento) {
    let cantidadElemento = button.nextElementSibling;
    let cantidad = parseInt(cantidadElemento.textContent);
    if (cantidad > 1) {
        cantidad--;
        cantidadElemento.textContent = cantidad;
        contadorProductos--;
        precioProductos -= precio;
        descuentoTotal -= (precio * descuento / 100); // Restar el descuento del producto
        actualizarCarrito();
    }
}

function aumentarCantidad(button, precio, descuento) {
    let cantidadElemento = button.previousElementSibling;
    let cantidad = parseInt(cantidadElemento.textContent);
    cantidad++;
    cantidadElemento.textContent = cantidad;
    contadorProductos++;
    precioProductos += precio;
    descuentoTotal += (precio * descuento / 100); // Sumar el descuento del producto
    actualizarCarrito();
}

function actualizarCarrito() {
    let precioConDescuento = precioProductos - descuentoTotal;

    document.getElementById('descuento').textContent = descuentoTotal.toFixed(2);
    document.getElementById('contador-productos').textContent = contadorProductos;
    document.getElementById('precio-productos').textContent = precioProductos.toFixed(2);;
    document.getElementById('total-productos').textContent = precioConDescuento.toFixed(2);
}

// interpolar data.propiedad
agregarProducto('Zapatillas Deportivas', 1000, 10);
agregarProducto('Camiseta Deportiva', 1200, 10);