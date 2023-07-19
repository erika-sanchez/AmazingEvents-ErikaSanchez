// url.search.params 
//URLSearchParams(string)

// console.log([window]);
// console.log(window.location);
const sectionTarjetas = document.getElementById("cajaTarjetas")

let events
fetch ("https://mindhub-xj03.onrender.com/api/amazing")
.then(respuesta => respuesta.json())
.then ( data => {
    events = data.events;
    let parametro= location.search
    // console.log(parametro);
    let params = new URLSearchParams(parametro)
    // console.log(params);
    let nombreId = params.get('id')//hace referencia al parametro, para que me devuelva el valor
    // console.log(nombreId);
    events = events.find( event => event._id == nombreId) // el metodo de find es que usa el primer elemento que cumpla con la condicion
    // console.log(evento);
    crearMaqueta(sectionTarjetas, events)
})
.catch(error => {
    console.error("Error fetching data:", error);
});

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



