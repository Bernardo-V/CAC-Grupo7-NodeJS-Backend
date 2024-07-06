console.log("crearDestino.js cargado correctamente");

document.addEventListener("DOMContentLoaded", ()=>{

    const servidorURL = "http://viajarturismo.alwaysdata.net";
    //const servidorURL = "http://localhost:3001"
    
    const formCrearDestino = document.querySelector("#formulario-crear-destino");

    console.log("DOMContentLoaded: crearDestino.js cargado correctamente");

    //funcion crear un nuevo destino
    formCrearDestino.addEventListener("submit", async function (event){
        event.preventDefault();
        const nuevoDestino = {
            titulo_destino: document.querySelector("#titulo").value,
            descripcion_destino: document.querySelector("#descripcion").value,
            region_destino: document.querySelector("#region").value,
            ciudad: document.querySelector("#ciudad").value,
            provincia: document.querySelector("#provincia").value,
            pais: document.querySelector("#pais").value,
            img_destino: document.querySelector("#img_destino").value,
        };
        try {
            console.log(nuevoDestino);
            await axios.post(`${servidorURL}/destinos/`, nuevoDestino);
            //limpiar formulario
            formCrearDestino.reset();
            //alert o modal y regresar a listar paquetes
            alert("destino creado correctamente");
            
            window.location.href = `/miperfil`;
        } catch (error) {
            console.error("Error al crear el destino", error.message)
        }

    }) 


});

window.addEventListener("load", () => {
    console.log("Window loaded: crearDestino.js cargado correctamente");
});