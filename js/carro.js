let shoppingContainer = document.getElementById('shoppingContainer')
let carrito = JSON.parse(localStorage.getItem('productosCarritos')) || []
let listaProductos = document.getElementById('lista-productos');
let contadorProductos = 0;
let precioProductos = 0;
let descuentoTotal = 0;



function renderCarrito(array, contenedor) {
    if (array.length == 0) {
        contenedor.innerHTML = `<h2>No hay productos en su bolsa</h2>`
        return;
    }

    contenedor.innerHTML = ''
    let template = ''
    array.forEach(obj => {
        template = `
    <div class="flex flex-col   p-4 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]  my-4 bg-white rounded-lg items-center ">
        <img class="w-[100px]" src="${obj.imagen}" alt="">
        <h2>${obj.marca} ${obj.modelo} </h2>
        <h3> Precio: ${obj.precio}</h3>
        <h3>Cantidad disponible: ${obj.stock}</h3>
        <button class='flex ' data-deleteCard='${obj.id}'>
        <img class='w-[30px]' src="./assests/img/cart_off_icon_135804.png" alt="" data-delete-card='${obj.id}'>
        </button>
   </div>
    
    </div>`
        contenedor.innerHTML += template

    });
}
let articulos = []

if (carrito) {
    articulos = data.filter(prod => carrito.includes(prod.id))
    renderCarrito(articulos, shoppingContainer)
}



shoppingContainer.addEventListener('click', (e) => {
    let id = e.target.dataset.deleteCard
    if (id) {
        carrito = carrito.filter(prod => prod != id)
        id = articulos.filter(producto => id != producto.id)
        articulos = id
    }
    localStorage.setItem('productosCarritos', JSON.stringify(carrito))
    renderCarrito(id, shoppingContainer)
    location.reload()


})



function agregarProducto(nombre, precio, descuento,stock) {
    contadorProductos++;
    let precioConDescuento = precio - (precio * descuento / 100);
    precioProductos += precioConDescuento;
    descuentoTotal += (precio * descuento / 100);
    let producto = document.createElement('div');
    producto.classList.add('producto');
    producto.innerHTML = `
                <p>${nombre} - $${precio.toFixed(2)}  (Descuento del ${descuento}%)</p>
                 
                <input  class='border border-black w-[50px]' type="number" name="" max="${stock}" min="1" id="" onchange="actualizarCantidad(this, ${precio}, ${descuento})">
                
            `;
    listaProductos.appendChild(producto);

    actualizarCarrito();
}
function actualizarCantidad(input, precio, descuento) {
    const cantidad = parseInt(input.value); // Obtenemos la cantidad actual del input y la convertimos a un número entero
    const precioDescuento = precio - (precio * (descuento / 100)); // Calculamos el precio con el descuento aplicado
    const nuevoValor = precioDescuento * cantidad; // Calculamos el nuevo valor basado en la cantidad y el precio con descuento

    // Actualizamos el valor del input con el nuevo valor
    input.value = nuevoValor.toFixed(2); // Usamos toFixed(2) para redondear el nuevo valor a 2 decimales
}


function actualizarCarrito() {
    let precioConDescuento = precioProductos - descuentoTotal;

    document.getElementById('descuento').textContent = descuentoTotal.toFixed(2);
    document.getElementById('contador-productos').textContent = contadorProductos;
    document.getElementById('precio-productos').textContent = precioProductos.toFixed(2);;
    document.getElementById('total-productos').textContent = precioConDescuento.toFixed(2);
}

// interpolar data.propiedad
articulos.forEach(producto => {
    producto.nombre = ` ${producto.marca} ${producto.modelo} ${producto.id} `;
    agregarProducto(producto.nombre, producto.precio, producto.descuento);
})