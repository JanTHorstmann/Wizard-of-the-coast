class Lizard extends Enemie {
    y = 300;
    height = 100;
    width = this.height;
    offSet = {
        top: 0,
        bottom: 20,
        left: 40,
        right: 40,
    }

    IMAGES_WALKING = [
        'img/enemies/lizard/walk/Walk1.png',
        'img/enemies/lizard/walk/Walk2.png',
        'img/enemies/lizard/walk/Walk3.png',
        'img/enemies/lizard/walk/Walk4.png',
        'img/enemies/lizard/walk/Walk5.png',
        'img/enemies/lizard/walk/Walk6.png',
    ];

    IMAGES_IDLE = [
        'img/enemies/lizard/idle/Idle1.png',
        'img/enemies/lizard/idle/Idle2.png',
        'img/enemies/lizard/idle/Idle3.png',
    ];

    IMAGES_ATTACK = [
        'img/enemies/lizard/attack/Attack1.png',
        'img/enemies/lizard/attack/Attack2.png',
        'img/enemies/lizard/attack/Attack3.png',
        'img/enemies/lizard/attack/Attack4.png',
        'img/enemies/lizard/attack/Attack5.png',
    ]

    IMAGES_HURT = [
        'img/enemies/lizard/hurt/Hurt1.png',
        'img/enemies/lizard/hurt/Hurt2.png',
    ];

    IMAGES_DEATH = [
        'img/enemies/lizard/death/Death1.png',
        'img/enemies/lizard/death/Death2.png',
        'img/enemies/lizard/death/Death3.png',
        'img/enemies/lizard/death/Death4.png',
        'img/enemies/lizard/death/Death5.png',
        'img/enemies/lizard/death/Death6.png',
    ]

    constructor(x) {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
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