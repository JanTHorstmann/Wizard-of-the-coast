class StatusbarMana extends MovableObject {
    percentage = 5;
    counter = 0;
    manaAlert = false

    IMAGES_MANA = [
        'img/statusbar/mana/manabar-00.png',
        'img/statusbar/mana/manabar-20.png',
        'img/statusbar/mana/manabar-40.png',
        'img/statusbar/mana/manabar-60.png',
        'img/statusbar/mana/manabar-80.png',
        'img/statusbar/mana/manabar-100.png',
    ];

    IMAGES_MANA_ALERT = [
        'img/statusbar/mana/manabar-alert.png',
        'img/statusbar/mana/manabar-00.png',
        'img/statusbar/mana/manabar-alert.png',
        'img/statusbar/mana/manabar-00.png',
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_MANA);
        this.loadImages(this.IMAGES_MANA_ALERT);
        this.x = 30;
        this.y = 110;
        this.width = 300;
        this.height = 30;
        this.setManaPercentage(0);
        this.alert();
    }

    /**
     * set Statusbar equal to energy
     * @param {number} percentage 
     */
    setManaPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_MANA[this.getImageIndex()];
        this.img = this.imageCache[path];

    }

    /**
     * checks which images are required by Stausbar
     * @returns
     */
    getImageIndex() {
        if (this.percentage == 5) {
            return 5
        } else if (this.percentage == 4) {
            return 4
        } else if (this.percentage == 3) {
            return 3
        } else if (this.percentage == 2) {
            return 2
        } else if (this.percentage == 1) {
            return 1
        } else {
            return 0
        }
    }

    /**
     * change Image if manaAlert is true
     */
    alert() {
        setInterval(() => {
            if (this.manaAlert) {
                this.playAnimation(this.IMAGES_MANA_ALERT, this.currentImageCharacter, 'character')
                this.counter++
                if (this.counter > this.IMAGES_MANA_ALERT.length) {
                    this.counter = 0;
                    // this.currentImageCharacter = 0;
                    this.manaAlert = false;
                    this.setManaPercentage(0);
                }
            }
        }, 200);
    }
}