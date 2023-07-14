// url.search.params 
//URLSearchParams(string)

// console.log([window]);
// console.log(window.location);
let sectionTarjetas = document.getElementById("cajaTarjetas")

let parametro= location.search
// console.log(parametro);

let params = new URLSearchParams(parametro)
// console.log(params);

let nombreId = params.get('id')//hace referencia al parametro, para que me devuelva el valor
// console.log(nombreId);

let evento = data.events.find( event => event._id === nombreId)
// console.log(evento);

function crearMaqueta(elementoHtml, objetoEvento){
        elementoHtml.innerHTML += `<div class="caja card col-5" ;">
            <img src= ${objetoEvento.image} class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column">
                <h4>${objetoEvento.name}</h4>
                <p class="card-text">${objetoEvento.description}</p>
                <p class="card-text text">${objetoEvento.category + " It has a capacity for "+ objetoEvento.capacity + " people."} ${(objetoEvento.assistance && objetoEvento.assistance + " people attended this event.") || ""}${(objetoEvento.estimate && "It is estimated that " + objetoEvento.estimate + " people attended this event.") || ""} </p>
                <p class="card-text text-center">${objetoEvento.date}</p>
            </div>
            <div class="card-a d-flex  justify-content-evenly">
                <a href="#" class="card-link">${ "$" + objetoEvento.price}</a>
                <a href="" class="card-link ml-1">Details</a>
            </div>
        </div>`
}

crearMaqueta(sectionTarjetas, evento)

