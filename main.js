


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



const body = document.body
const contenedorPrincipal = document.createElement("div")
body.appendChild(contenedorPrincipal)

// Posiciones
const posicion = (equipoA, equipoB) => {
    if (equipoA.ganados !== equipoB.ganados) {
        return equipoB.ganados - equipoA.ganados
    } else {
        return equipoB.puntosPromedio - equipoA.puntosPromedio
    }
}

equiposNBA.sort(posicion)

// Mostrar equipos
function mostrarEquipos(equipos) {

    const equiposContainer = document.getElementById("equiposContainer")
    equiposContainer.innerHTML = ''

    equipos.forEach((equipo) => {
        const plantilla = document.createElement("div")
        plantilla.classList.add("plantillaEquipos")

        const ciudad = document.createElement("h2")
        ciudad.textContent = equipo.ciudad + " " + equipo.nombre
        plantilla.appendChild(ciudad);

        const datos = document.createElement("p")
        datos.textContent = "| Wins: " + equipo.ganados + " | Loses: " + equipo.perdidos + " | Puntos Promedio: " + equipo.puntosPromedio
        plantilla.appendChild(datos)

        equiposContainer.appendChild(plantilla)
    });
}

// Funcion playoffs
function Playoff(equipos) {
    return equipos.filter((equipo) => equipo.ganados >= 7)
}

const equiposPlayoff = Playoff(equiposNBA)


// Buscador
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
        Swal.fire({
            title: "Error",
            text: "No se encontró el equipo",
            icon: "error"
        });
    }
})

// Botones playoffs y ver  tabla
const playoffBtn = document.getElementById("playoff")
playoffBtn.addEventListener("click", () => {
    mostrarEquipos(equiposPlayoff)
})

const tablaBtn = document.getElementById("tabla")
tablaBtn.addEventListener("click", () => {
    mostrarEquipos(equiposNBA)
})

//Historial
function guardarHistorial(palabraClave) {

    const historial = JSON.parse(localStorage.getItem("historial")) || []
    historial.push(palabraClave)

    localStorage.setItem("historial", JSON.stringify(historial))
}

// Consumir API
const url = "https://nba-stats-db.herokuapp.com/api/playerdata/topscorers/total/season/2023/"

fetch(url)
    .then((res) => res.json())
    .then((data) => {
        const results = data.results
        const playersContainer = document.getElementById("containerPlayers")

    // Funciones de ordenamiento
        const topPts = (a, b) => b.PTS - a.PTS
        const topAst = (a, b) => b.AST - a.AST
        const topBlk = (a, b) => b.BLK - a.BLK
        const topStl = (a, b) => b.STL - a.STL

    // Función para mostrar jugadores
        const showPlayers = (sortedArray) => {
        playersContainer.innerHTML = ''

        sortedArray.forEach((player) => {
        const playerElement = document.createElement("div")
        playerElement.classList.add("playerElement")

        const nameElement = document.createElement("div")
        nameElement.textContent = `${player.player_name}`
        nameElement.classList.add("nombreTitulo")

        const minutesElement = document.createElement("p")
        minutesElement.textContent = `Minutos jugados: ${player.minutes_played}`

        const pointsElement = document.createElement("li")
        pointsElement.textContent = `Puntos: ${player.PTS}`

        const assistsElement = document.createElement("li")
        assistsElement.textContent = `Asistencias: ${player.AST}`

        const stealsElement = document.createElement("li")
        stealsElement.textContent = `Robos: ${player.STL}`

        const blkElement = document.createElement("li")
        blkElement.textContent = `Tapas: ${player.BLK}`

        playerElement.appendChild(nameElement)
        playerElement.appendChild(minutesElement)
        playerElement.appendChild(pointsElement)
        playerElement.appendChild(assistsElement)
        playerElement.appendChild(stealsElement)
        playerElement.appendChild(blkElement)

        playersContainer.appendChild(playerElement)
        })
    .catch ((error) => {
        alert.error("A surgido un problema inesperado")
    })};

    //Botones ordenar top 20
    const ptsBtn = document.getElementById("ptsBtn")
    ptsBtn.addEventListener("click", () => {
        const sortedResults = [...results].sort(topPts)
        const top20Results = sortedResults.slice(0, 20)
        showPlayers(top20Results);
    });

    const astBtn = document.getElementById("astBtn")
    astBtn.addEventListener("click", () => {
        const sortedResults = [...results].sort(topAst)
        const top20Results = sortedResults.slice(0, 20)
        showPlayers(top20Results)
    });

    const blkBtn = document.getElementById("blkBtn")
    blkBtn.addEventListener("click", () => {
        const sortedResults = [...results].sort(topBlk)
        const top20Results = sortedResults.slice(0, 20)
        showPlayers(top20Results)
    });

    const stlBtn = document.getElementById("stlBtn")
    stlBtn.addEventListener("click", () => {
        const sortedResults = [...results].sort(topStl)
        const top20Results = sortedResults.slice(0, 20)
        showPlayers(top20Results)
    });

    const allBtn = document.getElementById("allBtn")
    allBtn.addEventListener("click", () => {
        showPlayers(results)
    })

    showPlayers(results)
    });

    