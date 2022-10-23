class LittleChicken extends MovableObject {
    y = 300;
    height = 50;
    width = 50;
    direction = 1;
    LittleChickenMove;
    kickOutLittleChickens = false;
    LittleChickenIsDead = false;
    acceleration = 0.5;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_small/2_dead/dead.png'];


    constructor(x, speedY) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGE_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        this.speedY = speedY;
        this.speed = 4 + Math.random() * 5;
    }

    startLittleChicks() {
        this.applyGravity();
        this.animate();
        this.chickenJump();
    };

    chickenJump() {
        setInterval(() => {
            this.speedY = 10;
        }, Math.random() * 1000 + 1500);
    };

    animate() {
        if (!this.LittleChickenIsDead) {
            this.LittleChickenMove = setInterval(() => { this.x -= this.speed * this.direction; }, 1000 / 60);
        }
        setInterval(() => {
            if (this.LittleChickenIsDead) {
                this.playAnimation(this.IMAGE_DEAD);
                this.height = 100;
                clearInterval(this.LittleChickenMove);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150)
    };

    kickedOut() {
        if (!this.kickOutLittleChickens) {
            this.kickOutLittleChickens = true;

            setTimeout(() => {
                this.removeLittleChicken()
            }, 1500);
        }
    };

    removeLittleChicken() {
        let i = world.level.LittleChicken.indexOf(this);
        world.level.LittleChicken.splice(i, 1);
    };
}