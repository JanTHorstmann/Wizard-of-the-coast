class StatusbarHealth extends DrawableObjects {
    percentage = 5;

    IMAGES_HEALTH = [
        'img/statusbar/health/lifebar-00.png',        
        'img/statusbar/health/lifebar-20.png',        
        'img/statusbar/health/lifebar-40.png',        
        'img/statusbar/health/lifebar-60.png',        
        'img/statusbar/health/lifebar-80.png',        
        'img/statusbar/health/lifebar-100.png',        
    ];    

    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);        
        this.x = 30;
        this.y = 10;
        this.width = 350;
        this.height = 40
        this.setHealthPercentage(100);
    }

    setHealthPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.getImageIndex()];
        this.img = this.imageCache[path];

    }

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