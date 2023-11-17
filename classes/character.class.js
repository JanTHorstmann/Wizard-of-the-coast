class Character extends MovableObject {
    x = 120;
    y = 300;
    height = 100;
    width = 100;
    speed = 5;
    intervalCounter = 0;
    energy = 5;
    mana = 0;
    onJumpDamage = 1;
    idle = false;
    jumping = false;
    hurt = false;
    dead = false;
    attackFireBallGeste = false;
    attackFlameJetGeste = false;




    walking_sound = new Audio('audio/running.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurt_sound = new Audio('audio/hurt.mp3');



    //--------------------------------------------------------------------------------------------------//
    //---------------------------------------animate all Picture----------------------------------------//
    //--------------------------------------------------------------------------------------------------//
    animate() {
        //---------------------------------check Idle for animation---------------------------------//
        setStoppableInterval(() => {
            if (this.canAnimateIdle()) {
                this.clearIntervalCounter();
                this.idle = true;
            }
        }, 1000);

        setStoppableInterval(() => {
            //--------------------------------------Idle animation-------------------------------------//
            if (this.idle && !this.jumping && !this.dead) {
                this.playAnimation(this.IMAGES_IDLE, this.currentImageCharacter, 'character')
                this.intervalCounter++
                if (this.intervalCounter > this.IMAGES_IDLE.length) {
                    this.clearIntervalCounter();
                };                
            };
        }, 200);

        setStoppableInterval(() => {
            this.clearAnimationSounds();
            //---------------------------activate Standard Attack animation---------------------------//
            if (this.world.keyboard.S && !this.attack1 && !this.standardAttackGeste && !this.dead) {
                this.clearAnimationCondition();
                this.standardAttackGeste = true;
                this.currentImageCharacter = 0;
                this.clearIntervalCounter();
            };

            //---------------------------activate Special Attack animation--------------------------//
            if (this.world.keyboard.A && !this.standardAttackGeste && !this.specialAttackGeste && !this.dead) {
                this.clearAnimationCondition();
                this.specialAttackGeste = true;
                this.currentImageCharacter = 0;
                this.clearIntervalCounter();
            };

            //-------------------------------Charcter move up and Fall-------------------------------//
            if (this.world.keyboard.Up && !this.isAboveGround() && !this.jumping && !this.dead) {
                this.playAnimationSound('jumpSound');
                this.jump();
                this.clearIntervalCounter();
                this.clearAnimationCondition();
                this.jumping = true;
                this.currentImageCharacter = 0;
            };

            //-----------------------------Move Right and Left animation-----------------------------//
            this.clearAnimationSounds();
            if (this.world.keyboard.Right && !this.hurt && !this.jumping && !this.dead || this.world.keyboard.Left && !this.hurt && !this.jumping && !this.dead) {
                this.playAnimationSound('walkSound');
                this.clearAnimationCondition();
                this.playAnimation(this.IMAGES_WALKING, this.currentImageCharacter, 'character');
            };

            //-------------------------------Standard Attack animation-------------------------------//
            if (this.standardAttackGeste && !this.dead) {
                this.playAnimation(this.IMAGES_STANDARD_ATTACK_GESTE, this.currentImageCharacter, 'character');
                this.intervalCounter++;
                if (this.intervalCounter > this.IMAGES_STANDARD_ATTACK_GESTE.length) {
                    this.clearIntervalCounter();
                    this.standardAttackGeste = false
                    this.world.standardThrowObject = true;
                    this.loadImage(this.IMAGES_IDLE[0]);
                };
            };

            //------------------------------------Hurt animation------------------------------------//
            if (this.hurt && !this.dead) {
                this.playAnimationSound('hurtSound');
                this.clearAnimationCondition();
                this.playAnimation(this.IMAGES_HURT, this.currentImageCharacter, 'character');
                this.intervalCounter++
                if (this.intervalCounter > this.IMAGES_HURT.length) {
                    this.clearIntervalCounter();
                    this.currentImageCharacter = 0;
                    this.hurt = false;
                    if (this.energy > 0) {
                        this.energy--;
                    } else {
                        this.dead = true;
                    };
                };
            };

            //------------------------------------Dead animation------------------------------------//
            if (this.dead) {
                this.playAnimation(this.IMAGES_DEAD, this.currentImageCharacter, 'character')
                this.intervalCounter++;
                if (this.intervalCounter >= this.IMAGES_DEAD.length) {
                    this.loadImage(this.IMAGES_DEAD[5]);
                    stoppGame();
                    setTimeout(() => {
                        deadScreen();
                    }, 500);
                };
            };
        }, 100);

        //------------------------------Move Right and Left on Map------------------------------//
        setStoppableInterval(() => {
            if (this.canMoveRight()) {
                this.moveRight();
                this.otherDirection = false;
            }
            if (this.canMoveLeft()) {
                this.moveLeft();
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        //-----------------------------------Jump animation------------------------------------//
        setStoppableInterval(() => {
            if (this.jumping && !this.dead && !this.hurt) {
                this.playAnimation(this.IMAGES_JUMPING, this.currentImageCharacter, 'character')
                this.intervalCounter++
                if (this.intervalCounter > this.IMAGES_JUMPING.length) {
                    this.currentImageCharacter = 0;
                    this.clearAnimationSounds('jumpSound');
                    this.loadImage(this.IMAGES_IDLE[0]);
                    this.clearIntervalCounter();
                    this.jumping = false;
                };
            };

            //-------------------------------Special Attack animation-------------------------------//
            if (this.specialAttackGeste) {
                this.playAnimation(this.IMAGES_SPECIAL_ATTACK_GESTE, this.currentImageCharacter, 'character');
                this.intervalCounter++;
                if (this.intervalCounter > this.IMAGES_SPECIAL_ATTACK_GESTE.length) {
                    this.clearIntervalCounter();
                    this.specialAttackGeste = false
                    this.world.specialThrowObject = true;
                    this.loadImage(this.IMAGES_IDLE[0]);
                };
            };
        }, 100);
    }; //animate end

    playAnimationSound(soundAnimation) {
        if (soundAnimation == 'jumpSound') {
            this.jumping_sound.play();
        }
        if (soundAnimation == 'walkSound') {
            this.walking_sound.play();
        }
        if (soundAnimation == 'hurtSound') {
            this.hurt_sound.play();
        }
    }

    clearAnimationCondition() {
        this.idle = false;
        this.jumping = false;
        this.hurt = false;
        this.dead = false;
        this.standardAttackGeste = false;
        this.specialAttackGeste = false;
    }

    clearAnimationSounds(soundAnimation) {
        if (soundAnimation == 'jumpSound') {
            this.jumping_sound.pause();
        } else {
            this.walking_sound.pause();
            this.hurt_sound.pause();
        }
    }

    canAnimateIdle() {
        return !this.specialAttackGeste && !this.jumping && !this.hurt &&
            !this.idle && !this.dead && !this.standardAttackGeste &&
            !this.world.fireBall && !this.world.keyboard.Right && !this.world.keyboard.Left &&
            !this.world.keyboard.Up && !this.world.keyboard.Down && !this.world.keyboard.Space &&
            !this.world.keyboard.W && !this.world.keyboard.A && !this.world.keyboard.S &&
            !this.world.keyboard.D
    }

    canMoveRight() {
        return this.world.keyboard.Right && this.x < this.world.level.level_end_x
    }

    canMoveLeft() {
        return this.world.keyboard.Left && this.x > 100
    }

    clearIntervalCounter() {
        this.intervalCounter = 0;
    }
};