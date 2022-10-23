class ThrowableObject extends MovableObject {

    splashTimer;
    bottleThrown = true;
    objectHit = false;
    stopSplash = false;
    broken_bottle_sound = new Audio('audio/bottle.mp3');

    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png', 'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png', 'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png', 'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png', 'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png', 'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png', 'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y, direction, world) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE);
        this.loadImages(this.IMAGES_SPLASH);
        this.world = world;
        this.x = x;
        this.y = y;
        this.direction = direction;
        this.height = 60;
        this.width = 50;
        this.currentImage = 1;
        this.speedY = 14;
        this.applyGravity();
        this.flyingBottle();
        this.bottleAnimation();
    };

    startBottle() {
        this.applyGravity();
        this.flyingBottle();
        this.bottleAnimation();
    };

    flyingBottle() {
        this.movementTimer = setInterval(() => {
            this.x += 11 * this.direction;
            if (!this.isAboveGround() || this.objectHit) {
                if (this.direction == 1) {
                    this.x -= 11;
                }
                if (this.direction == -1) {
                    this.x += 11;
                }
            };
        }, 1000 / 60);
    };

    bottleAnimation() {
        setInterval(() => {
            if (this.y < 390) {
                this.playAnimation(this.IMAGES_BOTTLE);
            } else if (!this.y < 390) {
                this.playAnimation(this.IMAGES_SPLASH);
                this.stopSplash = true;
            };
        }, 1000 / 40);
        this.splashTimer = setInterval(() => {
            this.stopSplashAnimation();
            this.checkBottleCollisionWithChicken();
            this.checkBottleCollisionWithBoss();
            this.checkBottleCollisionWithLittleChicken()
        }, 1000 / 60);
    };

    removeBottle() {
        let i = world.throwableObjects.indexOf(this);
        world.throwableObjects.splice(i, 1);
    };

    stopSplashAnimation() {
        if (this.stopSplash) {
            this.stopSplash = false;
            this.currentImage = 0;
            clearInterval(this.splashTimer);
            setTimeout(() => {
                this.broken_bottle_sound.pause();
            }, 1000);
            setTimeout(() => {
                this.objectHit = false;
                this.removeBottle();
            }, 500);
        };
    };

    checkBottleCollisionWithChicken() {
        world.level.chicken.forEach(chicken => {
            if (this.isColliding(chicken) && !chicken.chickenIsDead) {
                this.objectHit = true;
                chicken.chickenIsDead = true;
                chicken.kickedOut();
                this.broken_bottle_sound.play();
            };
        });
    };

    checkBottleCollisionWithLittleChicken() {
        world.level.LittleChicken.forEach(LittleChicken => {
            if (this.isColliding(LittleChicken) && !LittleChicken.LittleChickenIsDead) {
                this.objectHit = true;
                LittleChicken.LittleChickenIsDead = true;
                LittleChicken.kickedOut();
                this.broken_bottle_sound.play();
            };
        });
    };

    checkBottleCollisionWithBoss() {
        world.level.boss.forEach(boss => {
            if (this.isColliding(boss)) {
                this.objectHit = true;
                boss.gotHit();
                this.broken_bottle_sound.play();
            };
        });
    };
}