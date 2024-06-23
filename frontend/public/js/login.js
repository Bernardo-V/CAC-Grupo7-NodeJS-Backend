$(function () {
   
    // Validación del formulario de inicio de sesión
    $("form[name='login']").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            }
        },
        messages: {
            email: "Por favor, ingresse un email valido",
            password: {
                required: "Por favor, ingrese una contraseña"
            }
        },
      submitHandler: function (form) {
        //  maneja el envío del formulario cuando la validación es exitosa
        async function handleLogin() {
           // Limpio los mensajes de error previos
            $("#email-error").text("");
          $("#password-error").text("");
          
          var formData = {
            email: $("input[name='email']").val(),
            password: $("input[name='password']").val()
          };

          var formData = {
            email: $("input[name='email']").val(),
            password: $("input[name='password']").val()
          };

          try {
            const response = await fetch('/usuarios/auth', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (data.status === 'ok') {
              window.location.href = data.redirect;
            } else if (response.status === 400) {
                if (data.message === "Usuario no encontrado") {
                  $("#email-error").text(data.message);
                } else if (data.message === "Contraseña Invalida") {
                  $("#password-error").text(data.message);
                } else {
                alert("Error en el inicio de sesión. Por favor, inténtelo de nuevo.");
                }
              }
          } catch (error) {
            alert('Error en el inicio de sesión. Por favor, inténtelo de nuevo.');
          }
          
          
        }
          handleLogin();
      }
    });

});
