class Level {
    enemies;
    backgroundObjects = [];
    level_end_x = 4200;

    /**
     * build background in a for loop
     * @param {string} basePath
     * @param {string} air 
     * @param {string} sixthLayerImg1 
     * @param {string} fifthLayerImg1 
     * @param {string} fourthLayerImg1 
     * @param {string} thirdLayerImg1 
     * @param {string} secondLayerImg1 
     * @param {string} firstLayerImg1 
     */
    repeatBackgroundImages(basePath, air, sixthLayerImg1, fifthLayerImg1, fourthLayerImg1, thirdLayerImg1, secondLayerImg1, firstLayerImg1) {
        for (let i = 0; i < 4; i++) {
            let x_coordinate = i * 1438;

            this.backgroundObjects.push(
                new BackgroundObject(`${basePath + air}`, x_coordinate),
                new BackgroundObject(`${basePath + sixthLayerImg1}`, x_coordinate),
                new BackgroundObject(`${basePath + fifthLayerImg1}`, x_coordinate),
                new BackgroundObject(`${basePath + fourthLayerImg1}`, x_coordinate),
                new BackgroundObject(`${basePath + thirdLayerImg1}`, x_coordinate),
                new BackgroundObject(`${basePath + secondLayerImg1}`, x_coordinate),
                new BackgroundObject(`${basePath + firstLayerImg1}`, x_coordinate),

                new BackgroundObject(`${basePath + air}`, 719 + x_coordinate),
                new BackgroundObject(`${basePath + sixthLayerImg1}`, 719 + x_coordinate),
                new BackgroundObject(`${basePath + fifthLayerImg1}`, 719 + x_coordinate),
                new BackgroundObject(`${basePath + fourthLayerImg1}`, 719 + x_coordinate),
                new BackgroundObject(`${basePath + thirdLayerImg1}`, 719 + x_coordinate),
                new BackgroundObject(`${basePath + secondLayerImg1}`, 719 + x_coordinate),
                new BackgroundObject(`${basePath + firstLayerImg1}`, 719 + x_coordinate)
            );
        }
    }

    constructor(enemies, basePath, air, sixthLayerImg1, fifthLayerImg1, fourthLayerImg1, thirdLayerImg1, secondLayerImg1, firstLayerImg1) {
        this.enemies = enemies;
        this.repeatBackgroundImages(basePath, air, sixthLayerImg1, fifthLayerImg1, fourthLayerImg1, thirdLayerImg1, secondLayerImg1, firstLayerImg1);
    }
}