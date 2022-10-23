class coinCounter extends DrawableObject {

    counter = 0;

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = -10;
        this.y = 20;
        this.width = 130;
        this.height = 130;
    }

}