class MovableObject extends DrawableObjects {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    lastHit = 0;

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

    isAboveGround() {
        return this.y < 300;
    }

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

    playAnimationForEnemie(images, currentImage) {
        this.currentImage = currentImage % images.length;
        this.currentImageEnemie++;
        this.currentImageEnemieHurt++;
    }

    playAnimationForCharacter(images, currentImage) {
        this.currentImage = currentImage % images.length;
        this.currentImageCharacter++;
    }

    moveRight() {
        this.x += this.speed;
    };

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }

    isDead() {
        return this.energy == 0;
    }
}