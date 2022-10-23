class World {
    carton_loop_sound = new Audio('audio/cartoon_loop.mp3');
    character = new Character(this);
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    bossHealthbar = [];
    level;
    coinCounter = new coinCounter();
    bottleCounter = new bottleCounter();
    throwableObjects = [];
    bossFight_x = 3300;
    gameStarted = false;
    audioTimer;
   

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level = level1;
    }

    addBtnEvents() {
        document.getElementById('btn-left').ontouchstart = (() => {
            if (world.gameStarted = true) {
                keyboard.LEFT = true
            }
        });
        document.getElementById('btn-left').ontouchend = (() => {
            if (world.gameStarted = true) {
                keyboard.LEFT = false
            }
        });
        document.getElementById('btn-right').ontouchstart = (() => {
            if (world.gameStarted = true) {
                keyboard.RIGHT = true
            }
        });
        document.getElementById('btn-right').ontouchend = (() => {
            if (world.gameStarted = true) {
                keyboard.RIGHT = false
            }
        });
        document.getElementById('btn-up').ontouchstart = (() => {
            if (world.gameStarted = true) {
                keyboard.UP = true
            }
        });
        document.getElementById('btn-up').ontouchend = (() => {
            if (world.gameStarted = true) {
                keyboard.UP = false
            }
        });
        document.getElementById('btn-space').ontouchstart = (() => {
            if (world.gameStarted = true) {
                keyboard.SPACE = true
            }
        });
        document.getElementById('btn-space').ontouchend = (() => {
            if (world.gameStarted = true) {
                keyboard.SPACE = false
            }
        })
    }



    restartGame() {
        location.reload();
    }

    resumeGame() {
        this.draw();
        this.setWorld();
        this.run();
        this.startCharacter();
        this.startChicken();
        this.startLittleChicken();
        this.startBoss();
        this.startBottle();
        this.startClouds();
        this.playsound();
        this.addBtnEvents();
    }

    playsound() {
        this.audioTimer = setInterval(() => {
            if (this.gameStarted == true)
                this.carton_loop_sound.play();
        }, 100);
    }

    setWorld() {
        this.character.world = this;
        this.level.coins.forEach((coin) => {
            coin.world = this;
        });
        this.level.bottles.forEach((bottle) => {
            bottle.world = this;
        });

    }

    run() {
        setInterval(() => {
            this.checkCollingsions();
        }, 100);
    }

    checkCollingsions() {
        this.level.chicken.forEach((chicken) => {
            if (this.character.jumpsOnTop(chicken) && this.character.speedY < 0) {
                chicken.chickenIsDead = true;
                chicken.kickedOut();
            } else if (this.character.isColliding(chicken) && !chicken.chickenIsDead && this.gameStarted) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);

            }
        });
        this.level.LittleChicken.forEach((LittleChicken) => {
            if (this.character.jumpsOnTop(LittleChicken) && this.character.speedY < 0) {
                LittleChicken.LittleChickenIsDead = true;
                LittleChicken.kickedOut();
            } else if (this.character.isColliding(LittleChicken) && !LittleChicken.LittleChickenIsDead && this.gameStarted) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
        this.level.coins.forEach((coins) => {
            if (this.character.isColliding(coins)) {
                coins.removeCoin();
                this.coinCounter.counter++;
            }
        });
        this.level.bottles.forEach((bottles) => {
            if (this.character.isColliding(bottles)) {
                bottles.removeBottle();
                this.bottleCounter.counter++;
            }
        });
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.drawArray(this.level.backgroundObjects);
        this.ctx.translate(-this.camera_x, 0);

        this.addToMap(this.statusBar);

        this.addToMap(this.coinCounter);
        this.addToMap(this.bottleCounter);

        this.drawNumber();

        //Space for fixed Objects
        this.ctx.translate(this.camera_x, 0);
        this.drawArray(this.level.clouds);

        this.drawCharacter();
        this.drawArray(this.level.chicken);
        this.drawArray(this.level.LittleChicken);
        this.drawArray(this.level.boss);
        this.drawArray(this.bossHealthbar);
        this.drawArray(this.level.coins);
        this.drawArray(this.level.bottles);
        this.drawBottles();

        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }

    drawArray(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.direction == -1) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.direction == -1) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    drawNumber() {
        this.ctx.font = '25px Rye';
        this.ctx.fillText('x ' + this.bottleCounter.counter, 80, 155);
        this.ctx.fillText('x ' + this.coinCounter.counter, 80, 95);
    }

    drawBottles() {
        this.throwableObjects.forEach(bottle => {

            if (bottle.direction == -1) {
                this.ctx.save();
                this.ctx.translate(0, 0);
                this.ctx.scale(-1, 1);
                bottle.x = bottle.x * -1;
            }
            bottle.draw(this.ctx);
            if (bottle.direction == -1) {
                this.ctx.restore();
                bottle.x = bottle.x * -1;
            }
        })
    }

    drawCharacter() {
        if (this.character.direction == -1) {
            this.ctx.save();
            this.ctx.translate(this.character.width, 0);
            this.ctx.scale(-1, 1);
            this.character.x = this.character.x * -1;
        }
        this.character.draw(this.ctx);
        if (this.character.direction == -1) {
            this.ctx.restore();
            this.character.x = this.character.x * -1;
        }
    }

    startCharacter() {
        this.character.startCharacter();
    }

    startChicken() {
        this.level.chicken.forEach((chicken) => {
            chicken.startChicken();
        })
    }

    startLittleChicken() {
        this.level.LittleChicken.forEach((LittleChicken) => {
            LittleChicken.startLittleChicks();
        })
    }

    startClouds() {
        this.level.clouds.forEach((cloud) => {
            cloud.startClouds();
        })
    }

    startBoss() {
        this.level.boss.forEach((boss) => {
            boss.startBoss();
        })
    }

    startBottle() {
        this.throwableObjects.forEach((bottle) => {
            bottle.startBottle();
        })
    }
}