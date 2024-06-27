$(document).ready(function() {
    // Validación del formulario de registro
    $("form[name='register']").validate({
        rules: {
            nombre: {
                required: true
            },
            apellido: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        messages: {
            nombre: "Por favor, ingrese nombre",
            apellido: "Por favor, ingrese apellido",
            email: {
                required: "Por favor, ingrese su correo electrónico",
                email: "Por favor, ingrese un correo electrónico válido"
            },
            password: "Por favor, ingrese una contraseña"
        },
        submitHandler: function(form) {
            // Limpia los mensajes de error previos
            $("#email-error").text("");
            $("#password-error").text("");
            $("#nombre-error").text("");
            $("#apellido-error").text("");

            // Obtén los datos del formulario
            var formData = {
                mail: $("input[name='email']").val(),
                password: $("input[name='password']").val(),
                nombre: $("input[name='nombre']").val(),
                apellido: $("input[name='apellido']").val()
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
                        // Redirige a una página de éxito o realiza alguna acción
                        // window.location.href = data.redirect;
                },
              error: function (xhr, textStatus, errorThrown) {
                  console.error("Error en la solicitud:", xhr);
                    if (xhr.status === 404) {
                      // alert("El correo electrónico ingresado ya existe. Por favor, ingrese otro correo.");
                     $("#email-error").text("El correo electrónico ya está registrado");
                    } else {
                        // Maneja otros errores posibles
                        alert("Error en el registro. Por favor, inténtelo de nuevo.");
                    }
                }
            });
        }
    });


    // Evento keyup para limpiar mensajes de error al escribir en los campos
    $('#nombre').on('keyup', function () {
        if ($(this).val().trim() !== '') {
            $('#nombre-error').text('');
        }
    });

    $('#apellido').on('keyup', function () {
        if ($(this).val().trim() !== '') {
            $('#apellido-error').text('');
        }
    });

    // Evento para mostrar/ocultar contraseña
    $('.show-password').on('click', function () {
        var passwordField = $('.password1');
        var type = passwordField.attr('type') === 'password' ? 'text' : 'password';
        passwordField.attr('type', type);
        $(this).toggleClass('fa-eye-slash');
    });
});
