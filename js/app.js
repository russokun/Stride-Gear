//console.log(data);
let contenedorCards = document.getElementById('contenedorCards')
let contenedorSelect = document.getElementById('contenedorSelect')
let search = document.getElementById('search')
let productosAgregados = JSON.parse(localStorage.getItem('productosCarritos'))
let productoPush = []
if (productosAgregados) {
    productoPush = productosAgregados
}
//FILTRO SELECT

let tipoDeIndumentaria = [... new Set(data.map(indumentaria => indumentaria.tipo))]

//console.log(tipoDeIndumentaria);


//CREACION Y RENDERIZADO DE CARDS
function renderCards(productos, contenedor) {

    contenedor.innerHTML = ''
    let template = document.createElement('template')


    productos.forEach(obj => {
        template = `
           <div class= 'flex flex-col  w-3/4 gap-3 p-3 bg-white rounded-lg md:w-1/3 lg:w-1/4 hover:scale-110 duration-700 mt-3  shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]' >
           
           <img class=" h-1/2 object-contain " src=" ${obj.imagen}" alt="${obj.modelo}">
           <h3 class= "font-medium pl-4 text-lg ">${obj.marca}</h3>
           <h3 class= "font-medium pl-4 text-lg ">${obj.modelo}</h3>
           
           <p class="pl-4 pb-[10px]"> ${obj.descripcion.slice(0, 40)}...</p>
           <div class='flex flex-row justify-around'>
           <a href="./detalles.html?id=${obj.id}" class= "bg-black text-white p-2 w-2/4 text-center rounded-xl ">Detalles</a>          
           ${!productoPush.includes(obj.id) ?

               `
               <button>
               <img class='w-[50px]' src="./assests/img/shopping-cart-verified-symbol_icon-icons.com_56123.png" alt="" data-compra ='${obj.id}'>
               </button> 
               `
              : 
               `
               <button>
               <img class='w-[50px]' src="./assests/img/shopping-cart-cancel-button_icon-icons.com_56130.png" alt="" data-compra ='${obj.id}'>
               </button> 
               `
        }
           </div>       
           </div>
           `
        contenedor.innerHTML += template
    });

}
//console.log( renderCards(data,contenedorCards));
renderCards(data, contenedorCards)

//CREACION Y RENDERIZACION DEL SELECT
function renderSelect(indumentaria, contenedor) {

    let template = document.createElement('template')

    indumentaria.forEach(obj => {
        template = `
        <option value="${obj}">${obj}</option>
        `
        contenedor.innerHTML += template
    });

}
renderSelect(tipoDeIndumentaria, contenedorSelect)

//FILTROS POR SEARCH
let productoIngresado = ''
search.addEventListener('keyup', e => {
    productoIngresado = e.target.value
    renderCards(marca(select(data, selecProducto), productoIngresado), contenedorCards)

})



//FILTROS POR SELECT
let selecProducto = []
contenedorSelect.addEventListener('change', e => {
    selecProducto = [...document.querySelectorAll('select')].map(select => select.value)//me devulve en un array el valor del cual halla seleccionado

    if (selecProducto == '') renderCards(data, contenedorCards)
    renderCards(marca(select(data, selecProducto), productoIngresado), contenedorCards)
})


let marca = (array, productoIngresado) => array.filter(productos => productos.marca.toLowerCase().includes(productoIngresado.trim().toLocaleLowerCase()))

let select = (array, selecProducto) => array.filter(productos => productos.tipo.includes(selecProducto))


//localStorage

contenedorCards.addEventListener('click', e => {
    let productosID = e.target.dataset.compra
    //console.log(productosID);
    if (productosID) {
        if (!productoPush.includes(productosID))
            productoPush.push(productosID)
        else
            productoPush = productoPush.filter(id => id != productosID)

    }
    localStorage.setItem('productosCarritos', JSON.stringify(productoPush))
    console.log(productoPush);
    renderCards(marca(select(data, selecProducto), productoIngresado), contenedorCards)
})