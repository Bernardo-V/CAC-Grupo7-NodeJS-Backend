$(document).ready(function () {

     // Función para mostrar el popup de carga
    function mostrarCargando() {
        $("#loadingPopup").fadeIn();
        const popup = document.querySelector('#loadingPopup');
        popup.style.display = 'block'; // Muestra el popup

        // Agregar clase para desenfoque al contenedor de contacto
        document.querySelector('#contact').classList.add('blur-container');
    }

    // Función para ocultar el popup de carga
    function ocultarCargando() {
        const popup = document.querySelector('#loadingPopup');
        popup.style.display = 'none'; // Oculta el popup después de 4 segundos
        // Quitar clase de desenfoque al contenedor de contacto
        document.querySelector('#contact').classList.remove('blur-container');
    }


    // Validación del formulario de contacto
    $("#formRegister").validate({
        rules: {
            firstname: {
                required: true
            },
            lastname: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true
            }
        },
        messages: {
            firstname: "Por favor, ingrese su nombre",
            lastname: "Por favor, ingrese su apellido",
            email: {
                required: "Por favor, ingrese su correo electrónico",
                email: "Por favor, ingrese un correo electrónico válido"
            },
            message: "Por favor, escriba su mensaje aquí"
        },
        submitHandler: function(form) {
            // Aquí puedes ejecutar el código que deseas cuando el formulario sea válido
            // Por ejemplo, enviar los datos mediante Ajax
        mostrarCargando();

            enviarFormulario();
        }
    });

    // Función para enviar el formulario mediante Ajax
    function enviarFormulario() {

        var formData = {
            mail: $("#email").val(),
            nombre: $("#firstname").val(),
            apellido: $("#lastname").val(),
            comentario: $("#message").val()
        };

        // Realiza la petición POST al servidor
        $.ajax({
            type: "POST",
            url: "/comentarios/",
            contentType: "application/json",
            data: JSON.stringify(formData),
            success: function (data) {
            ocultarCargando();

                // Maneja la respuesta del servidor
                console.log("Respuesta del servidor:", data);
                const popup = document.querySelector('#popup');
                popup.style.display = 'block'; // Muestra el popup

                // Agregar clase para desenfoque al contenedor de contacto
                document.querySelector('#contact').classList.add('blur-container');

                setTimeout(() => {
                    popup.style.display = 'none'; // Oculta el popup después de 4 segundos

                    // Quitar clase de desenfoque al contenedor de contacto
                    document.querySelector('#contact').classList.remove('blur-container');
                }, 4000);
                
              // Limpiar los campos del formulario después del éxito
                    $("#email").val("");
                    $("#firstname").val("");
                    $("#lastname").val("");
                    $("#message").val("");

            },
            error: function(xhr, textStatus, errorThrown) {
                console.error("Error en la solicitud:", xhr);
            }
        });
    }

    // Evento focus para seleccionar automáticamente el texto en el textarea
    $("#message").focus(function() {
        $(this).select();
    });
});
