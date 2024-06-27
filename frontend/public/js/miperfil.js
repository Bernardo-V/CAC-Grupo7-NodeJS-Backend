
// Función para decodificar el JWT
function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

// Función para obtener y mostrar datos del usuario
async function datosUsuario() {
    try {
        // Obtener el JWT desde las cookies
        const jwtCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('jwt=')).slice(4);
        // Decodificar el JWT para obtener los datos
        const decoded = decodeJWT(jwtCookie);
        // Obtener el idusuarios del JWT decodificado
        const idusuarios = decoded.id;
        // Realiza la petición GET al servidor
        $.ajax({
            type: "GET",
            url: `/usuarios/${idusuarios}`,
            contentType: "application/json",
            success: function (data) {
                // Actualizar los campos en el formulario con los datos obtenidos del servidor
                const nombre = document.getElementById('nombre');
                nombre.value = data.nombre;
                const apellido = document.getElementById('apellido');
                apellido.value = data.apellido;
                const email = document.getElementById('email');
                email.value = data.mail;
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
        email: email,
    };
     // Agregar nuevaContraseña al formData solo si no está vacío
    if (nuevaContraseña.trim() !== '') {
        formData.password = nuevaContraseña;
    }

    // Llama a la función que realiza la solicitud PUT
    await enviarDatos(formData);
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
        const idusuario= decoded.id;

        const response = await fetch(`/usuarios/${idusuario}`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);
    } catch (error) {
        console.error('Error al enviar datos al servidor:', error);
    }
}

// Evento que se dispara al cargar la página
window.addEventListener("load", function() {
    datosUsuario();

            // icono para mostrar contraseña
            showPassword = document.querySelector('.show-password');
            showPassword.addEventListener('click', () => {

                // elementos input de tipo clave
                password1 = document.querySelector('.password1');

                if ( password1.type === "text" ) {
                    password1.type = "password"
                    password2.type = "password"
                    showPassword.classList.remove('fa-eye-slash');
                } else {
                    password1.type = "text"
                    password2.type = "text"
                    showPassword.classList.toggle("fa-eye-slash");
                }

            })


});


// Llamar a la función para mostrar traer los datos
datosUsuario();

