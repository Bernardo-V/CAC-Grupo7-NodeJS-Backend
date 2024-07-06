// Función para obtener y mostrar datos del usuario
async function datosUsuario() {
    try {
        // Obtener el JWT desde las cookies
        const jwtCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);
        // Decodificar el JWT para obtener los datos
        const decoded = decodeJWT(jwtCookie);
        // Obtener el idusuarios del JWT decodificado
        const idusuario = decoded.id;
        // Realiza la petición GET al servidor
        $.ajax({
            type: "GET",
            url: `/usuarios/${idusuario}`,
            contentType: "application/json",
            success: function (data) {
                // Actualizar los campos en el formulario con los datos obtenidos del servidor
                const nombre = document.getElementById('nombre');
                nombre.value = data.nombre;
                const apellido = document.getElementById('apellido');
                apellido.value = data.apellido;
                const email = document.getElementById('email');
                email.value = data.mail;
                const rol = data.superUsu;
                if (rol === 1) {
                    // document.getElementById('boletoTableContainer').style.display = 'none';
                    document.getElementById('vistaAdmin').style.display = 'block';
                    document.getElementById('usuariosTableContainer').style.display = 'block';
                    document.getElementById('comentTableContainer').style.display = 'block';
                    verTodosUsu(idusuario)
                }
                else if(rol === 0){
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error en la solicitud:", xhr);
            }
        });
    } catch (error) {
    console.error('Error al obtener los datos del usuario:');
  }
}

async function updateUsuario() {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const email = document.getElementById('email').value;
    const nuevaContraseña = document.getElementById('nueva-contraseña').value;

    const formData = {
        nombre: nombre,
        apellido: apellido,
        email: email
    };
     // Agregar nuevaContraseña al formData solo si no está vacío
    if (nuevaContraseña.trim() !== '') {
        formData.password = nuevaContraseña;
    }

    try {
        const { response, dataResponse } = await enviarDatos(formData);
        if (response.ok) {
            alert('Los datos fueron actualizados exitosamente.');
            location.reload(); // Recargar la página actual
        } else {
          if (response.status = 409) {
            if (dataResponse.message === "Email ya existe en la base de datos") {
                $("#email-error").text(dataResponse.message);
                }
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }
        }
    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
    }
}

async function postUsuario() {
                const nombre = document.querySelector('#nombrePopUp').value;
                const apellido = document.querySelector('#apellidoPopUp').value;
                const email = document.querySelector('#emailPopUp').value;
                const password = document.querySelector('#passwordPopUp').value;
                // Verificar si algún campo está vacío
                if (nombre === '' || apellido === '' || email === '' || password === '') {
                    alert('DEBE COMPLETAR TODOS LOS CAMPOS');
                    return; // Salir de la función si algún campo está vacío
                }
                const formData = {
                nombre: nombre,
                apellido: apellido,
                mail: email,
                password:password
                };
    // Realiza la petición POST al servidor
            $.ajax({
                type: "POST",
                url: "/usuarios/",
                contentType: "application/json",
                data: JSON.stringify(formData),
                success: function(data) {
                    // Maneja la respuesta del servidor
                    console.log("Respuesta del servidor:", data);
                    alert('usuario Creado');
                    location.reload(); // Recargar la página actual
                },
              error: function (xhr, textStatus, errorThrown) {
                  console.error("Error en la solicitud:", xhr);
                    if (xhr.status === 404) {
                        $("#email-error").text("El usuario ya está registrado");
                        alert('El email ya está registrado"')
                        
                    } else {
                        // Maneja otros errores posibles
                        alert("Error en el registro. Por favor, inténtelo de nuevo.");
                    }
                }
            });
}

