
export function crearCard(objeto){
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
export function imprimirCard(eventos,containerTarjetas) {
    // Generar las tarjetas y agregarlas al elementoHTML
    let template = ""
    for (let evento of eventos) {//recorrer , asigna 
            template += crearCard(evento);
        }
        containerTarjetas.innerHTML += template;
    }

export function mensaje (containerTarjetas){
    const mensaje = document.createElement('p');
        mensaje.textContent = 'no results were found';
        containerTarjetas.innerHTML = ''; // Limpiar el contenido existente
        containerTarjetas.appendChild(mensaje);
}

export function filterSearch(lista, searchValue) {
    return lista.filter(evento => evento.name.toLowerCase().includes(searchValue.toLowerCase()));
}

export function crearCheckbox(category) {
    return `
    <li class="list-group-item">
    <input class="form-check-input me-1" type="checkbox" value="${category}" id="${category}">
    <label class="form-check-label" for="${category}">${category}</label>
    </li>`;
}

export function mostrarCheckbox(array, donde) {
    donde.innerHTML = "";
    for (let elemento of array) {
        donde.innerHTML += crearCheckbox(elemento);
    }
}

export function arraychecked (checkbox){
    return checkbox.filter(checkbox => checkbox.checked == true).map(checkbox => checkbox.value)
}

export function filterCategory(evento, categorias) {
    if(categorias.length == 0){
        return evento
    }else{
        const aux = evento.filter(evento => categorias.includes(evento.category) || categorias.length == 0);
        return aux;
    }
    
}

export function filtrosCruzados(eventos, lista, categoriasSeleccionadas) {
    let filterSearchResult = filterSearch(eventos, lista);
    let filterCategoryResult = filterCategory(filterSearchResult, categoriasSeleccionadas);
    console.log(filterCategoryResult);
    return filterCategoryResult;
}

