console.log("editarDestino.js cargado correctamente");

document.addEventListener("DOMContentLoaded", ()=>{
    const formEditarDestinos = document.querySelector("#formulario-editar-destino");

    console.log("DOMContentLoaded: editarDestino.js cargado correctamente");

    const servidorURL = "http://viajarturismo.alwaysdata.net";
    //const servidorURL = "http://localhost:3001"

    const parametrosURL = new URLSearchParams(window.location.search);
    const idDestino =parametrosURL.get("id");

    const listarUnDestino = async (id)=>{
        try {
            const respuesta =  await axios.get(`${servidorURL}/destinos/${id}`);
            const destino = respuesta.data;

            console.log(destino);

           
            document.querySelector("#titulo").value = destino.titulo_destino;
            document.querySelector("#descripcion").value = destino.descripcion_destino;
            document.querySelector("#region").value = destino.region_destino;
            document.querySelector("#ciudad").value = destino.ciudad;
            document.querySelector("#provincia").value = destino.provincia;
            document.querySelector("#pais").value = destino.pais;
            document.querySelector("#img_destino").value = destino.img_destino;

        } catch (error) {
            console.error("Error al editar el destino", error.message)
        }

    } 

    if(idDestino){
        listarUnDestino(idDestino);
    }else{
        console.log("algo falló");
    }

    formEditarDestinos.addEventListener("submit", async function (event){
        event.preventDefault();
        const editarDestino = {
            titulo_destino: document.querySelector("#titulo").value,
            descripcion_destino: document.querySelector("#descripcion").value,
            region_destino: document.querySelector("#region").value,
            ciudad: document.querySelector("#ciudad").value,
            provincia: document.querySelector("#provincia").value,
            pais: document.querySelector("#pais").value,
            img_destino: document.querySelector("#img_destino").value,
        };
        try {
            console.log(editarDestino +" "+ idDestino);
            await axios.put(`${servidorURL}/destinos/${idDestino}`, editarDestino);
            //console.log(editarDestino);
            //limpiar formulario
            formEditarDestinos.reset();
            //alert o modal y regresar a listar destinos
            alert("destino editado");
            
            window.location.href = `/miperfil`;
        } catch (error) {
            console.error("Error al editar el destino", error.message)
        }

    }) 

})


window.addEventListener("load", () => {
    console.log("Window loaded: editarDestino.js cargado correctamente");
});