function crearUsuario(){
     fetch('../views/popUpUsuario.html')
            .then(response => response.text())
            .then(html => {
                // Insertar el contenido del popup en el DOM
                document.body.insertAdjacentHTML('beforeend', html);
                
                const titulo = document.getElementById('accionForm');
                titulo.textContent = 'Crear Usuario';
                 var accionBtn = document.getElementById('accionBtn');
                accionBtn.textContent = 'Crear';
                accionBtn.setAttribute('onclick', 'postUsuario()');
                // Mostrar el popup
                const popup = document.querySelector('#popup');
                popup.style.display = 'block';
            })
        .catch(error => console.error('Error al cargar popupUsuario.html', error));
}
async function enviarDatos(formData) {
    try {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        };
        // Si no hay nuevaContraseña en formData, elimina esa propiedad del cuerpo de la solicitud
        if (!formData.hasOwnProperty('nuevaContraseña')) {
            delete requestOptions.body.nuevaContraseña;
        }
        // Obtener el JWT desde las cookies
        const jwtCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);
        // Decodificar el JWT para obtener los datos
        const decoded = decodeJWT(jwtCookie);
        // Obtener el idusuarios del JWT decodificado
        const idusuario = decoded.id;
        
        // Agregar el ID del usuario al formData si no está presente
        if (!formData.id) {
            formData.id = idusuario;
        }
        const response = await fetch(`/usuarios/${formData.id}`, requestOptions);
        const dataResponse = await response.json();

        return { response, dataResponse }; // Devolver la respuesta y los datos de la respuesta

        // if (response.status = 409) {
        //     if (dataResponse.message === "DNI ya existe en la base de datos") {
        //         console.log(dataResponse.message);
        //         $("#dni-error").text(dataResponse.message);
        //         } else if (dataResponse.message === "Email ya existe en la base de datos") {
        //         $("#email-error").text(dataResponse.message);
        //         }
        //     if (!response.ok) {
        //         throw new Error(`HTTP error! Status: ${response.status}`);
        //     }
        //      // Si la actualización fue exitosa, mostrar una alerta y recargar la página
        // if (response.ok) {
        //     alert('Los datos fueron actualizados exitosamente.');
        //     location.reload(); // Recargar la página actual
        // }
        // }
    } catch (error) {
        console.error('Error al enviar datos al servidor:', error);
    }
}


// VER TODOS LOS USUARIOS SIENDO ADMIN o SUPER ADMIN
async function verTodosUsu(usuarioActualId) {
    try {
        $.ajax({
            type: "GET",
            url: `/usuarios/`,
            contentType: "application/json",
            success: function (data) {
                // Inicializar DataTable
                const table = $('#usuariosTable').DataTable();
                // Limpiar cualquier dato previo en la tabla
                table.clear();
                // Rellenar la tabla con los datos obtenidos
                data.filter(user => user.idusuarios !== usuarioActualId).forEach(data => {
                    table.row.add([
                        data.nombre,
                        data.apellido,
                        data.mail,
                         `<button class="btn btn-danger" style="text-align: center;" onclick="PopUpDelete('${data.nombre}', '${data.apellido}', ${data.idusuarios})"><i class="fa-solid fa-trash"></i></button>
                        <button class="btn btn-sucess" style="text-align: center;" onclick="editarUsuario('${data.nombre}', '${data.apellido}', '${data.mail}', ${data.idusuarios})"><i class="fa-solid fa-pen"></i></button>`
                    ]).draw(false);
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error en la solicitud:", xhr);
            }
        });
        $.ajax({
            type: "GET",
            url: `/comentarios/`,
            contentType: "application/json",
            success: function (data) {
                // Inicializar DataTable
                const table = $('#comentTable').DataTable();
                // Limpiar cualquier dato previo en la tabla
                table.clear();
                // Rellenar la tabla con los datos obtenidos
                data.forEach(data => {
                    table.row.add([
                        data.nombre,
                        data.apellido,
                        data.mail,
                        data.comentario,
                    ]).draw(false);
                });
                
            },
            error: function (xhr, textStatus, errorThrown) {
                console.error("Error en la solicitud:", xhr);
            }
        });

    } catch (error) {
    console.error('Error al obtener los datos del usuario:');
  }
}



// Función para borrar un usuario
function borrarUsuario(userId) {

    const idUsuario = document.querySelector('#idUsuarioDelete').value;
    console.log(idUsuario);
    $.ajax({
        type: "DELETE",
        url: `/usuarios/${idUsuario}`,
        success: function () {
            alert('Usuario borrado exitosamente');
            location.reload(); // Recargar la página actual
            datosUsuario(); // Actualizar la tabla después de borrar el usuario
        },
        error: function (xhr, textStatus, errorThrown) {
            console.error("Error al borrar el usuario:", xhr);
        }
    });
}

// funcion para editar datos de un usuario
function editarUsuario(nombre,apellido,email,id) {
     fetch('../views/popUpUsuario.html')
            .then(response => response.text())
            .then(html => {
                // Insertar el contenido del popup en el DOM
                // console.log(nombre + apellido + email + id + dni)

                document.body.insertAdjacentHTML('beforeend', html);

                document.querySelector('#nombrePopUp').value = nombre;
                document.querySelector('#apellidoPopUp').value = apellido;
                document.querySelector('#emailPopUp').value = email;
                document.querySelector('#idUsuarioPopUp').value = id;
                const titulo = document.getElementById('accionForm');
                titulo.textContent = 'Editar Usuario';
                var accionBtn = document.getElementById('accionBtn');
                accionBtn.textContent = 'Guardar';
                accionBtn.setAttribute('onclick', 'updateUsuarioFromPopup()');

                updateUsuarioFromPopup
                // Mostrar el popup
                const popup = document.querySelector('#popup');
                popup.style.display = 'block';
            })
        .catch(error => console.error('Error al cargar popupUsuario.html', error));
}