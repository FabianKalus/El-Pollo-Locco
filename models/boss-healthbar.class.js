class BossHealthbar extends DrawableObject {

    height = 70;
    width = 260;
    x = 680;
    y = -5;
    health = 100;
    world;

    IMAGES_ENEMYHEALTHBAR = [

        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/2_statusbar_endboss/blue.png',
    ]

    constructor(x) {
        super().loadImage('img/7_statusbars/2 _statusbar_endboss/blue.png');
        this.x = x;
        this.loadImages(this.IMAGES_ENEMYHEALTHBAR);
        this.setEnemyHealth();
    }


    calcEnemyHealth() {
        if (this.health == 0) {
            return 0;
        } else if (this.health <= 20) {
            return 1;
        } else if (this.health <= 40) {
            return 2;
        } else if (this.health <= 60) {
            return 3;
        } else if (this.health <= 80) {
            return 4;
        } else if (this.health <= 100) {
            return 5;
        }
    }

    setEnemyHealth() {
        let path = this.IMAGES_ENEMYHEALTHBAR[this.calcEnemyHealth()];
        this.img = this.imageCache[path];
    }
}