const validationForm = (event) => {

    // alert('Estoy validando el formulario');
    event.preventDefault();

    const firtsname = document.querySelector('#firstname');
    const lastname = document.querySelector('#lastname');
    const email = document.querySelector('#email');
    // const country = document.querySelector('#country');
    // const image = document.querySelector('#image');
    const message = document.querySelector('#message');

    // Seleccionar todos los radio buttons con el nombre "year"
    const yearInputs = document.querySelectorAll('input[name="year"]');

    // Iterar sobre cada radio button y desmarcarlo
    yearInputs.forEach(input => {
        input.checked = false;
    });

    let validation = true;

    if(firtsname.value === ''){
        firtsname.classList.add('error');
        const divError = document.querySelector('#error-firstname');
        divError.textContent='Debes completar el campo nombre';
        validation = false;
    }
    if(lastname.value === ''){
        lastname.classList.add('error');
        const divError = document.querySelector('#error-lastname');
        divError.textContent='Debes completar el campo apellido';
        validation= false;
    }
    if(email.value === ''){
        email.classList.add('error');
        const divError = document.querySelector('#error-email');
        divError.textContent='Debes completar el campo email';
        validation = false;
    }

     if(validation){
        //  formRegister.submit();
        //  alert('h');
        const popup = document.querySelector('#popup');
        popup.style.display = 'block'; // Muestra el popup

        // Agregar clase para desenfoque al contenedor de contacto
        document.querySelector('#contact').classList.add('blur-container');

        setTimeout(() => {
            popup.style.display = 'none'; // Oculta el popup después de 4 segundos

            // Quitar clase de desenfoque al contenedor de contacto
            document.querySelector('#contact').classList.remove('blur-container');
        }, 4000);
     

          // Borrar todos los campos del formulario
        firtsname.value = '';
        lastname.value = '';
        email.value = '';
        // country.value = '';
        // image.value = '';
        message.value = '';
            // Desmarcar todos los radio buttons con el nombre "year"
        yearInputs.forEach(input => {
            input.checked = false;
        });
         // Borrar mensajes de error debajo de los campos de entrada
        const errorElements = document.querySelectorAll('.error');
        errorElements.forEach(errorElement => {
            errorElement.textContent = '';
            errorElement.classList.remove('error'); // Eliminar la clase de estilo que resalta el campo con error
        });
     }
}

formRegister.addEventListener('submit',validationForm);

// Obtén el elemento del textarea por su ID
const textarea = document.getElementById('message');

// Agrega un controlador de eventos al evento "focus"
textarea.addEventListener('focus', function() {
  // Selecciona automáticamente todo el texto en el textarea
  textarea.select();
});

