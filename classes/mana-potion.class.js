class Manapotion extends DrawableObjects {
    height = 50;
    width = 50;
    x = 500;
    y = 400;
    collect = false;

    IMAGES_MANA_POTION = [
        'img/statusbar/mana/mana_tp.png',
    ];

    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_MANA_POTION);
        this.x = x;
        this.y = y;
    }
}