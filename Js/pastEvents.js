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
                <a href="#" class="card-link ml-1 ">Details</a>
            </div>
        </div>`
}

function imprimirCard (eventos, containerTarjetas){
    for (let evento of eventos) {
        containerTarjetas.innerHTML += crearCard(evento);
    }
}
function filtroEventos( eventos, currentDate){
    let upComing = []
    for (let evento of eventos) {
        if (evento.date < currentDate){
            upComing.push(evento)
        }
    }
    return upComing
}
let upComing  = filtroEventos(data.events, data.currentDate)

imprimirCard(upComing, containerTarjetas)

console.log (data.currentDate, data.events)