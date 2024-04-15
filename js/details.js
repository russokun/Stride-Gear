let detalleContainer = document.getElementById('detalleContainer');
let urlSearch = new URLSearchParams(location.search);
let id = urlSearch.get('id');
console.log(id);
let producto = (array, key) => array.find(obj => obj.id == key);
console.log(producto(data, id));

let productoEncontrado = producto(data, id);

detalleContainer.innerHTML = `
<div class="flex flex-col md:flex-row items-center justify-center bg-gray-100 rounded-lg shadow-lg p-8 space-y-8 md:space-x-8">
    <div class="md:w-1/2">
        <h1 class="text-4xl font-bold mb-4">${productoEncontrado.modelo}</h1>
        <p class="text-lg mb-4">${productoEncontrado.descripcion}</p>
        <div class="flex justify-between items-center mb-4">
            <p class="text-lg font-bold">Precio:</p>
            <p class="text-lg">$${productoEncontrado.precio}</p>
        </div>
        <div class="flex justify-between items-center mb-4">
            <p class="text-lg font-bold">Descuento:</p>
            <p class="text-lg">-$${productoEncontrado.descuento}</p>
        </div>
        <div class="flex justify-between items-center mb-4">
            <p class="text-lg font-bold">Stock:</p>
            <p class="text-lg">${productoEncontrado.stock}</p>
        </div>
        <div class="flex justify-between items-center">
            <p class="text-lg font-bold">Precio Total:</p>
            <p class="text-lg">${productoEncontrado.precio_total}</p>
        </div>
    </div>
    <div class="md:w-1/2">
        <img class="h-64 w-64 object-contain rounded-lg shadow-md" src="${productoEncontrado.imagen}" alt="">
    </div>
</div>
<div class="flex justify-center mt-8">
    <button id="boton" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg">
        Agregar al carrito
    </button>
</div>
`;

let boton = document.getElementById('boton');

boton.addEventListener('click', () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.push(productoEncontrado);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito');
});
