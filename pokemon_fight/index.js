const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

const players = []

class Player {
    constructor(id) {
        this.id = id
    }

    assignPokemon(pokemon) {
        this.pokemon = pokemon
    }

    updatePosition(x, y) {
        this.x = x
        this.y = y
    }

    assignAttacks(attacks) {
        this.attacks = attacks
    }
}

class Pokemon {
    constructor(name) {
        this.name = name
    }
}

app.get("/join", (req,res) => {
    const id = `${Math.random()}`
    const player = new Player(id)

    players.push(player)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send(id)
})

app.post("/pokemon/:idPlayer", (req, res) => {
    const idPlayer = req.params.idPlayer || ""
    const name = req.body.pokemon || ""
    const pokemon = new Pokemon(name)

    const indexPlayer = players.findIndex((player) => idPlayer === player.id)
    
    if(indexPlayer >= 0) {
        players[indexPlayer].assignPokemon(pokemon)
    }
    
    console.log(players)
    console.log(idPlayer)
    res.end()
})

app.post("/pokemon/:idPlayer/position", (req, res) => {
    const idPlayer = req.params.idPlayer || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const indexPlayer = players.findIndex((player) => idPlayer === player.id)
    
    if(indexPlayer >= 0) {
        players[indexPlayer].updatePosition(x, y)
    }

    const enemies = players.filter((player) => idPlayer !== player.id)  

    res.send({
        enemies
    })
})

app.post("/pokemon/:idPlayer/attacks", (req, res) => {
    const idPlayer = req.params.idPlayer || ""
    const attacks = req.body.attacks || []

    const indexPlayer = players.findIndex((player) => idPlayer === player.id)
    
    if(indexPlayer >= 0) {
        players[indexPlayer].assignAttacks(attacks)
    }

    res.end()
})

app.get("/pokemon/:idPlayer/attacks", (req, res) => {
    const idPlayer = req.params.idPlayer || ""
    const player = players.find((player) => player.id === idPlayer)
    res.send({
        attacks: player.attacks || []
    })
})
app.listen(8080, () => {
    console.log("working server")
})