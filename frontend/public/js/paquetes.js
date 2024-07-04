

document.addEventListener("DOMContentLoaded", ()=>{

    const servidorURL = "http://viaja2024.alwaysdata.net";
    //const servidorURL = "http://localhost:3001"

    const bodyTablaPaquetes = document.querySelector("#body-tabla-paquetes");
    
   // const formEditarPaquetes = document.querySelector("#formulario-editar-paquetes");

    // LEER DATOS DE PAQUETES

    const listarPaquetes = async ()=>{
        try {
            const respuesta = await axios.get (`${servidorURL}/paquetes`)
            //console.log(respuesta.data);
            const paquetes = respuesta.data;

            //limpiar tabla
            bodyTablaPaquetes.innerHTML="";

            //iterar datos y agregar nuevos

            paquetes.forEach(paquete => {

                //crear fila:
                const fila = document.createElement("tr");

                //crear celdas:
                const celdaNombrePaquete= document.createElement("td");
                const celdaDestino= document.createElement("td");
                const celdaDescripcion= document.createElement("td");
                const celdaDias= document.createElement("td");
                const celdaAcciones= document.createElement("td");
                const ulAcciones = document.createElement("ul");
                const liEditar = document.createElement("li");
                const liEliminar = document.createElement("li");

                //asignar el contenido a las celdas creadas:
                celdaNombrePaquete.textContent = paquete.titulo_paquete;
                celdaDestino.textContent = paquete.destino_paquete;
                celdaDescripcion.textContent = paquete.descripcion_paquete;
                celdaDias.textContent = paquete.dias_paquete;

                //crear boton eliminar
                const botonEliminar = document.createElement("button");
                botonEliminar.textContent = "Eliminar";
                botonEliminar.addEventListener("click", ()=>{
                    //alert("Eliminar paquete id: "+paquete.idpaquetes);

                    borrarPaquete(paquete.idpaquetes);
                }) // chequear

                //crear boton editar
                const botonEditar = document.createElement("a");
                botonEditar.href = `../views/editarPaquetes.html?id=${paquete.idpaquetes}`;
                botonEditar.textContent="Editar";

                //clases
                celdaNombrePaquete.classList.add("td");
                ulAcciones.classList.add("table__button-control");
                botonEditar.classList.add("buttonTable--editar");
                botonEliminar.classList.add("buttonTable--eliminar");


                //agregar botones a la celda acciones
                liEditar.appendChild(botonEditar);
                liEliminar.appendChild(botonEliminar)
                ulAcciones.appendChild(liEditar);
                ulAcciones.appendChild(liEliminar);
                celdaAcciones.appendChild(ulAcciones);
                

                //agregar las celdas a la fila
                fila.appendChild(celdaNombrePaquete);
                fila.appendChild(celdaDestino);
                fila.appendChild(celdaDescripcion);
                fila.appendChild(celdaDias);
                fila.appendChild(celdaAcciones);

                //agregar la fila a la tabla
                bodyTablaPaquetes.appendChild(fila);






                
            });
/* 
            <tr>
                <td class="td"  data-td>Bariloche PROMO</td>
                <td>Patagonia</td>
                <td>Pasajes Aereos: Buenos Aires / Bariloche / Buenos Aires</td>
                <td>4 días / 3 noches</td>
                <td>
                  <ul class="table__button-control">
                    <li>
                      <a href="../views/editarPaquetes.html" class="buttonTable--editar">Editar</a>
                    </li>
                    <li>
                      <button class="buttonTable--eliminar" type="button">Eliminar</button>
                    </li>
                  </ul>
                </td>
            </tr> */
            
        } catch (error) {
            console.log("Error al leer los paquetes")
        }
    }

    //funcion para eliminar un paquete
    const borrarPaquete = async (id)=>{
        try {
            await axios.delete(`${servidorURL}/paquetes/${id}`)
            //recargar lista de paquetes
            listarPaquetes();
            //modal o alert
            alert("eliminaste el paquete nro." + id);
            
        } catch (error) {
            console.error("Error al eliminar el paquete", error)
        }
    }






    //llamar a la funcion para cargar los paquetes al cargar la pagina
listarPaquetes();
})