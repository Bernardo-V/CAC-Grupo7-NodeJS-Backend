
document.addEventListener("DOMContentLoaded", ()=>{

    const servidorURL = "http://viaja2024.alwaysdata.net";
    //const servidorURL = "http://localhost:3001"
    
    const formCrearPaquetes = document.querySelector("#formulario-crear-paquetes");

    
    //funcion crear un nuevo paquete
    formCrearPaquetes.addEventListener("submit", async function (event){
        event.preventDefault();
        const nuevoPaquete = {
            titulo_paquete: document.querySelector("#titulo").value,
            descripcion_paquete: document.querySelector("#descripcion").value,
            img_paquete: document.querySelector("#imagen").value,
            precio_paquete: document.querySelector("#precio").value,
            dias_paquete: document.querySelector("#dias").value,
            destino_paquete: document.querySelector("#destino").value,
            id_destinos: document.querySelector("#id_destino").value,
        };
        try {
            //console.log(nuevoPaquete);
            await axios.post(`${servidorURL}/paquetes/`,nuevoPaquete)
            //limpiar formulario
            formCrearPaquetes.reset();
            //alert o modal y regresar a listar paquetes
            window.location.href = `./listarPaquetes.html`;
        } catch (error) {
            console.error("Error al crear el paquete", error)
        }

    }) 
})