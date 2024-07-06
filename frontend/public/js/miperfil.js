
    $(document).ready(function() {
    $('#usuariosTable').DataTable({
        columnDefs: [
            { orderable: false, targets: -1 } // Deshabilitar el sorting en la última columna (Acciones)
        ]
    });
    datosUsuario(); // Cargar datos del usuario al iniciar
});


   function closePopup() {
        const popup = document.querySelector('#popup');
    if (popup) {
        popup.remove();
    }
}

function saveUserData() {
    // Aquí puedes manejar la lógica para guardar los datos del usuario
    closePopup();
}

// Función para decodificar el JWT
function decodeJWT(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}






// Función para borrar un usuario
function PopUpDelete(nombre,apellido,id) {

   fetch('../views/popUp.html')
            .then(response => response.text())
            .then(html => {
                // Insertar el contenido del popup en el DOM
                document.body.insertAdjacentHTML('beforeend', html);
                 const nom = document.getElementById('nombreDelete');
                nom.textContent = nombre + ' ' + apellido;
                // document.querySelector('#nombreDelete').value = nombre;
                // document.querySelector('#apellidoDelete').value = apellido;
                document.querySelector('#idUsuarioDelete').value = id;
                // Mostrar el popup
                const popup = document.querySelector('#popup');
                popup.style.display = 'block';
            })
        .catch(error => console.error('Error al cargar popup.html', error));
  
}

// Evento que se dispara al cargar la página
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

                  passwordPopUp = document.getElementById('showPasswordPopUp');
                if ( passwordPopUp.type === "text" ) {
                    passwordPopUp.type = "password"
                    showPassword.classList.remove('fa-eye-slash');
                } else {
                    passwordPopUp.type = "text"
                    showPassword.classList.toggle("fa-eye-slash");
                }
            })


});


