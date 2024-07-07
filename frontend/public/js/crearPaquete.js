
console.log("crearPaquete.js cargado correctamente");

document.addEventListener("DOMContentLoaded", ()=>{


    //const servidorURL = "http://viaja2024.alwaysdata.net";
    const servidorURL = "http://localhost:3001"
    
    const formCrearPaquetes = document.querySelector("#formulario-crear-paquetes");
    const opcionesIdDestino = document.querySelector("#id_destino");

    console.log("DOMContentLoaded: crearPaquete.js cargado correctamente");

    const listarDestinos = async ()=>{

        try {
            const respuestaDestinos =  await axios.get(`${servidorURL}/destinos/`);
            const destinos = respuestaDestinos.data;
            console.log(destinos);

            opcionesIdDestino.innerHTML=``;

         
            destinos.forEach(destino=> {
                const optionElement = document.createElement('option');
                optionElement.value = destino.iddestinos;  
                optionElement.textContent = destino.titulo_destino + ' - ' + destino.descripcion_destino;  
                optionElement.dataset.region = destino.region_destino;
                optionElement.classList.add('input');
                opcionesIdDestino.appendChild(optionElement);
                
            })

            opcionesIdDestino.addEventListener('change', ()=>{
                const optionSeleccionada = opcionesIdDestino.options[opcionesIdDestino.selectedIndex];
                document.querySelector("#destino").value = optionSeleccionada.dataset.region;
                document.querySelector("#id_destino").value = optionSeleccionada.value;


            })

            
        } catch (error) {
            console.error("Error al traer iddestino", error)
    }
        
        
    

    
    }

    listarDestinos();

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
            console.log(nuevoPaquete);
            await axios.post(`${servidorURL}/paquetes/`, nuevoPaquete);
            //limpiar formulario
            formCrearPaquetes.reset();
            //alert o modal y regresar a listar paquetes
            alert("paquete creado");
           
            window.location.href = `/miperfil`;
        } catch (error) {
            console.error("Error al crear el paquete", error)
        }

    }) 


});

window.addEventListener("load", () => {
    console.log("Window loaded: crearPaquete.js cargado correctamente");
});