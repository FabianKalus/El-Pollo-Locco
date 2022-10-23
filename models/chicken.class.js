class Chicken extends MovableObject {
    y = 360;
    height = 70;
    width = 100;
    direction = 1;
    chickenMove;
    kickOutChickens = false;
    chickenIsDead = false;


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = ['img/3_enemies_chicken/chicken_normal/2_dead/dead.png'];


    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGE_DEAD);
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        this.speed = 0.5 + Math.random() * 1;
    }

    startChicken() {
        this.animate();
    };

    animate() {
        if (!this.chickenIsDead) {
            this.chickenMove = setInterval(() => { this.x -= this.speed * this.direction; }, 1000 / 60);
        };
        setInterval(() => {
            if (this.chickenIsDead) {
                this.playAnimation(this.IMAGE_DEAD);
                this.height = 100;
                clearInterval(this.chickenMove)

            } else {
                this.playAnimation(this.IMAGES_WALKING);
            };
        }, 150);
    };

    kickedOut() {
        if (!this.kickOutChickens) {
            this.kickOutChickens = true;
            setTimeout(() => {
                this.removeChicken()
            }, 1500);
        };
    };

    removeChicken() {
        let i = world.level.chicken.indexOf(this);
        world.level.chicken.splice(i, 1);
    };
}