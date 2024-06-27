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