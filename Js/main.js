import {  } from "../modules/function.js";
let containerTarjetas = document.getElementById("cajaTarjetas")
let inputSearch = document.getElementById('inputTypeSearch')
let contenedorInputs = document.getElementById('contenedorInputs')


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
                <a href="./pages/details.html?id=${objeto._id}" class="card-link ml-1">Details</a>
            </div>
        </div>`
}
function imprimirCard(eventos) {
    let template = ""
    for (let evento of eventos) {//recorrer , asigna 
            template += crearCard(evento);
        }
        containerTarjetas.innerHTML += template;
    }

// imprimirCard(data.events)

function mensaje (){
    const mensaje = document.createElement('p');
        mensaje.textContent = 'No se encontraron resultados.';
        containerTarjetas.appendChild(mensaje);
}
// console.log (data.currentDate, data.events)

let events;

fetch ("https://mindhub-xj03.onrender.com/api/amazing")
.then(respuesta => respuesta.json())
.then ( data => {
        events = data.events;
        let categorias = data.events.map(evento => evento.category);
        let categoriasNoRepeat = new Set(categorias);
        let categoriasUnicas = Array.from(categoriasNoRepeat);
        mostrarCheckbox(categoriasUnicas, contenedorInputs);
        imprimirCard(events, containerTarjetas)
        let checkbox = document.querySelectorAll("input[type='checkbox']");
        let arraycheckbox = Array.from(checkbox)
        console.log(arraycheckbox);

        contenedorInputs.addEventListener("change", (e) => {

            let listas = inputSearch.value.toLowerCase()
            let checkFiltradas = arraychecked(arraycheckbox)
            let filtrosarray = filtrosCruzados(events, listas, checkFiltradas)
            console.log("Evento", filtrosarray);
            containerTarjetas.innerHTML = ""
            if (filtrosarray.length == 0){
                mensaje()
            }else{
                imprimirCard(filtrosarray)
            }
        });

        inputSearch.addEventListener('input', searchInputInfo);

        function searchInputInfo(e) {
            let listas = inputSearch.value.toLowerCase()
            let checkFiltradas = arraychecked(arraycheckbox)
            let filtrosarray = filtrosCruzados(events, listas, checkFiltradas)
            console.log("Evento", filtrosarray);
            containerTarjetas.innerHTML = ""
            if (filtrosarray.length == 0){
                mensaje()
            }else{
                imprimirCard(filtrosarray)
            }
        }
    })
.catch((error)=>{
    console.error("Error fetching data:",error);
})

let categoriasSeleccionadas = [];

function filterSearch(lista, searchValue) {
    return lista.filter(evento => evento.name.toLowerCase().includes(searchValue.toLowerCase()));
}

function crearCheckbox(category) {
    return `
    <li class="list-group-item">
    <input class="form-check-input me-1" type="checkbox" value="${category}" id="${category}">
    <label class="form-check-label" for="${category}">${category}</label>
    </li>`;
}

function mostrarCheckbox(array, donde) {
    donde.innerHTML = "";
    for (let elemento of array) {
        donde.innerHTML += crearCheckbox(elemento);
    }
}

function arraychecked (checkbox){
    return checkbox.filter(checkbox => checkbox.checked == true).map(checkbox => checkbox.value)
}

function filterCategory(evento, categorias) {
    if(categorias.length == 0){
        return evento
    }else{
        const aux = evento.filter(evento => categorias.includes(evento.category) || categorias.length == 0);
        return aux;
    }
    
}

function filtrosCruzados(eventos, lista, categoriasSeleccionadas) {
    let filterSearchResult = filterSearch(eventos, lista);
    let filterCategoryResult = filterCategory(filterSearchResult, categoriasSeleccionadas);
    console.log(filterCategoryResult);
    return filterCategoryResult;
}

