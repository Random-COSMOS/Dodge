const CONFIG = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    },
    scene: [Scene1, Scene2]
};

// Scene2
let game = new Phaser.Game(CONFIG);

const hide = id => document.getElementById(id).style.display = "none"
const show = id => document.getElementById(id).style.display = "block"

document.getElementById("highScore").addEventListener('keydown', e => e.keyCode == 13 ? sendScore() : null)

const sendScore = () => {
    name = document.getElementById("name").value;
    hide("highScore")
    const options = {
        method: "POST",
        headers: {
            'Content-type': "application/json"
        },
        body: JSON.stringify({
            name: name == "" ? "unknown" : name,
            score: score
        })
    }
    fetch("/highScore", options)
    score = 0
}