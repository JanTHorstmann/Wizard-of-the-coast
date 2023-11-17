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

    loadImage(path) {
        this.img = new Image(); // ist gleich wie: this.img = document.getElementById('image');
        this.img.src = path;
    };

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    };

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.log('Error', e);
            console.log('Image couldn´t load', this.img, this);
        };
    };

    // drawFrame(ctx) {
    //     if (this instanceof Character || this instanceof ThrowableObjects || this instanceof ThrowableEnemieObjects || this instanceof Enemie || this instanceof Endboss || this instanceof Manapotion || this instanceof Healthpotion) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '5';
    //         ctx.strokeStyle = 'red';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     };
    // };

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

    hitAndJumpUp(obj, isColliding) {
        this.jumping_sound.play();
        this.speedY = 20;
        this.jumping = true;
        this.intervalCounter = 0;
        isColliding = true
        this.world.collisionToEnemie(obj, isColliding, this.onJumpDamage);
        console.log('hit top');
        // setTimeout(() => {
        //     this.jumping_sound.pause();
        // }, 50);
    }

    isCollidingTop(obj) {
        if ((this.y + this.height / 2) <= (obj.y)) {
            return true;
        } else {
            return false;
        };
    };


    isCollidingToItem(obj) {
        if ((this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) && (this.y + this.height) >= obj.y && this.y <= (obj.y + obj.height)) {
            return true;
        } else {
            return false;
        };
    };
}