// url.search.params 
//URLSearchParams(string)

console.log(window);
let sectionTarjetas = document.getElementById("cajaTarjetas")

let parametro = location.search

let params = new URLSearchParams(parametro)
console.log(params);

let nombre = params.get("parametro")//hace referencia al parametro, para que me devuelva el valor
console.log(nombre);

let evento = eventos.find( objetoevento => objetoevento.nombre === nombre)

function crearMaqueta(elementoHtml, objetoEvento){
        elementoHtml.innerHTML += `<div class="card col-5" ;">
            <img src= ${objetoEvento.image} class="card-img-top" alt="...">
            <div class="card-body d-flex flex-column">
                <h4>${objetoEvento.name}</h4>
                <p class="card-text">${objeto.description}</p>
                <p class="card-text text-center">${objetoEvento.date}</p>
            </div>
            <div class="card-a d-flex  justify-content-evenly">
                <a href="#" class="card-link">${ "$" + objetoEvento.price}</a>
                <a href="" class="card-link ml-1">Details</a>
            </div>
        </div>`
}

crearMaqueta(sectionTarjetas, evento)

