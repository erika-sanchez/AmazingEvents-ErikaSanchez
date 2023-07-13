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

inputSearch.addEventListener('input',(e)=>{
    let inputValue = e.target.value.toLowerCase();
    let namesFiltrados = namesEventos.filter(evento => evento.startsWith(inputValue));
    console.log(namesFiltrados);
    imprimirCard(namesFiltrados);
})

//check
let categorias = data.events.map(evento => evento.category);
let categoriasNoRepeat = new Set(categorias);
let categoriasUnicas = Array.from(categoriasNoRepeat);
console.log(categoriasNoRepeat);

/* categoriasUnicas.forEach(elemento => crearCheckbox(elemento)) */

function crearCheckbox(category) {
    return `
    <li class="list-group-item">
    <input class="form-check-input me-1" type="checkbox" value="${category}" id="${category}">
    <label class="form-check-label" for="${category}">${category}</label>
    </li>`
}

function mostrarCheckbox(array, donde) {
    donde.innerHTML = "";
    for( let elemento of array){
        donde.innerHTML += crearCheckbox(elemento)
    }
}

mostrarCheckbox(categoriasUnicas, contenedorInputs );

let checkbox =document.querySelectorAll("input[type= 'checkbox']");

contenedorInputs.addEventListener("change", (e)=>{
    let categoriasFiltrados = filterCategory (data.events, e.target.value);
    imprimirCard(categoriasFiltrados);
    
});

function filterCategory(lista, category){
    const aux = lista.filter(evento => evento.category === category );
    console.log(aux);
    return aux
}



// inputBusqueda.addEventListener("input", (e)=>{
//     let inputValue = e.target.value
//     inputValue.toLowerCase()
//     let nombresFiltrados = nombresMentores.filter(mentor => mentor.toLowerCase().startsWith(inputValue))
//     console.log(nombresFiltrados)
//     vaciarLi(lista)
//     nombresFiltrados.forEach(mentor => crearLi(mentor, lista))

// })

// search

/* console.log(window);

inputTypeSearch.addEventListener( 'keyup',() =>{ 
    containerTarjetas.innerHTML = "";
    let keepValue = inputSearch(inputTypeSearch);
    let eventoFilter = data.events.filter( (event) => event.name.toLocaleLowerCase().includes(keepValue));

    console.log(keepValue(inputTypeSearch));
    imprimirCard(eventoFilter)
});

function keepValue(input) {
    let valorInputSearch = input.value;
    return valorInputSearch
}
 */


// para que busque lo que este dentro del array, lo que ingresa el usuario 

// imprimir la card del mentor que estoy buscando









