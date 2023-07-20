import { imprimirCard, mensaje,mostrarCheckbox,arraychecked,filtrosCruzados} from "../modules/function.js";
let containerTarjetas = document.getElementById("cajaTarjetas")
let inputSearch = document.getElementById('inputTypeSearch')
let contenedorInputs = document.getElementById('contenedorInputs')

console.log(containerTarjetas);

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
                imprimirCard(filtrosarray, containerTarjetas)
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
                imprimirCard(filtrosarray, containerTarjetas)
            }
        }
    })
.catch((error)=>{
    console.error("Error fetching data:",error);
})

let categoriasSeleccionadas = []