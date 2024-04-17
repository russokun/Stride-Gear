
let mainDetail = document.getElementById('mainDetail')
let urlSearch = new URLSearchParams(location.search)
let id = urlSearch.get('id')
console.log(id)
import { producto } from "./modulo.js";
console.log(producto(data, id))

let productoEncontrado = producto(data, id);
let descuentoSection = ''
if (productoEncontrado.descuento) {
    descuentoSection = `
        <div class="flex justify-between items-center mb-4">
            <p class="text-lg font-bold">Descuento:</p>
            <p class="text-lg">${productoEncontrado.descuento}%</p>
        </div>
    `
}else{
    descuentoSection = `<div class="flex justify-between items-center mb-4">
    <p class="text-lg font-bold">Descuento:</p>
    <p class="text-lg">El producto no tiene descuento</p>
</div>`
}

mainDetail.innerHTML = `
<div class="flex flex-col mt-4 w-11/12 h-11/12 bg-white md:flex-row items-center justify-center rounded-lg shadow-lg p-8 space-y-8 md:space-x-8">
    <div class="md:w-1/2">
        <h1 class="text-3xl font-bold mb-4">${productoEncontrado.marca} ${productoEncontrado.modelo}</h1>
        <p class="text-lg mb-4">${productoEncontrado.descripcion}</p>
        <div class="flex justify-between items-center mb-4">
            <p class="text-lg font-bold">Precio:</p>
            <p class="text-lg">$${productoEncontrado.precio}</p>
        </div>
        ${descuentoSection}
        <div class="flex justify-between items-center mb-4">
            <p class="text-lg font-bold">Stock:</p>
            <p class="text-lg">${productoEncontrado.stock}</p>
        </div>
        <div class="flex justify-between items-center mb-4">
            <p class="text-lg font-bold">Talles:</p>
            <p class="text-lg">${productoEncontrado.talles} </p>
        </div>
        <div class="flex justify-between items-center">
            <p class="text-lg font-bold">Precio Total:</p>
            <p class="text-lg">$${productoEncontrado.precio_total}</p>
        </div>
    </div>
    <div class="md:w-1/2 flex flex-end justify-end">
        <img class="h-[240px] object-contain rounded-lg shadow-md md:h-[360px] w-[360px]" src="${productoEncontrado.imagen}" alt="">
    </div>
</div>

`


