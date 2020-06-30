class Scene2 extends Phaser.Scene {
    constructor() {
        super('main')
        this.platforms
        this.player
        this.stars
        this.scoreText
        this.bomb
        this.score = 0
    }

    collectStar(player, star) {
        star.disableBody(true, true);

        this.score += 10;
        this.scoreText.setText('score:' + this.score);

        if (this.stars.countActive(true) === 0) {
            this.stars.children.iterate((child) => {
                child.enableBody(true, child.x, 0, true, true);
            })

            let x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 800);
            let bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
    }

    async hitBomb(player, bomb) {
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
                score: this.score
            })
        }

        const res = await fetch('/checkScores', options)
        const data = await res.json()
        document.getElementById("score").textContent = this.score
        data.highScore ? show("highScore") : this.score = 0
    }

    preload() {
        this.load.image('sky', 'images/Scene2/sky.png');
        this.load.image('ground', 'images/Scene2/platform.png');
        this.load.image('star', 'images/Scene2/star.png');
        this.load.image('bomb', 'images/Scene2/bomb.png');
        this.load.spritesheet('dude', 'images/Scene2/dude.png', {
                frameWidth: 32,
                frameHeight: 48
            }
        );
    }

    create() {
        this.add.image(400, 300, 'sky');

        // platforms
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'ground');
        this.platforms.create(50, 250, 'ground');
        this.platforms.create(750, 220, 'ground');

        // player
        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        //stars
        this.stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: {
                x: 12,
                y: 0,
                stepX: 70
            }
        })

        this.stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        })

        // this.bombs
        this.bombs = this.physics.add.group();

        // score
        this.scoreText = this.add.text(16, 16, 'score: 0', {
            fontSize: '20px',
            fill: '#000'
        });

        // animation
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 0,
                end: 3
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{
                key: 'dude',
                frame: 4
            }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {
                start: 5,
                end: 8
            }),
            frameRate: 10,
            repeat: -1
        });

        // collision
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.bombs, this.hitBomb, null, this);
    }

    update() {
        let cursors = this.input.keyboard.createCursorKeys()

        if (cursors.left.isDown || this.input.keyboard.addKey('A').isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        } else if (cursors.right.isDown || this.input.keyboard.addKey('D').isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        } else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if ((cursors.up.isDown || this.input.keyboard.addKey('W').isDown) && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
    }
}