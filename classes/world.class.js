class World {
    // startscreen = new Startscreen(canvas)
    character = new FireWizard();
    level = level1;
    statusBarHealth = new StatusbarHealth();
    statusBarMana = new StatusbarMana();
    collectibleItems = [];
    throwableObjects = [];
    throwableEnemieObjects = [];
    magicAttack;
    standardThrowObject = false;
    specialThrowObject = false;
    isColliding = false;
    hasEndbossAttack = false;
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
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setStoppableInterval(() => {
            this.collisionCharactertoEnemie();

            this.checkThrowableObjects();
            this.checkCollisionCollectebleItem();
            if (this.throwableObjects[0]) {
                this.checkCollisionsThrowableObject();
            }
            if (this.throwableEnemieObjects[0]) {
                this.collisionCharactertoThrowObject();
            }
        }, 50);
    }


    //--------------------------------------------------------------------------------------------------//
    //-----------------------------check collision from Enemie to Character-----------------------------//
    //--------------------------------------------------------------------------------------------------//
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


    //--------------------------------------------------------------------------------------------------//
    //------------------------------check collision from Character to Item------------------------------//
    //--------------------------------------------------------------------------------------------------//

    checkCollisionCollectebleItem() {
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


    //--------------------------------------------------------------------------------------------------//
    //----------------------------------------fill Mana Statusbar---------------------------------------//
    //--------------------------------------------------------------------------------------------------//

    fillMana(item) {
        if (this.character.mana < 5) {
            item.collect = true;
            this.character.mana++;
            this.statusBarMana.setManaPercentage(this.character.mana)
        }
    }

    //--------------------------------------------------------------------------------------------------//
    //---------------------------------------fill Health Statusbar--------------------------------------//
    //--------------------------------------------------------------------------------------------------//

    fillHealth(item) {
        if (this.character.energy < 5) {
            item.collect = true;
            this.character.energy++;
            this.statusBarHealth.setHealthPercentage(this.character.energy)
        }
    }


    //--------------------------------------------------------------------------------------------------//
    //---------------------------------------remove collected Items-------------------------------------//
    //--------------------------------------------------------------------------------------------------//

    removeCollectItems() {
        this.collectibleItems = this.collectibleItems.filter(item => item.collect == false);
    }


    //--------------------------------------------------------------------------------------------------//
    //--------------------------check collision from throwable Object to Enemie-------------------------//
    //--------------------------------------------------------------------------------------------------//

    checkCollisionsThrowableObject() {
        let isColliding = false;
        this.throwableObjects.forEach(throwObj => {
            this.level.enemies.forEach(enemy => {
                if (throwObj.isCollidingToObject(enemy)) {
                    isColliding = true;
                    let damage = throwObj.damage
                    this.collisionToEnemie(enemy, isColliding, damage);
                    this.collisionToEndboss(enemy, isColliding, damage)
                    this.removeThrowableObject();
                }
            })
        });
    }


    //--------------------------------------------------------------------------------------------------//
    //-------------------------------------check collision to Enemie------------------------------------//
    //--------------------------------------------------------------------------------------------------//

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

    getRandomPotion(enemy) {
        const randomNumber = Math.floor(Math.random() * 2) + 1;
        if (randomNumber == 1) {
            this.collectibleItems.push(new Manapotion((enemy.x + (enemy.height / 2)), 350))
        }
        if (randomNumber == 2) {
            this.collectibleItems.push(new Healthpotion((enemy.x + (enemy.height / 2)), 350))
        }
    }


    //--------------------------------------------------------------------------------------------------//
    //-------------------------------------check collision to Endboss-----------------------------------//
    //--------------------------------------------------------------------------------------------------//

    collisionToEndboss(enemy, isColliding, damage) {
        if (enemy.endbossEnergy > 0) {
            enemy.endbossHurt = isColliding;
            enemy.endbossEnergy = enemy.endbossEnergy - damage;
        }
    }


    //--------------------------------------------------------------------------------------------------//
    //-----------------------------------------remove dead Enemies--------------------------------------//
    //--------------------------------------------------------------------------------------------------//

    removeDeadEnemies() {
        this.level.enemies = this.level.enemies.filter(enemy => {
            if (enemy.endbossEnergy !== undefined) {
                return enemy.endbossEnergy > 0;
            } else {
                return enemy.energy > 0;
            }
        });
    }



    //--------------------------------------------------------------------------------------------------//
    //--------------------------create throwable Object for Character or Endboss------------------------//
    //--------------------------------------------------------------------------------------------------//

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

    standardThrowAttack() {
        if (this.character.otherDirection) {
            this.magicAttack = new ThrowableObjects(this.character.x - 60, this.character.y, this.standardThrowObject, world, 'standardThrowObject');
        } else {
            this.magicAttack = new ThrowableObjects(this.character.x + 80, this.character.y, this.standardThrowObject, world, 'standardThrowObject');
        }
        this.throwableObjects.push(this.magicAttack);
        this.standardThrowObject = false;
    };

    specialThrowAttack() {
        if (this.character.mana < 1) {
            this.statusBarMana.manaAlert = true;
        } else {
            this.character.mana--;
            this.statusBarMana.setManaPercentage(this.character.mana)
            if (this.character.otherDirection) {
                this.magicAttack = new ThrowableObjects(this.character.x - 60, this.character.y, this.specialThrowObject, world, 'specialThrowObject');
            } else {
                this.magicAttack = new ThrowableObjects(this.character.x + 80, this.character.y, this.specialThrowObject, world, 'specialThrowObject');
            }
            this.throwableObjects.push(this.magicAttack);
        }
        this.specialThrowObject = false;
    };

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


    //--------------------------------------------------------------------------------------------------//
    //---------------------------------------draw Elements at Canvas------------------------------------//
    //--------------------------------------------------------------------------------------------------//

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        // this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.collectibleItems);
        this.addObjectsToMap(this.throwableEnemieObjects);
        this.addObjectsToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarMana);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }



    //--------------------------------------------------------------------------------------------------//
    //----------------------------------------draw Objects at Canvas------------------------------------//
    //--------------------------------------------------------------------------------------------------//

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    //--------------------------------------------------------------------------------------------------//
    //------------------------------------draw MovableObjects at Canvas---------------------------------//
    //--------------------------------------------------------------------------------------------------//

    addToMap(movableObject) {
        if (movableObject.otherDirection) {
            this.turnImage(movableObject);
        }
        movableObject.draw(this.ctx);
        // movableObject.drawFrame(this.ctx);


        if (movableObject.otherDirection) {
            this.turnImageBack(movableObject);
        }
    }


    //--------------------------------------------------------------------------------------------------//
    //----------------------------------------------turn Image------------------------------------------//
    //--------------------------------------------------------------------------------------------------//

    turnImage(movableObject) {
        this.ctx.save();
        this.ctx.translate(movableObject.width, 0);
        this.ctx.scale(-1, 1);
        movableObject.x = movableObject.x * -1
    }


    //--------------------------------------------------------------------------------------------------//
    //-------------------------------------------turn Image back----------------------------------------//
    //--------------------------------------------------------------------------------------------------//

    turnImageBack(movableObject) {
        movableObject.x = movableObject.x * -1
        this.ctx.restore();
    }


    //--------------------------------------------------------------------------------------------------//
    //--------------------------------remove throeable Object from Character----------------------------//
    //--------------------------------------------------------------------------------------------------//

    removeThrowableObject() {
        this.throwableObjects = [];
    }


    //--------------------------------------------------------------------------------------------------//
    //---------------------------------remove throeable Object from Endboss-----------------------------//
    //--------------------------------------------------------------------------------------------------//

    removeEnemieAttackImage() {
        this.throwableEnemieObjects = [];
    }
}

