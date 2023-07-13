let containerTarjetas = document.getElementById("cajaTarjetas")
let boton = document.getElementById('boton')
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
                <a href="./pages/details.html?id=" class="card-link ml-1">Details</a>
            </div>
        </div>`
}

function imprimirCard (eventos){
    containerTarjetas.innerHTML = "";
    for (let evento of eventos) {
        containerTarjetas.innerHTML += crearCard(evento)
    }
}
imprimirCard(data.events)

console.log (data.currentDate, data.events)

// check
let namesEventos = data.events.map(evento => evento.name.toLowerCase())
console.log(namesEventos);


inputSearch.addEventListener('input', searchInputInfo);

function searchInputInfo(e) {
    let inputValue = e.target.value;
    let arrayObjetos = filterSearch(data.events, inputValue);
    console.log(arrayObjetos);
    imprimirCard(arrayObjetos);
}

function filterSearch(eventos, searchValue) {
    return eventos.filter(evento => evento.name.toLowerCase().startsWith(searchValue.toLowerCase()));
}

//check
let categorias = data.events.map(evento => evento.category);
let categoriasNoRepeat = new Set(categorias);
let categoriasUnicas = Array.from(categoriasNoRepeat);
console.log(categoriasNoRepeat);

let categoriasSeleccionadas = []; // Array para almacenar las categorías seleccionadas

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

mostrarCheckbox(categoriasUnicas, contenedorInputs);

let checkbox = document.querySelectorAll("input[type='checkbox']");

contenedorInputs.addEventListener("change", (e) => {
    if (e.target.checked) {
        categoriasSeleccionadas.push(e.target.value); // Agregar la categoría al arreglo
    } else {
        categoriasSeleccionadas = categoriasSeleccionadas.filter(categoria => categoria !== e.target.value); // Elimina la categoría del arreglo
    }

    // Imprimir las categorías seleccionadas
    console.log(categoriasSeleccionadas);

    let categoriasFiltradas = filterCategory(data.events, categoriasSeleccionadas);
    if (categoriasFiltradas.length == 0 ){
        imprimirCard(data.events)
    }else {
        imprimirCard(categoriasFiltradas);
    }
});

function filterCategory(lista, categorias) {
    const aux = lista.filter(evento => categorias.includes(evento.category));
    console.log(aux);
    return aux;
}

imprimirCard(data.events);


  /* function crossedFilters(eventos, input, categoriasSeleccionadas) {
    let first = filterSearch(eventos, input);
    let second = filterCategory(eventos, categoriasSeleccionadas);
    let filterFinal = first.filter(evento => second.includes(evento));
    return filterFinal;
}

function filterSearch(eventos, searchValue) {
    return eventos.filter(evento => evento.name.toLowerCase().startsWith(searchValue.toLowerCase()));
}

function filterCategory(eventos, categorias) {
    return eventos.filter(evento => categorias.includes(evento.category));
} */