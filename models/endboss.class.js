class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    spawnBoss = false;
    bossIsDead = false;
    bossIsHurt;
    bossWalk;
    bossAttack = false;
    animationTimer;
    movementTimer;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ATTACKING = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURTING = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor(x, world) {
        super().loadImage('img/4_enemie_boss_chicken/2_alert/G5.png');
        this.x = x;
        this.world = world;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACKING);
        this.loadImages(this.IMAGES_HURTING);
        this.loadImages(this.IMAGES_DEAD);
    }

    startBoss() {
        this.animate();
        this.checkCharacterPosition();
        this.walkingInPosition();
    }

    animate() {
        this.animationTimer = setInterval(() => {
            if (this.bossIsDead) {
                this.playAnimation(this.IMAGES_DEAD);
                this.bossGotKilled();
                world.gameStarted = false;
                world.playsound();
                this.gameWon();
            } else if (this.bossIsHurt) {
                this.playAnimation(this.IMAGES_HURTING);
            } else if (this.bossAttack) {
                this.playAnimation(this.IMAGES_ATTACKING);
                this.spawnLittleChicken();
            } else {
                this.playAnimation(this.IMAGES_WALKING)
            }
        }, 200)
    }

    gameWon() {
        setTimeout(() => {
            clearInterval(this.animationTimer);
            document.getElementById('gameWon').classList.add('showResult');
            document.getElementById('start-button').innerHTML = `
                <div onclick="world.restartGame()">YOU WON - RE-START</div>
                `
        }, 1000);

    }

    checkCharacterPosition() {
        setInterval(() => {
            if (!this.spawnBoss && world.character) {
                if (world.character >= world.bossFight_x - 20) {
                    this.spawnBoss = true;
                }
            }
        }, 200);
    }

    walkingInPosition() {
        this.movementTimer = setInterval(() => {
            if (!this.spawnBoss) {
                if (this.x > world.bossFight_x + 500) {
                    this.x -= 1;
                } else {
                    this.currentImage = 0;
                    this.bossAttack = true;
                    if (!world.bossHealthbar[0]) {
                        world.bossHealthbar.push(new BossHealthbar(this.x));
                    }
                    clearInterval(this.movementTimer);
                }
            }
        }, 1000 / 60);

    }

    spawnLittleChicken() {
        if (this.currentImage == 6) {
            if (world.character.x > 3000 && this.x < 4100) {
                let jumphigh = (Math.random() * 15);
                world.level.LittleChicken.push(new LittleChicken(this.x, jumphigh));
                world.startLittleChicken();
            }
            setTimeout(() => {
                this.currentImage = 0;
            }, 400);
        }
    }

    gotHit() {
        if (!this.bossIsHurt && this.x == 3800) {
            this.bossIsHurt = true;
            this.bossAttack = false;
            world.bossHealthbar[0].health -= 20;
            world.bossHealthbar[0].setEnemyHealth();
            if (world.bossHealthbar[0].health == 0) {
                this.bossIsDead = true;
                this.currentImage = 0;
            } else {
                setTimeout(() => {
                    this.bossIsHurt = false;
                    this.currentImage = 0;
                    this.bossAttack = true;
                }, 1000);
            }
        }
    }

    bossGotKilled() {
        if (!this.bossIsFinished) {
            this.bossIsFinished = true;
            setTimeout(() => {
                clearInterval(this.animationTimer);
                this.speedY = 6;
                this.applyGravity();
                this.removeBoss();
            }, 1000);
        }
    }

    removeBoss() {
        setTimeout(() => {
            world.bossHealthbar.splice(0, 1);
            let i = world.level.boss.indexOf(this);
            world.level.boss.splice(i, 1);
        }, 2000)
    }

}