// Evento que se dispara al cargar la página
window.addEventListener("load", function () {
    updateNav(); // Actualiza la barra de navegación según el estado de autenticación

        var perfilDropdown = document.getElementById("perfilDropdown");

    // Controlador para abrir el menú al hacer hover
    perfilDropdown.addEventListener("mouseenter", function() {
        this.classList.add("show");
        this.setAttribute("aria-expanded", "true");
        this.nextElementSibling.classList.add("show");
    });

    // Controlador para cerrar el menú al quitar el hover
    perfilDropdown.addEventListener("mouseleave", function() {
        this.classList.remove("show");
        this.setAttribute("aria-expanded", "false");
        this.nextElementSibling.classList.remove("show");
    });

    // Controlador para abrir el menú al hacer click en "Mi Perfil"
    perfilDropdown.addEventListener("click", function(e) {
        e.preventDefault(); // Evitar que el enlace redirija
        var isOpen = this.classList.contains("show");

        // Toggle para abrir o cerrar el menú
        if (!isOpen) {
            this.classList.add("show");
            this.setAttribute("aria-expanded", "true");
            this.nextElementSibling.classList.add("show");
        } else {
            this.classList.remove("show");
            this.setAttribute("aria-expanded", "false");
            this.nextElementSibling.classList.remove("show");
        }
    });
});

// Función para actualizar la barra de navegación
function updateNav() {
    const isLoggedIn = isAuthenticated(); // Verifica si el usuario está autenticado

    const navItem = document.querySelector('.nav-item-right');
    if (isLoggedIn) {
        // Usuario autenticado: Mostrar menú desplegable con opciones de perfil
        navItem.innerHTML = `
            <li class="nav-item dropdown">
                <a id="perfilDropdown" class="nav-link dropdown-toggle" href="#"
                    id="navbarDropdown" role="button"
                    aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-user-circle-o"></i> | Mi Perfil
                </a>
                <div class="dropdown-menu"
                    aria-labelledby="navbarDropdown">
                    <a class="dropdown-item" href="/miperfil">Mi Perfil</a>
                    <a class="dropdown-item" href="#" onclick="cerrarSesion()">Cerrar Sesión</a>
                </div>
            </li>
        `;
    } else {
        // Usuario no autenticado: Mostrar botón de inicio de sesión
        navItem.innerHTML = `
            <li class="nav-item">
                <a class="nav-link btn" id="botonI"
                   style="background-color: #e59b54;color: white;"
                   href="/login">
                   <i class="fa fa-user-circle-o"></i> | Iniciar Sesión
                </a>
            </li>
        `;
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    // Eliminar el token y realizar otras acciones necesarias (como eliminar cookies, etc.)
    document.cookie = 'jwt=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 UTC;';

    // Redirigir al usuario a la página de inicio
    window.location.href = '/';

    // Actualizar visualmente el botón de inicio de sesión
    updateNav();
}

// Verificar el estado de autenticación del usuario
function isAuthenticated() {
    const token = getToken(); // Obtener el token desde las cookies

    // Devolver true si el token es válido, de lo contrario false
    return !!token; // Convierte el token a un booleano
}

// Obtener el token de las cookies
function getToken() {
    const cookies = document.cookie.split('; ');
    const jwtCookie = cookies.find(cookie => cookie.startsWith('jwt='));

    if (jwtCookie) {
        return jwtCookie.split('=')[1];
    }
    return null;
}
