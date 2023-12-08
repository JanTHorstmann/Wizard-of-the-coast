let level1

/**
 * generate a new random Level
 */
function generateNewLevel(){
enemieThrowObject = false;
const randomNumber = Math.floor(Math.random() * 4) + 1;
if (randomNumber == 1) {
    generateVilla();
};
if (randomNumber == 2) {
    generateGravyard1();
};
if (randomNumber == 3) {
    generateGravyard2();
};
if (randomNumber == 4) {
    generateDarkforest();
};
}

/**
 * generate Villa Background
 */
function generateVilla() {
    level1 = new Level(
        [
            new Lizard(500),
            new Lizard(1000),
            new Lizard(1500),
            new Lizard(2000),
            new Lizard(2500),
            new Lizard(3000),
            new Endboss(),
        ],
        'img/backgrounds/',                 // base path
        'air/villa.png',                    // air
        'layer6/villa.png',                 // layer 6
        'layer5/villa.png',                 // layer 5
        'layer4/villa.png',                 // layer 4
        'layer3/villa.png',                 // layer 3
        'layer2/villa.png',                 // layer 2
        'layer1/villa.png',                 // layer 1
    );
}

/**
 * generate Graveyard1 Background
 */
function generateGravyard1() {
    level1 = new Level(
        [
            new Demon(500),
            new Demon(1000),
            new Demon(1500),
            new Demon(2000),
            new Demon(2500),
            new Demon(3000),
            new Endboss(),
        ],
        'img/backgrounds/',                 // base path
        'air/graveyard1.png',                    // air
        'layer6/graveyard1.png',                 // layer 6
        'layer5/graveyard1.png',                 // layer 5
        'layer4/graveyard1.png',                 // layer 4
        'layer3/graveyard1.png',                 // layer 3
        'layer2/graveyard1.png',                 // layer 2
        'layer1/graveyard1.png',                 // layer 1
    );
}

/**
 * generate Gravyard2 Background
 */
function generateGravyard2() {
    level1 = new Level(
        [
            new Demon(500),
            new Demon(1000),
            new Demon(1500),
            new Demon(2000),
            new Demon(2500),
            new Demon(3000),
            new Endboss(),
        ],
        'img/backgrounds/',                 // base path
        'air/graveyard2.png',                    // air
        'layer6/graveyard2.png',                 // layer 6
        'layer5/graveyard2.png',                 // layer 5
        'layer4/graveyard2.png',                 // layer 4
        'layer3/graveyard2.png',                 // layer 3
        'layer2/graveyard2.png',                 // layer 2
        'layer1/graveyard2.png',                 // layer 1
    );
}

/**
 * generate Darkforest Background
 */
function generateDarkforest() {
    level1 = new Level(
        [
            new Lizard(500),
            new Lizard(1000),
            new Lizard(1500),
            new Lizard(2000),
            new Lizard(2500),
            new Lizard(3000),
            new Endboss(),
        ],
        'img/backgrounds/',                 // base path
        'air/darkforest.png',                    // air
        'layer6/darkforest.png',                 // layer 6
        'layer5/darkforest.png',                 // layer 5
        'layer4/darkforest.png',                 // layer 4
        'layer3/darkforest.png',                 // layer 3
        'layer2/darkforest.png',                 // layer 2
        'layer1/darkforest.png',                 // layer 1
    );
}