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

    /**
     * start Intervalls for animation
     */
    animate() {
        setStoppableInterval(() => {
            if (this.canAnimateIdle()) {
                this.animateIdle();
            };
        }, 200);

        setStoppableInterval(() => {
            this.clearAnimationSounds();
            this.enableAnimations();
            this.activateAnimations();
        }, 100);

        setStoppableInterval(() => {
            this.moveLeftOrRight()
        }, 1000 / 60);

        setStoppableInterval(() => {
            if (this.canAnimateJump()) {
                this.animateJump();
            };
            if (this.canAnimateSpecialAttack()) {
                this.animateSpecialAttack();
            };
        }, 100);
    };

    /**
     * activate Sound for animation
     * @param {string} soundAnimation 
     */
    playAnimationSound(soundAnimation) {
        if (soundOn) {
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
    }

    /**
     *  enable Animationcondition
     */
    enableAnimations() {
        // this.clearAnimationSounds();
        if (this.canEnableIdle()) {
            this.enableIdle();
        };
        if (this.canEnableStandardAttack()) {
            this.enableStandardAttack();
        };
        if (this.canEnableSpecialAttack()) {
            this.enableSpecialAttack();
        };
        if (this.canEnableJump()) {
            this.enableJump();
        };
    }

    /**
     * play Animations
     */
    activateAnimations() {
        if (this.canAnimateWalking()) {
            this.animateWalking();
        };
        if (this.canAnimateStandardAttack()) {
            this.animateStandardAttack();
        };
        if (this.canAnimateHurt()) {
            this.animateHurt();
        };
        if (this.canAnimateDead()) {
            this.animateDead();
        };
    }

    /**
     * clear Animation condition
     */
    clearAnimationCondition() {
        this.idle = false;
        this.jumping = false;
        this.hurt = false;
        this.dead = false;
        this.standardAttackGeste = false;
        this.specialAttackGeste = false;
    }

    /**
     * clear Animationsounds
     * @param {string} soundAnimation 
     */
    clearAnimationSounds(soundAnimation) {
        if (soundAnimation == 'jumpSound') {
            this.jumping_sound.pause();
        } else {
            this.walking_sound.pause();
            this.hurt_sound.pause();
        }
    }

    /**
     * check if can enable Idle conditions
     * @returns idle is true if all conditions are false
     */
    canEnableIdle() {
        return !this.specialAttackGeste && !this.jumping && !this.hurt &&
            !this.idle && !this.dead && !this.standardAttackGeste &&
            !this.world.fireBall && !this.world.keyboard.Right && !this.world.keyboard.Left &&
            !this.world.keyboard.Up && !this.world.keyboard.Down && !this.world.keyboard.Space &&
            !this.world.keyboard.W && !this.world.keyboard.A && !this.world.keyboard.S &&
            !this.world.keyboard.D
    }

    /**
     * enable Idle condition
     */
    enableIdle() {
        this.clearIntervalCounter();
        this.idle = true;
    }

    /**
     * check if can enable Idle animation
     * @returns idle animation is true if jumping and dead are false
     */
    canAnimateIdle() {
        return this.idle && !this.jumping && !this.dead;
    }

    /**
     * play Idle animation
     */
    animateIdle() {
        this.playAnimation(this.IMAGES_IDLE, this.currentImageCharacter, 'character')
        this.intervalCounter++;
        if (this.intervalCounter == this.IMAGES_IDLE.length) {
            this.clearIntervalCounter();
        };
    }

    /**
     * check if can enable StandardAttack conditions
     * @returns is true if pressed Key S and standardAttackGeste, dead and hurt are false
     */
    canEnableStandardAttack() {
        return this.world.keyboard.S && !this.standardAttackGeste
            && !this.dead && !this.hurt;
    }

    /**
     * enable StandardAttack condition
     */
    enableStandardAttack() {
        this.clearAnimationCondition();
        this.standardAttackGeste = true;
        this.currentImageCharacter = 0;
        this.clearIntervalCounter();
    }

    /**
     * check if can enable StandardAttack animation
     * @returns StandardAttack animation is true if hurt and dead are false
     */
    canAnimateStandardAttack() {
        return this.standardAttackGeste && !this.hurt && !this.dead;
    }

    /**
     * play StandardAttack
     */
    animateStandardAttack() {
        this.playAnimation(this.IMAGES_STANDARD_ATTACK_GESTE, this.currentImageCharacter, 'character');
        this.intervalCounter++;
        if (this.intervalCounter == this.IMAGES_STANDARD_ATTACK_GESTE.length) {
            this.clearIntervalCounter();
            this.standardAttackGeste = false
            this.world.standardThrowObject = true;
            this.loadImage(this.IMAGES_IDLE[0]);
        };
    }

    /**
     * check if can enable SpecialAttack conditions
     * @returns is true if pressed Key A and standardAttackGeste, specialAttackGeste, dead and hurt are false
     */
    canEnableSpecialAttack() {
        return this.world.keyboard.A && !this.standardAttackGeste &&
            !this.specialAttackGeste && !this.dead && !this.hurt;
    }

    /**
     * enable SpecialAttack condition
     */
    enableSpecialAttack() {
        this.clearAnimationCondition();
        this.specialAttackGeste = true;
        this.currentImageCharacter = 0;
        this.clearIntervalCounter();
    }

    /**
     * check if can enable Jump conditions
     * @returns is true if pressed Key ArrowUp and isAboveGround, jumping, dead are false
     */
    canEnableJump() {
        return this.world.keyboard.Up && !this.isAboveGround() &&
            !this.jumping && !this.dead;
    }

    /**
     * enable Jump condition
     */
    enableJump() {
        this.playAnimationSound('jumpSound');
        this.jump();
        this.clearIntervalCounter();
        this.clearAnimationCondition();
        this.jumping = true;
        this.currentImageCharacter = 0;
    }

    /**
     * check if can animate StandardAttack
     * @returns is true if jumping true and dead and hurt are false
     */
    canAnimateJump() {
        return this.jumping && !this.dead && !this.hurt;
    }

    /**
     * play Jump animation
     */
    animateJump() {
        this.playAnimation(this.IMAGES_JUMPING, this.currentImageCharacter, 'character')
        this.intervalCounter++
        if (this.intervalCounter == this.IMAGES_JUMPING.length) {
            this.currentImageCharacter = 0;
            this.clearAnimationSounds('jumpSound');
            this.loadImage(this.IMAGES_IDLE[0]);
            this.clearIntervalCounter();
            this.jumping = false;
        };
    }

    /**
     * check if can animate Walking
     * @returns is true if pressed Key ArrowRight and if hurt, jumping and dead are false or if pressed Key ArrowLeft and if hurt, jumping and dead are false
     */
    canAnimateWalking() {
        return this.world.keyboard.Right && !this.hurt &&
            !this.jumping && !this.dead ||
            this.world.keyboard.Left && !this.hurt &&
            !this.jumping && !this.dead;
    }

    /**
     * play Walk animation
     */
    animateWalking() {
        this.playAnimationSound('walkSound');
        this.clearAnimationCondition();
        this.playAnimation(this.IMAGES_WALKING, this.currentImageCharacter, 'character');
    }

    /**
     * check if can move Right
     * @returns is true if pressed Key ArrowRight and X of Character < Levelend
     */
    canMoveRight() {
        return this.world.keyboard.Right && this.x < this.world.level.level_end_x
    }

    /**
     * check if can animate Hurt
     * @returns is true if hurt and dead is false
     */
    canAnimateHurt() {
        return this.hurt && !this.dead;
    }

    /**
     * play Hurt animation
     */
    animateHurt() {
        this.playAnimationSound('hurtSound');
        this.clearAnimationCondition();
        this.playAnimation(this.IMAGES_HURT, this.currentImageCharacter, 'character');
        this.intervalCounter++
        if (this.intervalCounter >= this.IMAGES_HURT.length) {
            this.clearIntervalCounter();
            this.currentImageCharacter = 0;
            this.hurt = false;
            if (this.energy > 0) {
                this.energy--;
            } else {
                this.dead = true;
            };
        };
    }

    /**
     * check if can animate Dead
     * @returns is true if dead is true
     */
    canAnimateDead() {
        return this.dead;
    }

    /**
     * play Dead animation
     */
    animateDead() {
        this.playAnimation(this.IMAGES_DEAD, this.currentImageCharacter, 'character')
        this.intervalCounter++;
        if (this.intervalCounter == this.IMAGES_DEAD.length) {
            this.loadImage(this.IMAGES_DEAD[5]);
            stoppGame('lose');
            setTimeout(() => {
                endScreen('game-over');
            }, 1000);
        };
    }

    /**
     * check if can animate SpecialAttack
     * @returns 
     */
    canAnimateSpecialAttack() {
        return this.specialAttackGeste && !this.dead && !this.hurt;
    }

    /**
     * play SpecialAttack animation
     */
    animateSpecialAttack() {
        this.playAnimation(this.IMAGES_SPECIAL_ATTACK_GESTE, this.currentImageCharacter, 'character');
        this.intervalCounter++;
        if (this.intervalCounter == this.IMAGES_SPECIAL_ATTACK_GESTE.length) {
            this.clearIntervalCounter();
            this.specialAttackGeste = false;
            this.world.specialThrowObject = true;
            this.loadImage(this.IMAGES_IDLE[0]);
        };
    }

    /**
     * check if can move Left
     * @returns is true if pressed Key ArrowRight and X of Character < Levelend
     */
    canMoveLeft() {
        return this.world.keyboard.Left && this.x > 100;
    }

    /**
     * chek if can move Left or Right
     */
    moveLeftOrRight() {
        if (this.canMoveRight()) {
            this.moveRight();
            this.otherDirection = false;
        };
        if (this.canMoveLeft()) {
            this.moveLeft();
            this.otherDirection = true;
        };
        this.world.camera_x = -this.x + 100;
    }

    /**
     * reset Intervall Counter
     */
    clearIntervalCounter() {
        this.intervalCounter = 0;
    }
};