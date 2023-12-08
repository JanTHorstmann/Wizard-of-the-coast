class DrawableObjects {
    x = 120;
    y = 230;
    height = 150;
    width = 100;
    img;
    imageCache = {};
    currentImage = 0;
    currentImageCharacter = 0;
    currentImageEnemie = 0;
    currentImageEnemieHurt = 0;

    /**
     * load an Image to draw
     * @param {string} path 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    };

    /**
     * load Image Array from Class
     * @param {array} arr 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    /**
     * Draws the image of the object on the canvas context
     * @param {CanvasRenderingContext2D} ctx 
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.log('Error', e);
            console.log('Image couldn´t load', this.img, this);
        };
    };
    
    /**
     * check collision to another object
     * @param {object} obj 
     * @returns is true if collision to an object
     */
    isCollidingToObject(obj) {
        if ((this.x + this.width) >= (obj.x + obj.offSet.left) && this.x <= (obj.x + obj.width - obj.offSet.right) &&
            (this.y + this.height) >= (obj.y + obj.offSet.top) && this.y <= (obj.y + obj.height)) {
            let isColliding = false
            if (this.isCollidingTop(obj)) {
                this.hitAndJumpUp(obj, isColliding)
            } else {
                return true;
            };
        };
        return false;
    };

    /**
     * jump if collidiing to object is from top
     * @param {object} obj 
     * @param {boolean} isColliding 
     */
    hitAndJumpUp(obj, isColliding) {
        this.world.character.playAnimationSound('jumpSound');
        this.speedY = 20;
        this.jumping = true;
        this.intervalCounter = 0;
        isColliding = true
        this.world.collisionToEnemie(obj, isColliding, this.onJumpDamage);        
    }

    /**
     * check collision to another object from top
     * @param {object} obj 
     * @returns true if collision from top
     */
    isCollidingTop(obj) {
        if ((this.y + this.height / 2) <= (obj.y)) {
            return true;
        } else {
            return false;
        };
    };

/**
 * check collision to an collectableobject
 * @param {object} obj 
 * @returns true if colliding
 */
    isCollidingToItem(obj) {
        if ((this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && (this.y + this.height) >= obj.y && this.y <= (obj.y + obj.height)) {
            return true;
        } else {
            return false;
        };
    };
}