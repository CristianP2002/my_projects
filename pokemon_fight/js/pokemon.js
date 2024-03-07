const selectAttack = document.getElementById('select-your-attack')
const resetSection = document.getElementById('reset')
const botonPokemonJugador = document.getElementById('select_pokemon_button')

const resetButton = document.getElementById('reset_button')

const ocultSelectedPokemon = document.getElementById('select-your-pokemon')

const spanPokemonJugador = document.getElementById('pokemon_player')
const spanPokemonEnemy = document.getElementById('pokemon_enemy')

const spanLivesPlayer = document.getElementById('lives_player')
const spanLivesEnemy = document.getElementById('lives_enemy')

const sectionMessagesResult = document.getElementById('result')
const playerAttackMessage = document.getElementById('player-attack-message')
const enemyAttackMessage = document.getElementById('enemy-attack-message')
const cardsContainer = document.getElementById('cards_container')
const attacksContainer = document.getElementById('attacks_container')

const sectionMessages = document.getElementById('messages')

const sectionWatchMap = document.getElementById('watch_map')
const map = document.getElementById('map')

let idPlayer = null
let idEnemy = null

let pokemons = []
let enemyPokemons = []

let enemyAttack = []
let playerAttack = []

let pokemonsOption

let inputGyarados
let inputMagmortar
let inputPhantump
let inputVolcarona
let inputAzumarill
let inputVenusaur

let pokemonPlayer
let ourPokemon

let pokemonAttacks
let enemyPokemonAttacks
let buttons = []

let indexPlayerAttack
let indexEnemyAttack

let fireButton
let waterButton
let grassButton

let playerVictories = 0
let enemyVictories = 0

let livesPlayer = 3
let livesEnemy = 3

let canvas = map.getContext('2d')
let interval

let heightMap
let widthMap = window.innerWidth - 50
const maxWidthMap = 800


if(widthMap > maxWidthMap) {
    widthMap = maxWidthMap - 50
}

heightMap = widthMap * 600 / 800

map.width = widthMap
map.height = heightMap

let mapBackground = new Image()
mapBackground.src = '../imgs/mapPokemon.png'



class Pokemon {
    constructor(name, photo, life, pokemonPhoto, id) {
        this.id = id
        this.name = name
        this.photo = photo
        this.life = life
        this.attacks = []
        this.width = 50
        this.height = 50
        this.x = random(0, map.width - this.width)
        this.y = random(0, map.height - this.height)
        this.photomap = new Image()
        this.photomap.src = pokemonPhoto
        this.speedX = 0
        this.speedY = 0
    }
    paintPokemon() {
        canvas.drawImage(
            this.photomap,
            this.x,
            this.y,
            this.width,
            this.height
        )
    }
}

let gyarados = new Pokemon('Gyarados', '../imgs/gyarados_water.png', 5, '../imgs/Gyarados.png')
let magmortar = new Pokemon('Magmortar', '../imgs/magmortar_fire.png', 5, '../imgs/Magmortar.png')
let phantump = new Pokemon('Phantump', '../imgs/phantump_grass.png', 5, '../imgs/Phantump.png')
let volcarona = new Pokemon('Volcarona', '../imgs/volcarona_fire.png', 5, '../imgs/Volcarona.png')
let azumarill = new Pokemon('Azumarill', '../imgs/azumarill_water.png', 5, '../imgs/Azumarill.png')
let venusaur = new Pokemon('Venusaur', '../imgs/venusaur_grass.png', 5, '../imgs/Venusaur.png')

const gyaradosAttacks = [
    {name: '💧', id: 'water_button'},
    {name: '💧', id: 'water_button'},
    {name: '💧', id: 'water_button'},
    {name: '🔥', id: 'fire_button'},
    {name: '🌿', id: 'grass_button'}
]

gyarados.attacks.push(...gyaradosAttacks)

const magmortarAttacks = [
    {name: '🔥', id: 'fire_button'},
    {name: '🔥', id: 'fire_button'},
    {name: '🔥', id: 'fire_button'},
    {name: '💧', id: 'water_button'},
    {name: '🌿', id: 'grass_button'}
]

magmortar.attacks.push(...magmortarAttacks)

const phantumpAttacks = [
    {name: '🌿', id: 'grass_button'},
    {name: '🌿', id: 'grass_button'},
    {name: '🌿', id: 'grass_button'},
    {name: '💧', id: 'water_button'},
    {name: '🔥', id: 'fire_button'}
]

phantump.attacks.push(...phantumpAttacks)

