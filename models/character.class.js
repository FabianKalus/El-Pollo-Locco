class Character extends MovableObject {

    height = 250;
    y = 200;
    speed = 6;
    world;
    walking_sound = new Audio('audio/walking_character.mp3');
    jump_sound = new Audio('audio/jump.mp3');

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ];


    constructor(world) {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.world = world;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
    };

    startCharacter() {
        this.applyGravity();
        this.animate();
        this.characterAnimation();
    };

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.direction = 1;
                this.walking_sound.play();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.direction = -1;
                this.walking_sound.play();
            }
            if (this.world.keyboard.UP && !this.isAboveGround()) {
                this.jump();
                this.jump_sound.play();

            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);
        setInterval(() => {
            if (this.world.keyboard.SPACE) {
                this.throwBottle();
            }
        }, 200);
    };

    characterAnimation() {
        this.animationTimer = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                world.gameStarted = false;
                clearInterval(world.audioTimer);
                world.carton_loop_sound.pause();
                this.gameOver();
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 100);
    };

    jump() {
        this.speedY = 30;
    };

    throwBottle() {
        if (this.world.bottleCounter.counter > 0 && !this.bottleInAir) {
            this.bottleInAir = true;
            let bottle = new ThrowableObject(this.x + 100, this.y + 100, this.direction, this.world);
            this.world.throwableObjects.push(bottle);
            this.world.bottleCounter.counter--;
            console.log(this.bottleInAir)
        }
        setTimeout(() => {
            this.bottleInAir = false;
        }, 1500);
    };

    gameOver() {
        setTimeout(() => {
            clearInterval(this.animationTimer);
            document.getElementById('gameLost').classList.add('showResult');
            document.getElementById('start-button').innerHTML = `
            <div onclick="world.restartGame()">RE-START</div>
            `
        }, 1000);
    };
}