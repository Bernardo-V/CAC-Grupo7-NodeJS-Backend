
// Reemplaza 'TU_CLAVE_DE_API' con tu clave de API de OpenWeatherMap
const apiKey = '972c598cad0db80ef5d657e942d66811';

// La ubicación para la que deseas obtener el clima
const ciudad = 'Bariloche';
const pais = 'AR'; // Por ejemplo, 'US' para Estados Unidos

const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${apiKey}&units=metric&lang=es`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const climaDiv = document.getElementById('clima1');
        climaDiv.innerHTML = `
            <p class="tour-item-detail-subtitle"> Temperatura Hoy: ${data.main.temp_min} / ${data.main.temp_max}  ${data.weather[0].description}</p>   
             `;
        const climaDiv2 = document.getElementById('clima5');
        climaDiv2.innerHTML = `
        <p class="tour-item-detail-subtitle"> Temperatura Hoy: ${data.main.temp_min} / ${data.main.temp_max}  ${data.weather[0].description}</p>   
              `;
        const climaDiv3 = document.getElementById('clima7');
        climaDiv3.innerHTML = `
        <p class="tour-item-detail-subtitle"> Temperatura Hoy: ${data.main.temp_min} / ${data.main.temp_max}  ${data.weather[0].description}</p>  
              `;
         })
    .catch(error => {
        console.error('Error al obtener datos del clima:', error);
    });

const ciudad2 = 'Trelew';

const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad2},${pais}&appid=${apiKey}&units=metric&lang=es`;

fetch(url2)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const climaDiv4 = document.getElementById('clima2');
        climaDiv4.innerHTML = `
            <p class="tour-item-detail-subtitle"> Temperatura Hoy: ${data.main.temp_min} / ${data.main.temp_max}  ${data.weather[0].description}</p>   
             `;
        })
    .catch(error => {
        console.error('Error al obtener datos del clima:', error);
    });

    
const ciudad3 = 'Esquel';

const url3 = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad3},${pais}&appid=${apiKey}&units=metric&lang=es`;

fetch(url3)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const climaDiv5 = document.getElementById('clima3');
        climaDiv5.innerHTML = `
            <p class="tour-item-detail-subtitle"> Temperatura Hoy: ${data.main.temp_min} / ${data.main.temp_max}  ${data.weather[0].description}</p>   
             `;
        })
    .catch(error => {
        console.error('Error al obtener datos del clima:', error);
    });

    const ciudad4 = 'Ushuaia';

const url4 = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad4},${pais}&appid=${apiKey}&units=metric&lang=es`;

fetch(url4)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const climaDiv7 = document.getElementById('clima4');
        climaDiv7.innerHTML = `
            <p class="tour-item-detail-subtitle"> Temperatura Hoy: ${data.main.temp_min} / ${data.main.temp_max}  ${data.weather[0].description}</p>   
             `;
        })
    .catch(error => {
        console.error('Error al obtener datos del clima:', error);
    });


    const ciudad5 = 'Calafate';

const url5 = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad5},${pais}&appid=${apiKey}&units=metric&lang=es`;

fetch(url5)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        const climaDiv8 = document.getElementById('clima6');
        climaDiv8.innerHTML = `
            <p class="tour-item-detail-subtitle"> Temperatura Hoy: ${data.main.temp_min} / ${data.main.temp_max}  ${data.weather[0].description}</p>   
             `;
        })
    .catch(error => {
        console.error('Error al obtener datos del clima:', error);
    });