const volcaronaAttacks = [
    {name: '🔥', id: 'fire_button'},
    {name: '🔥', id: 'fire_button'},
    {name: '🔥', id: 'fire_button'},
    {name: '💧', id: 'water_button'},
    {name: '🌿', id: 'grass_button'}
]

volcarona.attacks.push(...volcaronaAttacks)

const azumarillAttacks = [
    {name: '💧', id: 'water_button'},
    {name: '💧', id: 'water_button'},
    {name: '💧', id: 'water_button'},
    {name: '🔥', id: 'fire_button'},
    {name: '🌿', id: 'grass_button'}
]
azumarill.attacks.push(...azumarillAttacks)

const venusaurAttack = [
    {name: '🌿', id: 'grass_button'},
    {name: '🌿', id: 'grass_button'},
    {name: '🌿', id: 'grass_button'}, 
    {name: '💧', id: 'water_button'},
    {name: '🔥', id: 'fire_button'}
]

venusaur.attacks.push(...venusaurAttack)

pokemons.push(gyarados, magmortar, phantump, volcarona, azumarill, venusaur)

function iniciateGame() {
    
    selectAttack.style.display = 'none'
    resetSection.style.display = 'none'
    sectionWatchMap.style.display = 'none'

    pokemons.forEach((pokemon) => {
        pokemonsOption = `
        <input type="radio" name="pokemon" id=${pokemon.name}>
        <label class="pokemon-card" for=${pokemon.name}>
            <p>${pokemon.name}</p>
            <img src=${pokemon.photo} alt=${pokemon.name}>
        </label>
            `
    cardsContainer.innerHTML += pokemonsOption

    inputGyarados = document.getElementById('Gyarados')
    inputMagmortar = document.getElementById('Magmortar')
    inputPhantump = document.getElementById('Phantump')
    inputVolcarona = document.getElementById('Volcarona')
    inputAzumarill = document.getElementById('Azumarill')
    inputVenusaur = document.getElementById('Venusaur')
    })

    botonPokemonJugador.addEventListener('click', selectPlayerPokemon)
    
    resetButton.addEventListener('click', resetGame)

    joinToGame()
}

function joinToGame() {
    fetch("http://localhost:8080/join")
        .then(function (res) {
            if (res.ok) {
                res.text()
                    .then(function (answer){
                        console.log(answer)
                        idPlayer = answer
                    })
            }
        })
}

function selectPlayerPokemon() {
    ocultSelectedPokemon.style.display = 'none'

    resetSection.style.display = 'none'

    if(inputGyarados.checked) {
        spanPokemonJugador.innerHTML = inputGyarados.id
        pokemonPlayer = inputGyarados.id
    } else if (inputMagmortar.checked) {
        spanPokemonJugador.innerHTML = inputMagmortar.id
        pokemonPlayer = inputMagmortar.id
    } else if (inputPhantump.checked) {
        spanPokemonJugador.innerHTML = inputPhantump.id
        pokemonPlayer = inputPhantump.id
    } else if (inputVolcarona.checked) {
        spanPokemonJugador.innerHTML = inputVolcarona.id
        pokemonPlayer = inputVolcarona.id
    } else if (inputAzumarill.checked) {
        spanPokemonJugador.innerHTML = inputAzumarill.id
        pokemonPlayer = inputAzumarill.id
    } else if (inputVenusaur.checked) {
        spanPokemonJugador.innerHTML = inputVenusaur.id
        pokemonPlayer = inputVenusaur.id
    } else {
        alert('select a pokemon')
    }

    selectPokemon(pokemonPlayer) 

    extractAttack(pokemonPlayer)
    sectionWatchMap.style.display = 'flex'

    iniciateMap()
}

