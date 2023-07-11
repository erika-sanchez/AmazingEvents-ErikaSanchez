let containerTarjetas = document.getElementById("cajaTarjetas")

function crearCard(objeto){
        return` <div class="card col-5" ;">
            <img src= ${objeto.image} class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column">
                <h4>${objeto.name}</h4>
                <p class="card-text">${objeto.description}</p>
                <p class="card-text text-center">${objeto.date}</p>
            </div>
            <div class="card-a d-flex  justify-content-evenly">
                <a href="#" class="card-link">${ "$" + objeto.price}</a>
                <a href="#" class="card-link ml-1">Details</a>
            </div>
        </div>`
}

function imprimirCard (eventos){

    for (let evento of eventos) {
        
        containerTarjetas.innerHTML += crearCard(evento)
    }
}
imprimirCard(data.events)

console.log (data.currentDate, data.events)