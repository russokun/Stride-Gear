//CAPTURAS DEL DOM
let form = document.getElementById('formulario')
let comentario = document.getElementById('comentario')

//EVENT LISTENER
form.addEventListener('submit', e => {
    e.preventDefault();
    let comentarioInput = comentario.value
    console.log(comentario)
    Swal.fire(
        '¡Enviado!',
        'Tu consulta: "' + comentarioInput + '" se envió correctamente',
        'success'
    )
    form.reset();
});