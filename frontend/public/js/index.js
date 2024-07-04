/* DOMContentLoaded*/ //para asegurar que el script se ejecute despues que el dom haya cargado

//const { default: axios } = require("axios");

document.addEventListener("DOMContentLoaded", ()=>{

  const paquetesContainer = document.querySelector("#paquetesContainer");

  const fetchPaquetes = async ()=>{

    try {
      const respuesta = await axios(`http://localhost:3001/paquetes`);
      //console.log(respuesta.data);
      const paquetes = respuesta.data;
      //Borrar todo antes de cargar?
      //paquetesContainer.innerHTML="";

      paquetes.forEach(paquete => {

        //creando elementos
        const card = document.createElement("div");
            const zoomImg = document.createElement("div");
                const imgCard = document.createElement("div");
            const text = document.createElement("div");
                const rating = document.createElement("span");
                const viajAR = document.createElement("h2");
                const cost = document.createElement("p");
                const cardBox = document.createElement("div");
                    const time = document.createElement("p");
                    const location = document.createElement("p");
              

        //asignar el contenido a los elementos
        imgCard.innerHTML=`<img src="${paquete.img_paquete}">`;
        const stars="⭐⭐⭐⭐⭐";
        rating.textContent= stars;
        viajAR.textContent=paquete.titulo_paquete;
        cost.textContent = paquete.precio_paquete;
        time.textContent = "🕓"+paquete.dias_paquete;
        location.textContent = "✈"+paquete.destino_paquete;
        //console.log(imgCard,rating,viajAR,cost,time,location);

        //clases
        card.classList.add("card");
        zoomImg.classList.add("zoom-img");
        imgCard.classList.add("img-card");
        text.classList.add("text");
        rating.classList.add("rating");
        //viajAR.classList.add();
        cost.classList.add("cost");
        cardBox.classList.add("card-box");
        time.classList.add("time");
        location.classList.add("location");


        //agregar los elementos en el html
        cardBox.appendChild(time);
        cardBox.appendChild(location);

        zoomImg.appendChild(imgCard);

        text.appendChild(rating);
        text.appendChild(viajAR);
        text.appendChild(cost);
        text.appendChild(cardBox);

        card.appendChild(zoomImg);
        card.appendChild(text);

        paquetesContainer.appendChild(card);





      });

      
/*       <!-- <div class="card">
                        <div class="zoom-img">
                            <div class="img-card">
                                <img src="img/LugaresFavoritos/Iguazu.jpg">
                            </div>
                        </div>
        
                        <div class="text">
                            <span class="rating">&#11088;&#11088;&#11088;&#11088;&#11088;</span>
                            <h2>ViajAR</h2>
                            <p class="cost">$1000 / Por Persona</p>
                            <div class="card-box">
                                <p class="time">&#128339; 3 Días</p>
                                <p class="location">&#9992; Pto Iguazú Misiones</p>
                            </div>
                        </div>
        
                    </div> --> */
    } catch (error) {
      console.error("Error al obtener los posteos", error)
    }


  }
  fetchPaquetes();


})


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