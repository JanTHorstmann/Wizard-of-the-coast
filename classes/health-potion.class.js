class Healthpotion extends DrawableObjects {
    height = 50;
    width = 50;
    x = 500;
    y = 400;
    collect = false;

    IMAGES_HEALTH_POTION = [
        'img/statusbar/health/health_tp.png',
    ];

    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_HEALTH_POTION);
        this.x = x;
        this.y = y;
    }
}