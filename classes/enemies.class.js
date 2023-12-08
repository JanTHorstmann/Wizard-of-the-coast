class Enemie extends MovableObject {
    isHurt = false;
    isDead = false;
    isAttack = false;
    intervalCounterEnemie = 0;
    energy = 2;

    /**
     * start animation sequence
     */
    animate() {
        setStoppableInterval(() => {
            if (!this.isHurt && !this.isDead && !this.isAttack) {
                this.moveLeft();
            }
        }, 1000 / 60);
        setStoppableInterval(() => {
            this.animatonTypes();
        }, 200);
    };

    /**
     * all animations that are available
     */
    animatonTypes() {
        if (!this.isHurt && !this.isDead && !this.isAttack) {
            this.walkAnimation();
        };
        if (this.isAttack && !this.isHurt && !this.isDead) {
            this.attackAnimation();
        };
        if (this.isHurt && !this.isDead) {
            this.hurtAnimation();
        };
        if (this.isDead) {
            this.dieAnimation();
        };
    }

    /**
     * play walk animation
     */
    walkAnimation() {
        this.playAnimation(this.IMAGES_WALKING, this.currentImageEnemie, 'enemie');
        this.currentImageEnemieHurt = 0;
    }

    /**
     * play hurt animation
     */
    hurtAnimation() {
        this.resetCounter('currentImage');
        if (this.energy > 0) {
            this.playAnimation(this.IMAGES_HURT, this.currentImageEnemieHurt, 'enemie');
            this.intervalCounterEnemie++
            if (this.intervalCounterEnemie == this.IMAGES_HURT.length) {
                this.resetCounter();
                this.isHurt = false;
            }
        } else {
            this.currentImageEnemie = 0;
            this.isHurt = false;
            this.isDead = true;
        };
    }

    /**
     * play die animation
     */
    dieAnimation() {
        this.resetCounter('currentImage');
        this.playAnimation(this.IMAGES_DEATH, this.currentImageEnemieHurt, 'enemie');
        this.intervalCounterEnemie++;
        if (this.intervalCounterEnemie == this.IMAGES_DEATH.length) {
            this.resetCounter();
        };
    }

    /**
     * play attack animation
     */
    attackAnimation() {
        this.resetCounter('currentImage');
        this.playAnimation(this.IMAGES_ATTACK, this.currentImageEnemieHurt, 'enemie');
        this.intervalCounterEnemie++
        if (this.intervalCounterEnemie == this.IMAGES_ATTACK.length) {
            this.resetCounter();
            this.isAttack = false;
        }
    }

    /**
     * reset the Images counter
     * @param {string} id 
     */
    resetCounter(id) {
        if (id == 'currentImage') {
            this.currentImage = 0;
        } else {
            this.currentImageEnemieHurt = 0;
            this.intervalCounterEnemie = 0;
        }
    }
}