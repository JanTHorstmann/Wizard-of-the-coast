class ThrowableEnemieObjects extends MovableObject {
    x = 120;
    y = 100;
    counter = 0;
    throw = false;
    world;
    offSet = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5,
    }

    IMAGES_ENDBOSS_THROW_ATTACK = [
        'img/enemies/dragon/attack1_fire/Fire_Attack1.png',
        'img/enemies/dragon/attack1_fire/Fire_Attack2.png',
        'img/enemies/dragon/attack1_fire/Fire_Attack3.png',
        'img/enemies/dragon/attack1_fire/Fire_Attack4.png',
        'img/enemies/dragon/attack1_fire/Fire_Attack5.png',
        'img/enemies/dragon/attack1_fire/Fire_Attack6.png',
    ];

    constructor(x, y, active, world, enemy) {
        super().loadImage(this.IMAGES_ENDBOSS_THROW_ATTACK[0]);
        this.world = world
        this.enemy = enemy;
        this.loadImages(this.IMAGES_ENDBOSS_THROW_ATTACK);
        this.x = x;
        this.y = y;
        this.throw = active;
        this.animate();
    }

    /**
     * start animation after aktivation
     */
    animate() {
        setStoppableInterval(() => {
            if (this.throw && !this.enemy.endbossHurt) {
                this.playAnimation(this.IMAGES_ENDBOSS_THROW_ATTACK)
                this.x -= 70;
                this.y += 20;
                this.counter++;
                if (this.counter > this.IMAGES_ENDBOSS_THROW_ATTACK.length || this.enemy.endbossHurt) {
                    this.counter = 0;
                    this.throw = false;
                    this.world.removeEnemieThrowAttack();
                }
            }
        }, 80);
    }
}