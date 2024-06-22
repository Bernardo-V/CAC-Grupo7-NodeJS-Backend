// require('dotenv').config();
// const express = require ("express")
// const app = express()
// const http = require ("http")
// const cors = require ("cors")
// const path = require('path');

// // const posteosRouter = require ("./routes/posteosRouter.js")
// const port = process.env.PORT || 4000;
// app.use(cors())
// app.use(express.json()) //  analizados en formato req.body



// // Middleware para servir archivos estáticos desde la carpeta public/
// app.use(express.static(path.join(__dirname, 'public')));


// // Configuración de las rutas de tu aplicación
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public'));
// });

// // Configuración de las rutas de tu aplicación
// app.get('/index', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'views', 'index.html'));
// });

//     /* PEDIDO HTTP/RUTA - FUNCION = CONTROLER     */
//    // Configuración de la ruta para renderizar index.html
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/views/index.html'));
// });
// app.get('/patagonia', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/views/patagonia.html'));
// });
// app.get('/norte', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/views/norte.html'));
// });
// app.get('/nosotros', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/views/nosotros.html'));
// });
// app.get('/contacto', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/views/contacto.html'));
// // });
// app.listen (port,()=>{
//     console.log(`Servidor escuchando en http://localhost:${port}`);
// })


 const apiUrl = 'http://localhost:3001';

        function fetchUsers() {

            fetch(`${apiUrl}/usuarios`)

                .then(response => response.json())
                .then(data => {
                    const userList = '';
                    userList.innerHTML = '';
                    data.forEach(usuarios => {
                        // console.log(usuarios)
                        // const li = document.createElement('li');
                        // li.innerHTML = `<strong>Nombre Completo: ${user.username} </strong>` ;
                        // li.innerHTML += `<br>E-mail: ${user.email}`;
                        // userList.appendChild(li);
                    });
                });
        }
fetchUsers();


// Función para obtener y mostrar los paquetes
async function mostrarPaquetes() {
  try {
    const response = await fetch(`${apiUrl}/viajes`);
    if (!response.ok) {
      throw new Error('No se pudo obtener la lista de paquetes');
    }
    const data = await response.json();

    const paquetesContainer = document.getElementById('paquetesContainer');

    // Iterar sobre cada paquete y crear la estructura HTML dinámicamente
    data.forEach(paquete => {
      console.log(paquete);

          const card = document.createElement('div');
      card.classList.add('card');

      const imgDiv = document.createElement('div');
      imgDiv.classList.add('zoom-img');
      const imgCardDiv = document.createElement('div');
      imgCardDiv.classList.add('img-card');
      const img = document.createElement('img');
      img.src = paquete.img_paquete;
      img.alt = paquete.titulo_paquete;
      imgCardDiv.appendChild(img);
      imgDiv.appendChild(imgCardDiv);
      card.appendChild(imgDiv);
      const textDiv = document.createElement('div');
      textDiv.classList.add('text');
      const ratingSpan = document.createElement('span');
      ratingSpan.classList.add('rating');
      const h2 = document.createElement('h2');
      h2.textContent = paquete.titulo_paquete;
      const costP = document.createElement('p');
      costP.classList.add('cost');
      costP.textContent = `$${paquete.precio_paquete} / Por Persona`;
      const cardBoxDiv = document.createElement('div');
      cardBoxDiv.classList.add('card-box');
      const timeP = document.createElement('p');
      timeP.classList.add('time');
      timeP.textContent = ` ${paquete.dias_paquete}`;
      const locationP = document.createElement('p');
      locationP.classList.add('location');
      locationP.textContent = `${paquete.destino_paquete}`;
      cardBoxDiv.appendChild(timeP);
      cardBoxDiv.appendChild(locationP);
      textDiv.appendChild(ratingSpan);
      textDiv.appendChild(h2);
      textDiv.appendChild(costP);
      textDiv.appendChild(cardBoxDiv);
      card.appendChild(textDiv);
      paquetesContainer.appendChild(card);
    });

  } catch (error) {
    console.error('Error al obtener los paquetes:', error);
  }
}

// Llamar a la función para mostrar los paquetes al cargar la página
mostrarPaquetes();