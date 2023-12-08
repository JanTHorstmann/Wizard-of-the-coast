class FireWizard extends Character {
    IMAGES_IDLE = [
        'img/fire_wizard/idle/img1.png',
        'img/fire_wizard/idle/img2.png',
        'img/fire_wizard/idle/img3.png',
        'img/fire_wizard/idle/img4.png',
        'img/fire_wizard/idle/img5.png',
        'img/fire_wizard/idle/img6.png',
        'img/fire_wizard/idle/img7.png',
    ];

    IMAGES_WALKING = [
        'img/fire_wizard/run/img1.png',
        'img/fire_wizard/run/img2.png',
        'img/fire_wizard/run/img3.png',
        'img/fire_wizard/run/img4.png',
        'img/fire_wizard/run/img5.png',
        'img/fire_wizard/run/img6.png',
        'img/fire_wizard/run/img7.png',
        'img/fire_wizard/run/img8.png',
    ];

    IMAGES_JUMPING = [
        'img/fire_wizard/jump/img1.png',
        'img/fire_wizard/jump/img2.png',
        'img/fire_wizard/jump/img3.png',
        'img/fire_wizard/jump/img4.png',
        'img/fire_wizard/jump/img5.png',
        'img/fire_wizard/jump/img6.png',
        'img/fire_wizard/jump/img7.png',
        'img/fire_wizard/jump/img8.png',
        'img/fire_wizard/jump/img9.png',
    ];

    IMAGES_STANDARD_ATTACK_GESTE = [
        'img/fire_wizard/fire_ball_geste/img1.png',
        'img/fire_wizard/fire_ball_geste/img2.png',
        'img/fire_wizard/fire_ball_geste/img3.png',
        'img/fire_wizard/fire_ball_geste/img4.png',
        'img/fire_wizard/fire_ball_geste/img5.png',
        'img/fire_wizard/fire_ball_geste/img6.png',
        'img/fire_wizard/fire_ball_geste/img7.png',
        'img/fire_wizard/fire_ball_geste/img8.png',
    ];

    IMAGES_SPECIAL_ATTACK_GESTE = [
        'img/fire_wizard/flame_jet_geste/img1.png',
        'img/fire_wizard/flame_jet_geste/img2.png',
        'img/fire_wizard/flame_jet_geste/img3.png',
        'img/fire_wizard/flame_jet_geste/img4.png',
        'img/fire_wizard/flame_jet_geste/img5.png',
        'img/fire_wizard/flame_jet_geste/img6.png',
        'img/fire_wizard/flame_jet_geste/img7.png',
        'img/fire_wizard/flame_jet_geste/img8.png',
        'img/fire_wizard/flame_jet_geste/img9.png',
        'img/fire_wizard/flame_jet_geste/img10.png',
        'img/fire_wizard/flame_jet_geste/img11.png',
    ];

    IMAGES_HURT = [
        'img/fire_wizard/hurt/img1.png',
        'img/fire_wizard/hurt/img2.png',
        'img/fire_wizard/hurt/img3.png',
    ];

    IMAGES_DEAD = [
        'img/fire_wizard/dead/img1.png',
        'img/fire_wizard/dead/img2.png',
        'img/fire_wizard/dead/img3.png',
        'img/fire_wizard/dead/img4.png',
        'img/fire_wizard/dead/img5.png',
        'img/fire_wizard/dead/img6.png',
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_STANDARD_ATTACK_GESTE);
        this.loadImages(this.IMAGES_SPECIAL_ATTACK_GESTE);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

}