class ThrowableObjects extends MovableObject {
    height = 80;
    width = 80;
    standardThrowObject = false;
    specialThrowObject = false;
    otherDirection = false;
    counter = 0;
    damage;

    IMAGES_STANDARD_THROW_OBJECT = [
        'img/fire_wizard/fire_ball/img1.png',
        'img/fire_wizard/fire_ball/img2.png',
        'img/fire_wizard/fire_ball/img3.png',
        'img/fire_wizard/fire_ball/img4.png',
        'img/fire_wizard/fire_ball/img5.png',
        'img/fire_wizard/fire_ball/img6.png',
        'img/fire_wizard/fire_ball/img7.png',
        'img/fire_wizard/fire_ball/img8.png',
        'img/fire_wizard/fire_ball/img9.png',
        'img/fire_wizard/fire_ball/img10.png',
        'img/fire_wizard/fire_ball/img11.png',
        'img/fire_wizard/fire_ball/img12.png',
    ];

    IMAGES_SPECIAL_THROW_OBJECT = [
        'img/fire_wizard/flame_jet/img1.png',
        'img/fire_wizard/flame_jet/img2.png',
        'img/fire_wizard/flame_jet/img3.png',
        'img/fire_wizard/flame_jet/img4.png',
        'img/fire_wizard/flame_jet/img5.png',
        'img/fire_wizard/flame_jet/img6.png',
        'img/fire_wizard/flame_jet/img7.png',
        'img/fire_wizard/flame_jet/img8.png',
        'img/fire_wizard/flame_jet/img9.png',
        'img/fire_wizard/flame_jet/img10.png',
        'img/fire_wizard/flame_jet/img11.png',
    ];

    standardThrowObject_audio = new Audio('audio/fireball.mp3')
    specialThrowObject_audio = new Audio('audio/flamejet.mp3')

    constructor(x, y, active, world, spell) {
        super();
        this.loadImage('img/fire_wizard/fire_ball/img1.png');
        this.world = world;
        this.otherDirection = this.world.character.otherDirection;
        if (spell == 'standardThrowObject') {
            this.damage = 1;
            this.standardThrowObject = active
        }
        if (spell == 'specialThrowObject') {
            this.damage = 2;
            this.specialThrowObject = active
        }
        this.x = x;
        this.y = y;
        this.loadImages(this.IMAGES_STANDARD_THROW_OBJECT)
        this.loadImages(this.IMAGES_SPECIAL_THROW_OBJECT)
        this.animate();
    }

    /**
     * start animation sequnce
     */
    animate() {
        setStoppableInterval(() => {
            if (this.standardThrowObject) {
                this.throwStandardObject();
            }
            if (this.specialThrowObject) {
                this.throwSpecialObject();
            }
        }, 50);
    }

    /**
     * play animation of Standardattack
     */
    throwStandardObject() {
        this.playAnimationSound('standard');
        this.throwDirection(20);
        this.playAnimation(this.IMAGES_STANDARD_THROW_OBJECT);        
        this.counter++
        if (this.counter >= this.IMAGES_STANDARD_THROW_OBJECT.length) {
            this.counter = 0;
            this.standardThrowObject = false;
            this.world.removeThrowableObject();
        }
        setTimeout(() => {
            this.standardThrowObject_audio.pause();
        }, 500);
    }

    /**
     * play animation of Specialattack
     */
    throwSpecialObject() {
        this.playAnimationSound('special');
        this.throwDirection(50);
        this.playAnimation(this.IMAGES_SPECIAL_THROW_OBJECT);        
        this.counter++
        if (this.counter >= this.IMAGES_SPECIAL_THROW_OBJECT.length) {
            this.counter = 0;
            this.specialThrowObject = false;
            this.world.removeThrowableObject();
        }
        setTimeout(() => {
            this.specialThrowObject_audio.pause();
        }, 1000);
    }

    /**
     * describes the direction in which the object should move
     * @param {number} distance 
     */
    throwDirection(distance) {
        if (this.otherDirection) {
            this.x -= distance;
        } else {
            this.x += distance;
        }
    }

    /**
     * play sound from the attack
     * @param {string} attackCategory 
     */
    playAnimationSound(attackCategory) {
        if (soundOn) {
            if (attackCategory == 'standard') {
                this.standardThrowObject_audio.play();
            }
            if (attackCategory == 'special') {
                this.specialThrowObject_audio.play();
            }
        }
    }

}