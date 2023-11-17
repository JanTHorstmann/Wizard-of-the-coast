class Enemie extends MovableObject {
    isHurt = false;
    isDead = false;
    isAttack = false;
    intervalCounterEnemie = 0;
    energy = 2;



    //--------------------------------------------------------------------------------------------------//
    //---------------------------------------animate all Picture----------------------------------------//
    //--------------------------------------------------------------------------------------------------//
    animate() {
        //----------------------------------------move Left-----------------------------------------//
        setStoppableInterval(() => {
            if (!this.isHurt && !this.isDead && !this.isAttack) {
                this.moveLeft();
            }
        }, 1000 / 60);

        //------------------------------------Walking animation------------------------------------//
        setStoppableInterval(() => {
            if (!this.isHurt && !this.isDead && !this.isAttack) {
                this.playAnimation(this.IMAGES_WALKING, this.currentImageEnemie, 'enemie');
                this.currentImageEnemieHurt = 0;
            };

            //-------------------------------------Hurt animation-------------------------------------//
            if (this.isHurt && !this.isDead) {
                this.hurtAnimation();
            };

            //-------------------------------------Dead animation-------------------------------------//
            if (this.isDead) {
                this.dieAnimation();
            };
        }, 200);

        //------------------------------------Attack animation-----------------------------------//
        setStoppableInterval(() => {
            if (this.isAttack && !this.isHurt && !this.isDead) {
                this.attackAnimation();
            }
        }, 150);

    } //end animate

    hurtAnimation() {
        this.resetCounter('currentImage');
        if (this.energy > 0) {
            this.playAnimation(this.IMAGES_HURT, this.currentImageEnemieHurt, 'enemie');
            this.intervalCounterEnemie++
            if (this.intervalCounterEnemie > this.IMAGES_HURT.length) {
                this.resetCounter();
                this.isHurt = false;
            }
        } else {
            this.currentImageEnemie = 0;
            this.isHurt = false;
            this.isDead = true;
        };
    }

    dieAnimation() {
        this.resetCounter('currentImage');
        this.playAnimation(this.IMAGES_DEATH, this.currentImageEnemieHurt, 'enemie');
        this.intervalCounterEnemie++;
        if (this.intervalCounterEnemie == this.IMAGES_DEATH.length) {
            this.resetCounter();
        };
    }

    attackAnimation() {
        this.resetCounter('currentImage');
        this.playAnimation(this.IMAGES_ATTACK, this.currentImageEnemieHurt, 'enemie');
        this.intervalCounterEnemie++
        if (this.intervalCounterEnemie > this.IMAGES_HURT.length) {
            this.resetCounter();
            this.isAttack = false;
        }
    }

    resetCounter(id) {
        if (id == 'currentImage') {
        this.currentImage = 0;            
        } else {
            this.currentImageEnemieHurt = 0;
            this.intervalCounterEnemie = 0;
        }
    }
}