function selectPokemon(pokemonPlayer) {
    fetch(`http://localhost:8080/pokemon/${idPlayer}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pokemon: pokemonPlayer
        })
    })
}

function extractAttack(pokemonPlayer) { 

    for (let i = 0; i < pokemons.length; i++) {
        if (pokemonPlayer === pokemons[i].name) {
            pokemonAttacks = pokemons[i].attacks
        }
        
    }
    showAttacks(pokemonAttacks)
}

function showAttacks(pokemonAttacks) {
    pokemonAttacks.forEach((attack) => {
        attackOfPokemons = `
        <button id=${attack.id} class="attack-button button-of-attack">${attack.name}</button>
        `
        attacksContainer.innerHTML += attackOfPokemons
    })

    fireButton = document.getElementById('fire_button')
    waterButton = document.getElementById('water_button')
    grassButton = document.getElementById('grass_button')

    buttons = document.querySelectorAll('.button-of-attack')
}

function attackSecuency() {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if(e.target.textContent === '🔥') {
                playerAttack.push('FIRE')
                console.log(playerAttack)
                button.style.background = '#b35b2f'
                button.disabled = true
            } else if(e.target.textContent === '💧') {
                playerAttack.push('WATER')
                console.log(playerAttack)
                button.style.background = '#b35b2f'
                button.disabled = true
            } else {
                playerAttack.push('GRASS')
                console.log(playerAttack)
                button.style.background = '#b35b2f'
                button.disabled = true
            }
            if(playerAttack.length === 5) {
                sendAttack()
            }
            
        })
    })
    
}

function sendAttack() {
    fetch(`http://localhost:8080/pokemon/${idPlayer}/attacks`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            attacks: playerAttack
        })
    })

    interval = setInterval(obtainAttacks, 50)
}

function obtainAttacks() {
    fetch(`http://localhost:8080/pokemon/${idEnemy}/attacks`)
        .then(function(res) {
            if(res.ok) {
                res.json()
                    .then(function({attacks}) {
                        if(attacks.length === 5) {
                            enemyAttack = attacks
                            combat()
                        }
                    })
            }
        })
}

function random (min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function selectEnemyPokemon(enemy) {

    spanPokemonEnemy.innerHTML = enemy.name
    enemyPokemonAttacks = enemy.attacks

    attackSecuency()
}

function fireAttack() {
    playerAttack = 'FIRE'
    randomEnemyAttack()
}

function waterAttack() {
    playerAttack = 'WATER'
    randomEnemyAttack()
}

function grassAttack() {
    playerAttack = 'GRASS'
    randomEnemyAttack()
}

function randomEnemyAttack() {
    let randomAttack = random(0, enemyPokemonAttacks.length - 1)

    if (randomAttack == 0 || randomAttack == 1){
        enemyAttack.push('FIRE')
    } else if (randomAttack == 3 || randomAttack == 4) {
        enemyAttack.push('WATER')
    } else {
        enemyAttack.push('GRASS')
    }

    console.log(enemyAttack)
    startFight()
}

function startFight() {
    if(playerAttack.length === 5) {
        combat()
    }
}

function indexOponents(player, enemy) {
    indexPlayerAttack = playerAttack[player]
    indexEnemyAttack = enemyAttack[enemy]
}

function combat(){

    clearInterval(interval)

    for (let index = 0; index < playerAttack.length; index++) {
        if(playerAttack[index] === enemyAttack[index]){
            indexOponents(index, index)
            createMessage('EMPATE')
            spanLivesEnemy.innerHTML = enemyVictories
            spanLivesPlayer.innerHTML = playerVictories
        } else if (playerAttack[index] === 'WATER' && enemyAttack[index] === 'FIRE' || playerAttack[index] === 'FIRE' && enemyAttack[index] === 'GRASS' || playerAttack[index] === 'GRASS' && enemyAttack[index] === 'WATER') {
            indexOponents(index, index)
            createMessage('YOU WIN')
            playerVictories++
            spanLivesPlayer.innerHTML = playerVictories
        } else {
            indexOponents(index, index)
            createMessage('YOU LOSE')
            enemyVictories++
            spanLivesEnemy.innerHTML = enemyVictories
        }
    }

    reviewVictories()
}

function reviewVictories() {
    if (playerVictories === enemyVictories) {
        finalMessage('THIS IS A TIE')
    } else if (playerVictories > enemyVictories) {
        finalMessage('CONGRATULATIONS, YOU WIN')
    } else {
        finalMessage('SORRY, YOU LOSE, TRY AGAIN')
    }
}

function createMessage(result) {
    let newPlayerAttack = document.createElement('p')
    let newEnemyAttack = document.createElement('p')

    sectionMessagesResult.innerHTML = result
    newPlayerAttack.innerHTML = indexPlayerAttack
    newEnemyAttack.innerHTML = indexEnemyAttack
    
    playerAttackMessage.appendChild(newPlayerAttack)
    enemyAttackMessage.appendChild(newEnemyAttack)

}

function finalMessage(endResult) {
    let paragraf = document.createElement('p')
    paragraf.innerHTML = endResult

    sectionMessages.appendChild(paragraf)

    resetSection.style.display = 'flex'
}

function resetGame() {
    location.reload()
}

function paintCanvas() {

    ourPokemon.x = ourPokemon.x + ourPokemon.speedX
    ourPokemon.y = ourPokemon.y + ourPokemon.speedY

    canvas.clearRect(0, 0, map.width, map.height)
    canvas.drawImage(
        mapBackground,
        0,
        0,
        map.width,
        map.height
    )
    ourPokemon.paintPokemon()

    sendPosition(ourPokemon.x, ourPokemon.y)

    enemyPokemons.forEach(function(pokemon) {
        pokemon.paintPokemon()
        collision(pokemon)
    })

}

function sendPosition(x, y) {
    fetch(`http://localhost:8080/pokemon/${idPlayer}/position`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res) {
        if (res.ok) {
            res.json()
                .then(function({enemies}) {
                    console.log(enemies)
                    enemyPokemons = enemies.map(function(enemy) {
                        let enemyPokemon = null

                        const pokemonName = enemy.pokemon.name || ""
                        
                        if (pokemonName === "Gyarados") {
                            enemyPokemon = new Pokemon('Gyarados', '../imgs/gyarados_water.png', 5, '../imgs/Gyarados.png',enemy.id)
                        } else if (pokemonName === "Magmortar") {
                            enemyPokemon = new Pokemon('Magmortar', '../imgs/magmortar_fire.png', 5, '../imgs/Magmortar.png',enemy.id)
                        } else if (pokemonName === "Phantump") {
                            enemyPokemon = new Pokemon('Phantump', '../imgs/phantump_grass.png', 5, '../imgs/Phantump.png',enemy.id)
                        }else if (pokemonName === "Volcarona") {
                            enemyPokemon = new Pokemon('Volcarona', '../imgs/volcarona_fire.png', 5, '../imgs/Volcarona.png',enemy.id)
                        } else if (pokemonName === "Azumarill") {
                            enemyPokemon = new Pokemon('Azumarill', '../imgs/azumarill_water.png', 5, '../imgs/Azumarill.png',enemy.id)
                        } else if (pokemonName === "Venusaur") {
                            enemyPokemon = new Pokemon('Venusaur', '../imgs/venusaur_grass.png', 5, '../imgs/Venusaur.png',enemy.id)
                        }

                        enemyPokemon.x = enemy.x
                        enemyPokemon.y = enemy.y

                        return enemyPokemon
                    })
                })
        }
    })
}

