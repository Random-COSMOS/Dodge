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
            name: name,
            score: score
        })
    }
    fetch("/highScore", options)
    score = 0
}

// collision functions
function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText('score:' + score);

    if (stars.countActive(true) === 0) {
        stars.children.iterate((child) => {
            child.enableBody(true, child.x, 0, true, true);
        })

        let x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 800);
        let bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }
}

async function hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play('turn');

    show("gameOver")
    window.addEventListener('keydown', (e) => {
        if (e.key == "r") {
            hide("gameOver")
            this.scene.restart()
        }
    })

    const options = {
        method: "POST",
        headers: {
            'Content-type': "application/json"
        },
        body: JSON.stringify({
            score: score
        })
    }

    const res = await fetch('/checkScores', options)
    const data = await res.json()
    document.getElementById("score").textContent = score
    data.highScore ? show("highScore") : score = 0



    // fetch("/highScore", {
    //     method: 'POST',
    //     headers: {
    //         'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //         name: 'cosmos',
    //         score: score
    //    
    // })
}