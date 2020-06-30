class Scene1 extends Phaser.Scene {
    constructor() {
        super('Menu')
    }

    preload() {
        this.load.image("layer1", "images/Scene1/01_Sky.png")
        this.load.image("layer2", "images/Scene1/02_Forest.png")
        this.load.image("layer3", "images/Scene1/03_Forest.png")
        this.load.image("layer4", "images/Scene1/04_Forest.png")
        this.load.image("layer5", "images/Scene1/05_Forest.png")
        this.load.image("layer6", "images/Scene1/06_Particles.png")
        this.load.image("layer7", "images/Scene1/07_Forest.png")
        this.load.image("layer8", "images/Scene1/08_Particles.png")
        this.load.image("layer9", "images/Scene1/09_Bushes.png")
        this.load.image("layer10", "images/Scene1/10_Mist.png")
    }

    create() {
        this.layer1 = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'layer1')
        this.layer2 = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'layer2')
        this.layer3 = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'layer3')
        this.layer4 = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'layer4')
        this.layer5 = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'layer5')
        this.layer6 = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'layer6')
        this.layer7 = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'layer7')
        this.layer8 = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'layer8')
        this.layer9 = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'layer9')
        this.layer10 = this.add.tileSprite(0, 0, CONFIG.width, CONFIG.height, 'layer10')

        this.layer1.setOrigin(0,0)
        this.layer2.setOrigin(0,0)
        this.layer3.setOrigin(0,0)
        this.layer4.setOrigin(0,0)
        this.layer5.setOrigin(0,0)
        this.layer6.setOrigin(0,0)
        this.layer7.setOrigin(0,0)
        this.layer8.setOrigin(0,0)
        this.layer9.setOrigin(0,0)
        this.layer10.setOrigin(0,0)

        // document.getElementById('menu').addEventListener('click', () => this.scene.start('main'))
        this.scene.start('main')
    }

    update() {
        this.layer1.tilePositionX += 0.5
        this.layer2.tilePositionX += 0.5
        this.layer3.tilePositionX += 1.5
        this.layer4.tilePositionX += 1.5
        this.layer5.tilePositionX += 2.5
        this.layer6.tilePositionX += 2.5
        this.layer7.tilePositionX += 3.5
        this.layer8.tilePositionX += 3.5
        this.layer9.tilePositionX += 4.5
        this.layer10.tilePositionX += 4.5
    }
}