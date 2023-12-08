class World {
    character = new FireWizard();
    level = level1;
    statusBarHealth = new StatusbarHealth();
    statusBarMana = new StatusbarMana();
    statusBarHealthEndboss;
    collectibleItems = [];
    throwableObjects = [];
    throwableEnemieObjects = [];
    magicAttack;
    standardThrowObject = false;
    specialThrowObject = false;
    isColliding = false;
    hasEndbossAttack = false;
    world_sound = new Audio('audio/background-music-1.mp3');
    soundCount = 0;
    canvas;
    keyboard;
    ctx;
    camera_x = 0;
    z = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.playWorldSound();
    }

    /**
     * play background music
     */
    playWorldSound() {
        setStoppableInterval(() => {
            if (soundOn) {
                this.world_sound.play();
            } else {
                this.world_sound.pause();
            }
        }, 50);
    }

    /**
     * sets a reference from the character to the world
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * checks collisions of all objects
     */
    run() {
        setStoppableInterval(() => {
            this.collisionCharactertoEnemie();
            this.checkThrowableObjects();
            this.checkCollisiontoCollectebleItem();
            if (this.throwableObjects[0]) {
                this.checkCollisionsThrowableObject();
            }
            if (this.throwableEnemieObjects[0]) {
                this.collisionCharactertoThrowObject();
            }
        }, 50);
    }

    /**
     * checks collision from character to enemie
     */
    collisionCharactertoEnemie() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isCollidingToObject(enemy)) {
                this.isColliding = true;
                enemy.isAttack = true;
                if (this.character.energy > 0) {
                    this.character.hurt = this.isColliding;
                } else {
                    this.character.dead = true;
                }
            }
        });
        this.statusBarHealth.setHealthPercentage(this.character.energy);
    }

    /**
     * checks collision from character to throwobject
     */
    collisionCharactertoThrowObject() {
        this.throwableEnemieObjects.forEach(obj => {
            if (this.character.isCollidingToObject(obj)) {
                this.isColliding = true
                if (this.character.energy > 0) {
                    this.character.hurt = this.isColliding;
                } else {
                    this.character.dead = true;
                }
            }
        });
    }

    /**
     * checks collision from character to collectitem
     */
    checkCollisiontoCollectebleItem() {
        this.collectibleItems.forEach(item => {
            if (this.character.isCollidingToItem(item)) {
                if (item instanceof Manapotion) {
                    this.fillMana(item)
                }
                if (item instanceof Healthpotion) {
                    this.fillHealth(item)
                }
            }
        });
        this.removeCollectItems();
    }

    /**
     * fill statusbar mana
     * @param {class} item 
     */
    fillMana(item) {
        if (this.character.mana < 5) {
            item.collect = true;
            this.character.mana++;
            this.statusBarMana.setManaPercentage(this.character.mana)
        }
    }

    /**
     * fill statusbar health
     * @param {class} item 
     */
    fillHealth(item) {
        if (this.character.energy < 5) {
            item.collect = true;
            this.character.energy++;
            this.statusBarHealth.setHealthPercentage(this.character.energy)
        }
    }

    /**
     * remove item if collect = true
     */
    removeCollectItems() {
        this.collectibleItems = this.collectibleItems.filter(item => item.collect == false);
    }

    /**
     * checks collision from throwobject of character to enemie
     */
    checkCollisionsThrowableObject() {
        let isColliding = false;
        this.throwableObjects.forEach(throwObj => {
            this.level.enemies.forEach(enemy => {
                if (throwObj.isCollidingToObject(enemy)) {
                    isColliding = true;
                    let damage = throwObj.damage
                    if(enemy instanceof Endboss) {
                        this.collisionToEndboss(enemy, isColliding, damage)
                    } else {
                        this.collisionToEnemie(enemy, isColliding, damage);
                    }
                    this.removeThrowableObject();
                }
            })
        });
    }

    /**
     * is colliding, the enemie get hurt and lost energy
     * @param {class} enemy 
     * @param {boolean} isColliding 
     * @param {number} damage 
     */
    collisionToEnemie(enemy, isColliding, damage) {
        if (enemy.energy > 0) {
            enemy.isHurt = isColliding;
            enemy.energy = enemy.energy - damage;
            if (enemy.energy <= 0) {
                setTimeout(() => {
                    this.getRandomPotion(enemy);
                }, 1200);
                setTimeout(() => {
                    this.removeDeadEnemies();
                }, 1300);
            }
        }
    }

    /**
     * Receive a potion dropped by a dead enemie
     * @param {object} enemy 
     */
    getRandomPotion(enemy) {
        const randomNumber = Math.floor(Math.random() * 2) + 1;
        if (randomNumber == 1) {
            this.collectibleItems.push(new Manapotion((enemy.x + (enemy.height / 2)), 350))
        }
        if (randomNumber == 2) {
            this.collectibleItems.push(new Healthpotion((enemy.x + (enemy.height / 2)), 350))
        }
    }

    /**
     * is colliding, the endboss get hurt and lost energy
     * @param {class} enemy 
     * @param {boolean} isColliding 
     * @param {number} damage 
     */
    collisionToEndboss(enemy, isColliding, damage) {
        if (enemy.endbossEnergy > 0) {
            enemy.endbossHurt = isColliding;
            enemy.endbossEnergy = enemy.endbossEnergy - damage;
            this.statusBarHealthEndboss.setEndbossHealthPercentage(enemy.endbossEnergy)
        }
    }

    /**
     * remove all dead enemies
     */
    removeDeadEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy => {
            if (enemy.endbossEnergy !== undefined) {
                return enemy.endbossEnergy > 0;
            } else {
                return enemy.energy > 0;
            }
        });
    }

    /**
     * checks collisions between throwobject and enemie
     */
    checkThrowableObjects() {
        if (this.standardThrowObject) {
            this.standardThrowAttack();
        }
        if (this.specialThrowObject) {
            this.specialThrowAttack()
        }
        this.level.enemies.forEach(enemy => {
            if (enemy instanceof Endboss) {
                this.bossThrowAttack(enemy);
            }
        });
    }

    /**
     * create a standard Throwattack
     */
    standardThrowAttack() {
        if (this.character.otherDirection) {
            this.magicAttack = new ThrowableObjects(this.character.x - 0, this.character.y - 20, this.standardThrowObject, world, 'standardThrowObject');
        } else {
            this.magicAttack = new ThrowableObjects(this.character.x + 0, this.character.y - 20, this.standardThrowObject, world, 'standardThrowObject');
        }
        this.throwableObjects.push(this.magicAttack);
        this.standardThrowObject = false;
    };

    /**
     * create a special Throwattack
     */
    specialThrowAttack() {
        if (this.character.mana < 1) {
            this.statusBarMana.manaAlert = true;
        } else {
            this.character.mana--;
            this.statusBarMana.setManaPercentage(this.character.mana)
            if (this.character.otherDirection) {
                this.magicAttack = new ThrowableObjects(this.character.x - 20, this.character.y, this.specialThrowObject, world, 'specialThrowObject');
            } else {
                this.magicAttack = new ThrowableObjects(this.character.x + 20, this.character.y, this.specialThrowObject, world, 'specialThrowObject');
            }
            this.throwableObjects.push(this.magicAttack);
        }
        this.specialThrowObject = false;
    };

    /**
     * create a Boss Throwattack
     * @param {object} enemy 
     */
    bossThrowAttack(enemy) {
        if (enemy.endbossAttack) {
            enemy.endbossThrowAttack = true;
            enemy.endbossAttack = false;
        }
        if (enemy.endbossThrowAttack) {
            enemy.endbossThrowAttack = false;
            let magicBossAttack = new ThrowableEnemieObjects(enemy.x + -20, enemy.y + 270, true, world, enemy);
            this.throwableEnemieObjects.push(magicBossAttack);
        }
    }

    /**
     * draw all elements at the canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.collectibleItems);
        this.addObjectsToMap(this.throwableEnemieObjects);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarMana);
        if (this.statusBarHealthEndboss) {
            this.addToMap(this.statusBarHealthEndboss);
        };
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * add all Objects to Map
     * @param {object} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * add the Object to map
     * @param {object} movableObject 
     */
    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.turnImage(movableObject);
        }
        movableObject.draw(this.ctx);
        if (movableObject.otherDirection) {
            this.turnImageBack(movableObject);
        }
    }

    /**
     * Rotates image on the X axis
     * @param {object} movableObject 
     */
    turnImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1
    }

    /**
     * Rotates image back on the X axis
     * @param {object} movableObject 
     */
    turnImageBack(movableObject) {
        movableObject.x = movableObject.x * -1
        this.ctx.restore();
    }

    /**
     * remove throwable Object from Character
     */
    removeThrowableObject() {
        this.throwableObjects = [];
    }

    /**
     * remove throwable Object from Boss
     */
    removeEnemieThrowAttack() {
        this.throwableEnemieObjects = [];
    }
}

