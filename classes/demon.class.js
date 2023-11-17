class Demon extends Enemie {
    y = 260;
    height = 150;
    width = this.height;
    offSet = {
        top: 20,
        bottom: 20,
        left: 40,
        right: 40,
    }

    IMAGES_WALKING = [
        'img/enemies/demon/walk/Walk1.png',
        'img/enemies/demon/walk/Walk2.png',
        'img/enemies/demon/walk/Walk3.png',
        'img/enemies/demon/walk/Walk4.png',
        'img/enemies/demon/walk/Walk5.png',
        'img/enemies/demon/walk/Walk6.png',
    ];

    IMAGES_IDLE = [
        'img/enemies/demon/idle/Idle1.png',
        'img/enemies/demon/idle/Idle2.png',
        'img/enemies/demon/idle/Idle3.png',
    ];

    IMAGES_ATTACK = [
        'img/enemies/demon/attack/Attack1.png',
        'img/enemies/demon/attack/Attack2.png',
        'img/enemies/demon/attack/Attack3.png',
        'img/enemies/demon/attack/Attack4.png',
    ]

    IMAGES_HURT = [
        'img/enemies/demon/hurt/Hurt1.png',
        'img/enemies/demon/hurt/Hurt2.png',
    ];

    IMAGES_DEATH = [
        'img/enemies/demon/death/Death1.png',
        'img/enemies/demon/death/Death2.png',
        'img/enemies/demon/death/Death3.png',
        'img/enemies/demon/death/Death4.png',
        'img/enemies/demon/death/Death5.png',
        'img/enemies/demon/death/Death6.png',
    ]

    constructor(x) {
        super();
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        this.x = 200 + Math.random() * 500 + x;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }
}