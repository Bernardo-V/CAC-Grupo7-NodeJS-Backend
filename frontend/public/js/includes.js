document.addEventListener('DOMContentLoaded', function() {
    const headCommon = '../views/head.html';
    fetch(headCommon)
        .then(response => response.text())
        .then(data => {
            document.head.insertAdjacentHTML('beforeend', data);
        })
        .catch(error => console.error('Error al cargar el archivo común:', error));
});
