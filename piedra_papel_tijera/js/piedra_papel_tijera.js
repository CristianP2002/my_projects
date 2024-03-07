function random (min, max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function election(move) {
    let result = ""

    if(move == 1) {
        result = "rock"
    } else if (move == 2) {
        result = "paper"
    } else if(move == 3) {
        result = "scissors"
    } else {
        result = "select valid option"
    }
    return result
}

// 1 piedra, 2 papel, 3 tijera
let player = 0
let pc = 0
let wins = 0
let losses = 0

while (wins < 3 && losses < 3) {
    pc = random(1,3)
    player = prompt("Elige: 1 to rock, 2 to paper and 3 to scissors")

    alert("PC select = " + election(pc))
    alert("you select = " + election(player))

    // combat
    if (pc == player) {
        alert("tie")
    } else if (player == 1 && pc == 3 || player == 2 && pc == 1 || player == 3 && pc == 2) {
        alert("you win")
        wins = wins + 1
    } else {
        alert("you lose")
        losses = losses + 1
    }
}

alert("ganaste " + wins + " veces. perdiste " + losses + " veces")