

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



const posicion = (equipoA, equipoB) => 
{
    if (equipoA.ganados !== equipoB.ganados){
        return equipoB.ganados - equipoA.ganados
    }
    else {return equipoB.puntosPromedio - equipoA.puntosPromedio}
}

equiposNBA.sort(posicion)


console .log ("Tabla general de posiciones: ")
for(let i = 0; i < equiposNBA.length ; i++){
    console.log(equiposNBA[i].ciudad + " " + equiposNBA[i].nombre + " Wins: " + equiposNBA[i].ganados + " Loses: " + equiposNBA[i].perdidos + " Puntos promedio: " + equiposNBA[i].puntosPromedio)
}




function Playoff(equipos) {
    return equipos.filter((equipo) => equipo.ganados >= 7)
}


const equiposPlayoff = Playoff(equiposNBA)

console .log(" ")
console.log("Equipos Clasificados a los Playoffs (Se necesitan 7 partidos ganados o más)")
for (let i = 0; i < equiposPlayoff.length; i++) {
    console.log(`${equiposPlayoff[i].ciudad} ${equiposPlayoff[i].nombre} - Partidos Ganados: ${equiposPlayoff[i].ganados}`)
}