function moveUp() {
    ourPokemon.speedY = -5
}

function moveDown() {
    ourPokemon.speedY = 5
}

function moveLeft() {
    ourPokemon.speedX = -5
}

function moveRight() {
    ourPokemon.speedX = 5
}

function stopMove() {
    ourPokemon.speedX = 0
    ourPokemon.speedY = 0
}

function pressKey(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp()
            break
        case 'W':
            moveUp()
            break
        case 'w':
            moveUp()
            break
        case 'ArrowDown':
            moveDown()
            break
        case 'S':
            moveDown()
            break
        case 's':
            moveDown()
            break
        case 'ArrowLeft':
            moveLeft()
            break
        case 'A':
            moveLeft()
            break
        case 'a':
            moveLeft()
            break
        case 'ArrowRight':
            moveRight()
            break
        case 'D':
            moveRight()
            break
        case 'd':
            moveRight()
            break
    }
}

function iniciateMap() {
    ourPokemon = getObjectPokemon(pokemonPlayer)
    interval = setInterval(paintCanvas, 50)

    window.addEventListener('keydown', pressKey)
    window.addEventListener('keyup', stopMove)
}

function getObjectPokemon() {
    for (let i = 0; i < pokemons.length; i++) {
        if (pokemonPlayer === pokemons[i].name) {
            return pokemons[i]
        }
    }
}

function collision(enemy) {
    const upEnemy = enemy.y
    const downEnemy = enemy.y + enemy.height
    const leftEnemy = enemy.x 
    const rightEnemy = enemy.x + enemy.width

    const upPokemon = ourPokemon.y
    const downPokemon = ourPokemon.y + ourPokemon.height
    const leftPokemon = ourPokemon.x 
    const rightPokemon = ourPokemon.x + ourPokemon.width

    if(downPokemon < upEnemy || upPokemon > downEnemy || rightPokemon < leftEnemy || leftPokemon > rightEnemy
    ){
        return
    }
    stopMove()
    clearInterval(interval)
    
    idEnemy = enemy.id
    console.log(enemy);
    selectAttack.style.display = 'flex'
    sectionWatchMap.style.display = 'none'
    selectEnemyPokemon(enemy)
}

window.addEventListener('load', iniciateGame)