class MovableObject extends DrawableObjects {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;

    /**
     * Apply gravity to the character's vertical position.
     */
    applyGravity() {
        setStoppableInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (!this.isAboveGround()) {
                this.y = 300;
            };
        }, 50)
    }

    /**
     * check if the character is above the ground
     * @returns 
     */
    isAboveGround() {
        return this.y < 300;
    }

    /**
     * plays the image sequence as an animation
     * @param {array} images 
     * @param {string} currentImage 
     * @param {string} animatedFigure 
     */
    playAnimation(images, currentImage, animatedFigure) {
        if (animatedFigure == 'enemie') {
            this.playAnimationForEnemie(images, currentImage);
        }
        if (animatedFigure == 'character') {
            this.playAnimationForCharacter(images, currentImage)
        }        
        let path = images[this.currentImage];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * plays the image sequence as an animation for enemies
     * @param {array} images 
     * @param {string} currentImage 
     */
    playAnimationForEnemie(images, currentImage) {
        this.currentImage = currentImage % images.length;
        this.currentImageEnemie++;
        this.currentImageEnemieHurt++;
    }

    /**
     * plays the image sequence as an animation for character
     * @param {array} images 
     * @param {string} currentImage 
     */
    playAnimationForCharacter(images, currentImage) {
        this.currentImage = currentImage % images.length;
        this.currentImageCharacter++;
    }

    /**
     * move to the right side
     */
    moveRight() {
        this.x += this.speed;
    };

    /**
     * move to the left side
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * set YSpeed for Gravity
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * checks whether object is dead
     * @returns true if energy = 0
     */
    isDead() {
        return this.energy == 0;
    }
}