class Endboss extends MovableObject {
    y = -80;
    speed = 20;
    height = 500;
    width = this.height;
    intervalCounterEnemie = 0;
    hadFirstContact = false;
    endbossAttack = false;
    endbossThrowAttack = false;
    endbossHurt = false;
    endbossDead = false;
    endbossEnergy = 6;

    offSet = {
        top: 20,
        bottom: 20,
        left: 100,
        right: 20,
    }

    IMAGES_IDLE = [
        'img/enemies/dragon/idle/Idle1.png',
        'img/enemies/dragon/idle/Idle2.png',
        'img/enemies/dragon/idle/Idle3.png',
    ];

    IMAGES_ATTACK = [
        'img/enemies/dragon/attack1/Attack1.png',
        'img/enemies/dragon/attack1/Attack2.png',
        'img/enemies/dragon/attack1/Attack3.png',
        'img/enemies/dragon/attack1/Attack4.png',
    ];

    IMAGES_WALKING = [
        'img/enemies/dragon/walk/Walk1.png',
        'img/enemies/dragon/walk/Walk2.png',
        'img/enemies/dragon/walk/Walk3.png',
        'img/enemies/dragon/walk/Walk4.png',
        'img/enemies/dragon/walk/Walk5.png',
    ];

    IMAGES_HURT = [
        'img/enemies/dragon/hurt/Hurt1.png',
        'img/enemies/dragon/hurt/Hurt2.png',
    ]

    IMAGES_DEATH = [
        'img/enemies/dragon/death/Death1.png',
        'img/enemies/dragon/death/Death2.png',
        'img/enemies/dragon/death/Death3.png',
        'img/enemies/dragon/death/Death4.png',
        'img/enemies/dragon/death/Death5.png',
    ]

    constructor() {
        super().loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEATH);
        this.x = 4000;
        this.animate();
    };

    idleImageCounter = 0;                          //for Idle Intercall
    attackImageCounter = this.IMAGES_ATTACK.length;  //for Attack Intervall
    walkImageCounter = this.IMAGES_WALKING.length; //for Walking Intervall


    //--------------------------------------------------------------------------------------------------//
    //---------------------------------------animate all Picture----------------------------------------//
    //--------------------------------------------------------------------------------------------------//

    animate() {
        setStoppableInterval(() => {
            if (this.canIdleAnimate()) {
                this.idleAnimation();
            } else {
                if (this.canStartRandomAnimationFolder()) {
                    this.getRandomNumberForAnimation();
                }
                if (this.canAttackAnimate()) {
                    this.attackAnimation();
                }
                if (this.canWalkAnimate()) {
                    this.walkAnimation();
                }
            }
            //------------------------------Check if Charcter at X Coordinate----------------------------//
            if (world) {
                if (world.character.x > 3445 && !this.hadFirstContact) {
                    this.idleImageCounter = 0;
                    this.hadFirstContact = true;
                }
            }
            //---------------------------------------Hurt animation-------------------------------------//
            if (this.endbossHurt && !this.endbossDead) {
                this.hurtAnimation();
            }
            //---------------------------------------Dead animation-------------------------------------//
            if (this.endbossDead) {
                this.dieAnimation();
            }
        }, 200)
    } //end animate

    canIdleAnimate() {
        return this.idleImageCounter < 10 &&
            this.hadFirstContact &&
            !this.endbossHurt &&
            !this.endbossDead
    }

    canStartRandomAnimationFolder() {
        return this.attackImageCounter == this.IMAGES_ATTACK.length &&
            this.walkImageCounter == this.IMAGES_WALKING.length &&
            this.hadFirstContact;
    }

    canAttackAnimate() {
        return this.attackImageCounter < this.IMAGES_ATTACK.length &&
            this.walkImageCounter == this.IMAGES_WALKING.length &&
            !this.endbossHurt && !this.endbossDead;
    }

    canWalkAnimate() {
        return this.walkImageCounter < this.IMAGES_WALKING.length &&
            this.attackImageCounter == this.IMAGES_ATTACK.length &&
            !this.endbossHurt && !this.endbossDead;
    }

    getRandomNumberForAnimation() {
        const randomNumber = Math.floor(Math.random() * 2) + 1;
        if (randomNumber == 1) {
            this.attackImageCounter = 0;
        } else {
            this.walkImageCounter = 0;
        }
    }

    idleAnimation() {
        this.playAnimation(this.IMAGES_IDLE, this.currentImageEnemie, 'enemie');
        this.idleImageCounter++
        if (this.idleImageCounter == this.IMAGES_IDLE.length) {
            this.currentImageEnemie = 0;
        }
    }

    attackAnimation() {
        this.playAnimation(this.IMAGES_ATTACK, this.currentImageEnemie, 'enemie');
        this.attackImageCounter++
        if (this.attackImageCounter == this.IMAGES_ATTACK.length) {
            this.endbossAttack = true;
            this.currentImageEnemie = 0;
        }
    }

    walkAnimation() {
        this.playAnimation(this.IMAGES_WALKING, this.currentImageEnemie, 'enemie');
        this.moveLeft();
        this.walkImageCounter++
        if (this.walkImageCounter == this.IMAGES_WALKING.length) {
            this.currentImageEnemie = 0;
        }
    }

    hurtAnimation() {
        if (this.endbossEnergy > 0) {
            this.playAnimation(this.IMAGES_HURT, this.currentImageEnemieHurt, 'enemie');
            this.intervalCounterEnemie++
            if (this.intervalCounterEnemie > this.IMAGES_HURT.length) {
                this.currentImageEnemie = 0;
                this.currentImageEnemieHurt = 0;
                this.intervalCounterEnemie = 0;
                this.endbossHurt = false;
            }
        } else {
            this.currentImageEnemieHurt = 0;
            this.endbossHurt = false;
            this.endbossDead = true;
        }
    }

    dieAnimation() {
        this.playAnimation(this.IMAGES_DEATH, this.currentImageEnemieHurt, 'enemie');
        this.intervalCounterEnemie++
        if (this.intervalCounterEnemie >= this.IMAGES_DEATH.length) {
            stoppGame();
        }
    }
}