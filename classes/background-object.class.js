class BackgroundObject extends MovableObject {    
    canvasHeight = 480;
    canvasWidth = 720;
    width = 720;
    height = 480
    
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = this.canvasHeight - this.height;
    }
}