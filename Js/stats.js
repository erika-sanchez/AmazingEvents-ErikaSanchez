const sectionTable = document.getElementById("table")
const tbodyUpcoming = document.getElementById("tablaUpComing")
const tbodyPastEvents = document.getElementById("tablaPastEvents")

let mayor = document.getElementById("mayor")
let menor = document.getElementById("menor")
let largo = document.getElementById("largo")

function tabla1 (array, doc, porcentaje){
    return doc.innerHTML = `<td>${array.name} ${porcentaje}% </td>`
}
function tabla2 (array, doc, capacity){
    return doc.innerHTML = `<td>${array.name} ${capacity} </td>`
}

let events;
let currentDate;
let pastEvents;
let upcomings;

fetch ("https://mindhub-xj03.onrender.com/api/amazing")
.then(respuesta => respuesta.json())
.then ( data => {
    events = data.events;
    currentDate = data.currentDate;

    upcomings = events.filter ( event => event.date > currentDate)
    pastEvents= events.filter ( event => event.date < currentDate)
    let arrayOrdenado = Array.from(pastEvents).sort(function (a, b){
        return b.capacity - a.capacity
    })
    let namemayorCapacity = arrayOrdenado[0] 
    let mayorCapacity = arrayOrdenado[0].capacity
    pastEvents.sort((a, b) => calcularPorcentaje(a.assistance, a.capacity)- calcularPorcentaje(b.assistance, b.capacity))
    console.log(pastEvents);
    let namemenorassistance = pastEvents[0]
    console.log(namemenorassistance);
    let namemayorassistance = pastEvents [pastEvents.length-1]
    console.log(namemayorassistance);
    let porcentajeMayor = calcularPorcentaje(namemayorassistance.assistance, namemayorassistance.capacity).toFixed(1) 
    let porcentajeMenor = calcularPorcentaje(namemenorassistance.assistance, namemenorassistance.capacity).toFixed(1)
    tabla1 (namemayorassistance, mayor, porcentajeMayor)
    tabla1 (namemenorassistance, menor, porcentajeMenor)
    tabla2 (namemayorCapacity, largo, mayorCapacity)

    let catRepeatPast = pastEvents.map(evento => evento.category)
    let catRepeatUP = upcomings.map(event => event.category)
    let noRepeatPast = Array.from(new Set(catRepeatPast))
    let noRepeatUp = Array.from(new Set(catRepeatUP))

    let objEventPast = noRepeatPast.map((categoria) => {
        let aux = {
            category: categoria
        }
        let catEvents = pastEvents.filter(evento => evento.category == categoria)
        console.log(catEvents);
        const revenue = catEvents.reduce((acc, act) => acc + (act.price * act.assistance), 0)
        // console.log(revenue);
        aux.revenue = revenue
        let porcAssist = catEvents.reduce((acc, act) => acc + (act.assistance / (act.capacity / 100)), 0) / catEvents.length
        aux.porcAssist = porcAssist.toFixed(2)
        return aux
    })
    //UPCOMING
    let objEventUp = noRepeatUp.map((categoria) => {
        let aux = {
            category: categoria
        }
        let catEvents = upcomings.filter(evento => evento.category == categoria)
        console.log(catEvents);
        const revenue = catEvents.reduce((acc, act) => acc + (act.price * act.estimate), 0)
        aux.revenue = revenue
        let porcEstimate = catEvents.reduce((acc, act) => acc + (act.estimate / (act.capacity / 100)), 0) / catEvents.length
        aux.porcEstimate = porcEstimate.toFixed(2)
        return aux
    })

    upcomingstable (objEventUp, tbodyUpcoming )
    pastEventstable (objEventPast, tbodyPastEvents)
})
.catch(error => {
    console.error("Error fetching data:", error);
});

function calcularPorcentaje (asistencia, capacidad ){
    let resultado = (asistencia /capacidad)*100
    return resultado
}
function upcomingstable (eventos,containertb){
    for (let event of eventos) {
        containertb.innerHTML += 
        `<tr class=''>
        <th class="table-info thead-dark" ">${event.category}</td>
        <td class="table-info">$${event.revenue}</td>
        <td class="table-info">${event.porcEstimate}%</td>
        </tr>`
        
    }
}
function pastEventstable (eventos,containertb){
    for (let event of eventos) {
        containertb.innerHTML += 
        `<tr class=''>
        <th class="table-info thead-dark" >${event.category}</td>
        <td class="table-info">$${event.revenue}</td>
        <td class="table-info">${event.porcAssist}%</td>
        </tr>`
        
    }
}







// function crearFila(evento) {
    
//                         <tr>
//                             <td>${evento.category}</td>
//                             <td></td>
//                             <td>@mdo</td>
//                         </tr>
// }

//past
                        // <tr>
                        //     <td>Mark</td>
                        //     <td>Otto</td>
                        //     <td>@mdo</td>
                        // </tr>