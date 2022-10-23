class Level {
    chicken;
    LittleChicken;
    boss;
    clouds;
    backgroundObjects;
    level_end_x = 3550;
    coins;
    bottles;

    constructor(chicken, LittleChicken, boss, clouds, backgroundObjects, coins, bottles) {
        this.chicken = chicken;
        this.LittleChicken = LittleChicken;
        this.boss = boss;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}