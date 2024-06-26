const apiUrl = 'http://localhost:3001';
 
// Función para obtener y mostrar datos del usuario
async function datosUsuario(param) {
    try {
        const response = await fetch(`/usuarios/miperfil`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Para enviar cookies con la solicitud
        });

        const data = await response.json();
        const nombre = document.getElementById('nombre');
        nombre.value = data.nombre;
        const apellido = document.getElementById('apellido');
        apellido.value = data.apellido;
        const email = document.getElementById('email');
        email.value = data.mail;
      
        // data.forEach(user => {
             console.log(data);
        // });

  } catch (error) {
    console.error('Error al obtener los paquetes:', error);
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

        const response = await fetch(`/usuarios/7`, requestOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Respuesta del servidor:', data);

        // Actualizar los campos en el formulario con la respuesta del servidor (si es necesario)
        // const nombreInput = document.getElementById('nombre');
        // const apellidoInput = document.getElementById('apellido');
        // const emailInput = document.getElementById('email');
        // nombreInput.value = data.nombre;
        // apellidoInput.value = data.apellido;
        // emailInput.value = data.mail;

    } catch (error) {
        console.error('Error al enviar datos al servidor:', error);
    }
}



window.addEventListener("load", function() {

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
        


// // Función modificar un usuario
// async function enviarDatos(param) {
//     try {
//       const response = await fetch(`/usuarios/7`, {
//               method: 'put',
//               headers: {
//                 'Content-Type': 'application/json'
//               },
//             //   body: JSON.stringify(formData)
//             });

//         const data = await response.json();
//         const nombre = document.getElementById('nombre');
//         nombre.value = data.nombre;
//         const apellido = document.getElementById('apellido');
//         apellido.value = data.apellido;
//         const email = document.getElementById('email');
//         email.value = data.mail;
      
//         // data.forEach(user => {
//              console.log(data);
//         // });

//   } catch (error) {
//     console.error('Error al obtener los paquetes:', error);
//   }
// }


// Llamar a la función para mostrar traer los datos
datosUsuario();

