let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let controls_shown = false;
let gameActive = false;


function init() {
    canvas = document.getElementById('canvas');
}

function disableBtn(){
    
 }

function startGame() {
    if(gameActive == false) {
    gameActive = true;
    world = new World(canvas, keyboard);
    world.gameStarted = true;
    world.resumeGame();
    }
}


window.addEventListener('keydown', (e) => {
    if (e.keyCode == 68 && world.gameStarted == true) {
        keyboard.D = true;
    };
    if (e.keyCode == 39 && world.gameStarted == true) {
        keyboard.RIGHT = true;
    };
    if (e.keyCode == 37 && world.gameStarted == true) {
        keyboard.LEFT = true;
    };
    if (e.keyCode == 40 && world.gameStarted == true) {
        keyboard.DOWN = true;
    };
    if (e.keyCode == 38 && world.gameStarted == true) {
        keyboard.UP = true;
    };
    if (e.keyCode == 32 && world.gameStarted == true) {
        keyboard.SPACE = true;
    };
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 68) {
        keyboard.D = false;
    };
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    };
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    };
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    };
    if (e.keyCode == 38) {
        keyboard.UP = false;
    };
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    };
});

function showControls() {
    if (!controls_shown) {
        controls_shown = true;
        document.getElementById('controls-container').classList.add('controls-container');
        document.getElementById('controls-container').innerHTML = `
            <div class="arrow-container">
                <div class="arrow">
                    <img class="arrow-image" src="./img/arrow-21-24.png" style="transform: rotate(180deg);">
                </div>
                <p>MOVE LEFT</p>
            </div>
            <div class="arrow-container">
                <div class="arrow">
                    <img class="arrow-image" src="./img/arrow-21-24.png">
                </div>
                <p>MOVE RIGHT</p>
            </div>
            <div class="arrow-container">
                <div class="arrow">
                    <img class="arrow-image" src="./img/arrow-21-24.png" style="transform: rotate(270deg);">
                </div>
                <p>JUMP</p>
            </div>
            <div class="arrow-container">
                <div class="arrow">
                    <img class="arrow-image" src="./img/myspace-24.png">
            </div>
            <p>THROW BOTTLE</p>
            </div>    
            `;
    } else {
        controls_shown = false;
        document.getElementById('controls-container').classList.remove('controls-container');
        document.getElementById('controls-container').innerHTML = `
        <div class="mobil-buttons-container">
            <div class="mobil-buttons-left">
                <div class="arrow-container">
                    <div id="btn-left" class="arrow">
                        <img class="arrow-image" src="./img/arrow-21-24.png" style="transform: rotate(180deg);">
                    </div>
                </div>
                <div id="btn-right" class="arrow-container">
                    <div class="arrow">
                        <img class="arrow-image" src="./img/arrow-21-24.png">
                    </div>
                </div>
            </div>
            <div class="mobil-buttons-right">
                <div id="btn-up" class="arrow-container">
                    <div class="arrow">
                        <img class="arrow-image" src="./img/arrow-21-24.png" style="transform: rotate(270deg);">
                    </div>
                </div>
                <div class="arrow-container">
                    <div id="button-space" class="arrow">
                        <img class="arrow-image" src="./img/myspace-24.png">
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}