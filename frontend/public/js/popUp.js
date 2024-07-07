async function updateUsuarioFromPopup() {
    const nombre = document.getElementById('nombrePopUp').value;
    const apellido = document.getElementById('apellidoPopUp').value;
    const email = document.getElementById('emailPopUp').value;
    const nuevaContraseña = document.getElementById('passwordPopUp').value;
    const id = document.getElementById('idUsuarioPopUp').value;

    const formData = {
        nombre: nombre,
        apellido: apellido,
        mail: email,
        id:id
    };
    // Agregar nuevaContraseña al formData solo si no está vacía
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
                $("#emailPopUp-error").text(dataResponse.message);
                }
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }
        }
    } catch (error) {
        console.error('Error al actualizar usuario:', error.message);
        // Mostrar mensaje de error en un lugar específico si es necesario
        // Por ejemplo:
        // $("#error-message").text('Error al actualizar usuario: ' + error.message);
    }
}

