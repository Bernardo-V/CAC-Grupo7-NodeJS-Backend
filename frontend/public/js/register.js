function validarFormulario() {
    var nombre = document.getElementById("apellido").value;
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (password.length < 6) {
        alert("La contraseña debe tener al menos 6 caracteres.");
        return false;
    }

    alert("Registro exitoso:\nNombre de usuario: " + nombre + "\nCorreo electrónico: " + email);
    return true;
}

function guardarDatosL() {
    // Recuperar los datos del formulario
    // var user = document.getElementById("user").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    // Crear un objeto JSON con los datos
    var datos = {
      // user: user,
      email: email,
      password: password
    };
  
    // Convertir el objeto JSON a una cadena JSON
    var datosJSON = JSON.stringify(datos);
  
    // Guardar los datos en un archivo JSON (puedes ajustar esto según tus necesidades)
    // En este ejemplo, simplemente mostraremos los datos JSON en la consola.
    console.log(datosJSON);
  }

  function guardarDatosC() {
    // Recuperar los datos del formulario
    var nombre = document.getElementById("name").value;
    var apellido = document.getElementById("apellido").value;  
    var email = document.getElementById("email").value; 
    var affair = document.getElementById("affair").value;
    // var messaje = document.getElementById("messaje").value;
    // Crear un objeto JSON con los datos
    var datos = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      affair: affair
      // messaje: messaje
    };
  
    // Convertir el objeto JSON a una cadena JSON
    var datosJSON = JSON.stringify(datos);
  
    // Guardar los datos en un archivo JSON (puedes ajustar esto según tus necesidades)
    // En este ejemplo, simplemente mostraremos los datos JSON en la consola.
    console.log(datosJSON);
  }