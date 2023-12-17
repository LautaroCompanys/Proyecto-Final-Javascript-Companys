


const equiposNBA = [
    { nombre: "Lakers", ciudad: "Los Angeles", ganados: 10, perdidos: 5, puntosPromedio: 110 },
    { nombre: "Bulls", ciudad: "Chicago", ganados: 8, perdidos: 7, puntosPromedio: 105 },
    { nombre: "Spurs", ciudad: "San Antonio", ganados: 14, perdidos: 1, puntosPromedio: 130 },
    { nombre: "Warrios", ciudad: "Golden State", ganados: 2, perdidos: 13, puntosPromedio: 85 },
    { nombre: "Heat", ciudad: "Miami", ganados: 6, perdidos: 9, puntosPromedio: 90 },
    { nombre: "Celtics", ciudad: "Boston", ganados: 4, perdidos: 11, puntosPromedio: 105 },
    { nombre: "Clippers", ciudad: "Los Angeles", ganados: 8, perdidos: 7, puntosPromedio: 98 },
    { nombre: "Bucks", ciudad: "Milwuakee", ganados: 8, perdidos: 7, puntosPromedio: 112}
]

const body = document.querySelector("body")
const contenedorPrincipal = document.createElement("div")
body.appendChild(contenedorPrincipal)

const posicion = (equipoA, equipoB) => {
    if (equipoA.ganados !== equipoB.ganados) {
        return equipoB.ganados - equipoA.ganados
    } else {
        return equipoB.puntosPromedio - equipoA.puntosPromedio
    }
}

equiposNBA.sort(posicion)

function mostrarEquipos(equipos) {
    contenedorPrincipal.innerHTML = ''

    equipos.forEach((equipo) => {
        const plantilla = document.createElement("div")

        const ciudad = document.createElement("h2")
        ciudad.textContent = equipo.ciudad + " " + equipo.nombre
        plantilla.appendChild(ciudad)

        const datos = document.createElement("p")
        datos.textContent ="| Wins: " + equipo.ganados + " | Loses: " + equipo.perdidos + " | Puntos Promedio: " + equipo.puntosPromedio
        plantilla.appendChild(datos)

        contenedorPrincipal.appendChild(plantilla)
    })
}

function Playoff(equipos) {
    return equipos.filter((equipo) => equipo.ganados >= 7)
}

const equiposPlayoff = Playoff(equiposNBA)



const buscarBtn = document.getElementById("buscarBoton")
buscarBtn.addEventListener("click", () => {
    const input = document.getElementById("buscarInput").value
    const palabraClave = input.trim().toUpperCase()
    const resultado = equiposNBA.filter((equipo) =>
        equipo.nombre.toUpperCase().includes(palabraClave) || equipo.ciudad.toUpperCase().includes(palabraClave)
    )

    if (resultado.length > 0) {
        mostrarEquipos(resultado)

        guardarHistorial(resultado)
    } else {
        alert("No se encontró resultado")
    }
})


const playoffBtn = document.getElementById("playoff")
playoffBtn.addEventListener("click", () => {
    mostrarEquipos(equiposPlayoff)
})

const tablaBtn = document.getElementById("tabla")
tablaBtn.addEventListener("click", () => {
    mostrarEquipos(equiposNBA)
})

function guardarHistorial(palabraClave) {

    const historial = JSON.parse(localStorage.getItem("historial")) || []
    historial.push(palabraClave)

    localStorage.setItem("historial", JSON.stringify(historial))
}