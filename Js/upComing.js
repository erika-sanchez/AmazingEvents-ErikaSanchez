let containerTarjetas = document.getElementById("cajaTarjetas");
let inputSearch = document.getElementById('inputTypeSearch');
let contenedorInputs = document.getElementById('contenedorInputs');

function crearCard(objeto) {
    return `
        <div class="card col-5">
        <img src="${objeto.image}" class="card-img-top" alt="...">
        <div class="card-body d-flex flex-column">
            <h4>${objeto.name}</h4>
            <p class="card-text">${objeto.description}</p>
            <p class="card-text text-center">${objeto.date}</p>
        </div>
        <div class="card-a d-flex justify-content-evenly">
            <a href="#" class="card-link">${"$" + objeto.price}</a>
            <a href="../pages/details.html?id=${objeto._id}" class="card-link ml-1">Details</a>
        </div>
        </div>`;
}

function imprimirCard(eventos, containerTarjetas) {
    containerTarjetas.innerHTML = "";
    for (let evento of eventos) {
            containerTarjetas.innerHTML += crearCard(evento);
        }
    
}

// function filtroEventos(eventos, currentDate) {
//     return eventos.filter(evento => evento.date > currentDate);
// }

function mensaje() {
    const mensaje = document.createElement('p');
    mensaje.textContent = 'no results were found';
    containerTarjetas.appendChild(mensaje);
}

let events;
let upComing;
let currentDate;

fetch ("https://mindhub-xj03.onrender.com/api/amazing")
.then(respuesta => respuesta.json()) 
.then ( data => {
        events= data.events; 
        currentDate = data.currentDate;
        upComing  = events.filter(event => event.date > currentDate);
        let categorias = events.map(evento => evento.category);
        let categoriasNoRepeat = new Set(categorias);
        let categoriasUnicas = Array.from(categoriasNoRepeat);
        mostrarCheckbox(categoriasUnicas, contenedorInputs);
        imprimirCard(upComing, containerTarjetas)
        let checkbox = document.querySelectorAll("input[type='checkbox']");
        let arraycheckbox = Array.from(checkbox)
        console.log(arraycheckbox);

        contenedorInputs.addEventListener("change", (e) => {

            let listas = inputSearch.value.toLowerCase()
            let checkFiltradas = arraychecked(arraycheckbox)
            let filtrosarray = filtrosCruzados(upComing, listas, checkFiltradas)
            console.log("Evento", filtrosarray);
            containerTarjetas.innerHTML = ""
            if (filtrosarray.length == 0){
                mensaje()
            }else{
                imprimirCard(filtrosarray, containerTarjetas)
            }
        });

        inputSearch.addEventListener('input', searchInputInfo);

        function searchInputInfo(e) {
            let listas = inputSearch.value.toLowerCase()
            let checkFiltradas = arraychecked(arraycheckbox)
            let filtrosarray = filtrosCruzados(upComing, listas, checkFiltradas)
            console.log("Evento", filtrosarray);
            containerTarjetas.innerHTML = ""
            if (filtrosarray.length == 0){
                mensaje()
            }else{
                imprimirCard(filtrosarray, containerTarjetas)
            }}
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

// let upComing = filtroEventos(data.events, data.currentDate);

// imprimirCard(upComing, containerTarjetas);

// // console.log(data.currentDate, data.events);

// //

// inputSearch.addEventListener('input', searchInputInfo);

// function searchInputInfo(e) {
//     let listas = inputSearch.value;
//     let checkFiltradas = arraychecked(arraycheckbox);
//     let filtrosarray = filtrosCruzados(upComing, listas, checkFiltradas);

//     containerTarjetas.innerHTML = "";
//     // console.log(checkFiltradas);
//     // console.log(filtrosarray);
//     if (filtrosarray.length == 0 && checkFiltradas.length == 0 && listas.length > 0 || checkFiltradas.length == 0 && listas.length > 0) {
//         return mensaje();
//     } else if (filtrosarray.length == 0 && checkFiltradas.length > 0) {
//         return mensaje();
//     } else if (checkFiltradas.length == 0) {
//         return imprimirCard(filtrosarray, containerTarjetas);
//     } else {
//         return imprimirCard(filtrosarray, containerTarjetas);
//     }
// }

// function filterSearch(eventos, searchValue) {
//     return eventos.filter(evento => evento.name.toLowerCase().includes(searchValue.toLowerCase()));
// }

// let categorias = data.events.map(evento => evento.category);
// let categoriasNoRepeat = new Set(categorias);
// let categoriasUnicas = Array.from(categoriasNoRepeat);
// // console.log(categoriasNoRepeat);

// let categoriasSeleccionadas = [];

// function crearCheckbox(category) {
//     return `
//         <li class="list-group-item">
//         <input class="form-check-input me-1" type="checkbox" value="${category}" id="${category}">
//         <label class="form-check-label" for="${category}">${category}</label>
//         </li>`;
// }

// function mostrarCheckbox(array, donde) {
//     donde.innerHTML = "";
//     for (let elemento of array) {
//         donde.innerHTML += crearCheckbox(elemento);
//     }
// }

// mostrarCheckbox(categoriasUnicas, contenedorInputs);

// let checkbox = document.querySelectorAll("input[type='checkbox']");
// let arraycheckbox = Array.from(checkbox);

// function arraychecked(checkbox) {
//     return checkbox.filter(checkbox => checkbox.checked == true).map(checkbox => checkbox.value);
// }

// contenedorInputs.addEventListener("change", (e) => {
//     let listas = inputSearch.value;
//     let checkFiltradas = arraychecked(arraycheckbox);
//     let filtrosarray = filtrosCruzados(upComing, listas, checkFiltradas);

//     containerTarjetas.innerHTML = "";
//     // console.log(checkFiltradas);
//     // console.log(filtrosarray);
//     if (filtrosarray.length == 0 && checkFiltradas.length == 0 && listas.length > 0 || checkFiltradas.length == 0 && listas.length > 0) {
//         return mensaje();
//     } else if (filtrosarray.length == 0 && checkFiltradas.length > 0) {
//         return mensaje();
//     } else if (checkFiltradas.length == 0) {
//         return imprimirCard(upComing, containerTarjetas);
//     } else {
//         return imprimirCard(filtrosarray, containerTarjetas);
//     }
// });

// function filterCategory(eventos, categorias) {
//     return eventos.filter(evento => categorias.includes(evento.category));
// }

// function filtrosCruzados(eventos, lista, categoriasSeleccionadas) {
//     let filterCategoryResult = filterCategory(eventos, categoriasSeleccionadas);
//     let filterSearchResult = filterSearch(filterCategoryResult, lista);
//     return filterSearchResult;
// }
