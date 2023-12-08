class StatusbarHealthEndboss extends DrawableObjects {
    percentage = 5;

    IMAGES_HEALTH_ENDBOSS = [
        'img/statusbar/health_endboss/lifebar-00.png',
        'img/statusbar/health_endboss/lifebar-20.png',
        'img/statusbar/health_endboss/lifebar-40.png',
        'img/statusbar/health_endboss/lifebar-60.png',
        'img/statusbar/health_endboss/lifebar-80.png',
        'img/statusbar/health_endboss/lifebar-100.png',
    ];

    IMAGES_HEALTH_ENDBOSS_HURT = [
        'img/statusbar/health_endboss/hurt/lifebar-00-hurt.png',
        'img/statusbar/health_endboss/hurt/lifebar-20-hurt.png',
        'img/statusbar/health_endboss/hurt/lifebar-40-hurt.png',
        'img/statusbar/health_endboss/hurt/lifebar-60-hurt.png',
        'img/statusbar/health_endboss/hurt/lifebar-80-hurt.png',
        'img/statusbar/health_endboss/hurt/lifebar-100-hurt.png',
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH_ENDBOSS);
        this.loadImages(this.IMAGES_HEALTH_ENDBOSS_HURT);
        this.x = 380;
        this.y = 43;
        this.width = 325;
        this.height = 55;
        this.setEndbossHealthPercentage(5);
    }

    /**
     * set Statusbar equal to energy
     * @param {number} percentage 
     */
    setEndbossHealthPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH_ENDBOSS_HURT[this.getImageIndex()];
        this.img = this.imageCache[path];
        setTimeout(() => {
            let path = this.IMAGES_HEALTH_ENDBOSS[this.getImageIndex()];
            this.img = this.imageCache[path];
        }, 500);

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
}