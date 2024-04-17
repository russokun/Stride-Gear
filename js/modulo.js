//details.js
export let producto = (array, key) => array.find(obj => obj.id == key)

export let marca = (array, productoIngresado) => array.filter(productos => productos.marca.toLowerCase().includes(productoIngresado.trim().toLocaleLowerCase()))

export let select = (array, selecProducto) => array.filter(productos => productos.tipo.includes(selecProducto))
//carro.js
//