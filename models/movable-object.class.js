class MovableObject extends DrawableObject {

    speed = 1;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    gravityTimer;
    direction = 1;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration
            }
        }, 1000 / 25);
    };

    isAboveGround() {
        if (this instanceof Character) {
            return this.y < 180;
        }
        if (this instanceof ThrowableObject) {
            return this.y < 390;
        }
        if (this instanceof LittleChicken) {
            return this.y < 390;
        }
    };

    isColliding(object) {
        return this.x + this.width > object.x &&
            this.y + this.height > object.y &&
            this.x < object.x &&
            this.y < object.y + object.height;
    };

    jumpsOnTop(object) {
        return this.y + this.height > object.y &&
            this.y + this.height < object.y + object.height &&
            this.x + this.width > object.x &&
            this.x + this.width < (object.x + object.width + 70);
    };


    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    };

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    };

    isDead() {
        return this.energy == 0;
    };

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    };

    moveRight() {
        this.x += this.speed * this.direction;
    };

    moveLeft() {
        this.x += this.speed * this.direction;
    };

}