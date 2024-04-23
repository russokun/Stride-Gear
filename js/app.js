import { marca, select } from "./modulo.js";
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
    contenedor.innerHTML = '';
    if (productos.length === 0) {
        renderNoResultsMessage(contenedor);
        return;
    }

    productos.forEach(obj => {
        let precioMostrar = obj.precio;
        if (obj.descuento) {
            // Si el producto tiene descuento, calcular el precio con descuento
            const precioDescuento = obj.precio - (obj.precio * (obj.descuento / 100));
            precioMostrar = `<del>${obj.precio}</del> $${precioDescuento}`;
        }

        let template = `
            <div class='flex flex-col w-3/4 gap-3 p-3 bg-white rounded-lg md:w-1/3 lg:w-1/4 hover:scale-110 duration-700 mt-3 shadow-[-10px_-10px_30px_4px_rgba(0,0,0,0.1),_10px_10px_30px_4px_rgba(45,78,255,0.15)]'>
                <img class="h-1/2 object-contain" src="${obj.imagen}" alt="${obj.modelo}">
                <h3 class="font-medium pl-4 text-lg">${obj.marca}</h3>
                <h3 class="font-medium pl-4 text-lg">${obj.modelo}</h3>
                <p class="pl-4 pb-[10px]">${obj.descripcion.slice(0, 40)}...</p>
                <p class="pl-4 pb-[10px] font-bold">$${precioMostrar}</p>
                <div class='flex flex-row justify-around'>
                    <a href="./detalles.html?id=${obj.id}" class="bg-black text-white p-2 w-2/4 text-center flex justify-center items-center rounded-xl">Detalles</a>
                    <button>
                        <img class='w-[50px]' src="" alt="">
                    </button>
                    ${!productoPush.includes(obj.id) ?
                        `<button>
                            <img class='w-[50px]' src="./assests/img/shopping-cart-verified-symbol_icon-icons.com_56123.png" alt="" data-compra ='${obj.id}'>
                        </button>` :
                        `<button>
                            <img class='w-[50px]' src="./assests/img/shopping-cart-cancel-button_icon-icons.com_56130.png" alt="" data-compra ='${obj.id}'>
                        </button>`
                    }
                </div>
            </div>`;
        
        contenedor.innerHTML += template;
    });
}

const renderNoResultsMessage = (contenedor) => {
    contenedor.innerHTML = "<h2 class='text-center'>No hay productos que coincidan con su búsqueda</h2>";
};


//console.log( renderCards(data,contenedorCards));
renderCards(data, contenedorCards)

//CREACION Y RENDERIZACION DEL SELECT
const renderSelect = (indumentaria, contenedor) => {
    const optionsHTML = createSelectOptionsWithAll(indumentaria)
    contenedor.innerHTML = optionsHTML
}

const createSelectOptionsWithAll = (indumentaria) => {
    const indumentariaConTodos = ['Todos', ...indumentaria]
    return createSelectOptions(indumentariaConTodos)
}

const createSelectOptions = (indumentaria) => {
    let options = ''
    indumentaria.forEach(obj => {
        options += `<option value="${obj}">${obj}</option>`
    })
    return options
}

renderSelect(tipoDeIndumentaria, contenedorSelect);


//FILTROS POR SEARCH
let productoIngresado = ''
search.addEventListener('keyup', e => {
    productoIngresado = e.target.value;
    if (selecProducto.includes('Todos')) {
        renderCards(marca(data, productoIngresado), contenedorCards);
    } else {
        renderCards(marca(select(data, selecProducto), productoIngresado), contenedorCards);
    }
});




//FILTROS POR SELECT
let selecProducto = []
contenedorSelect.addEventListener('change', e => {
    selecProducto = [...document.querySelectorAll('select')].map(select => select.value);
    if (selecProducto.includes('Todos')) {
        renderCards(data, contenedorCards);
    } else {
        renderCards(marca(select(data, selecProducto), productoIngresado), contenedorCards);
    }
});





//localStorage

contenedorCards.addEventListener('click', e => {
    let productosID = e.target.dataset.compra
    //console.log(productosID);
    if (productosID) {
        if (!productoPush.includes(productosID)){

            productoPush.push(productosID)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Producto agregado al carrito",
                showConfirmButton: false,
                timer: 1500
            });
        }
        else{
            productoPush = productoPush.filter(id => id != productosID)
            Swal.fire({
                title: "¿Deseas eliminar del carrito?",
            
                icon: "warning",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText : "Cancelar",
                confirmButtonText: "Si, eliminalo!"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Su producto ha sido eliminado!",
                        icon: "success"
                    });
                }
            }); 
        
            
        }
    }
    localStorage.setItem('productosCarritos', JSON.stringify(productoPush))
    console.log(productoPush);
    renderCards(marca(select(data, selecProducto), productoIngresado), contenedorCards)
})