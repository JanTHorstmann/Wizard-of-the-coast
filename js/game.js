let canvas;
let world;
let titlescreen;
let keyboard = new Keyboard();
let intervalIDs = [];
let fullScreen = false;
let soundOn = true;
let win = new Audio('audio/you-win.mp3');
let lose = new Audio('audio/you-lose.mp3');

/**
 * generate World
 */
async function generateWorld() {
    soundOn = true;
    document.getElementById('titelscreen').classList.add('d-none');
    document.getElementById('fullscreen').classList.remove('d-none');
    canvas = document.getElementById('canvas');
    generateNewLevel();
    world = new World(canvas, keyboard);
}

/**
 * checks if the widthscreen is wider as the heighscreen
 */
setInterval(() => {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (screenWidth > screenHeight) {
        document.getElementById('rotatescreen').classList.add('d-none');
    } else {
        document.getElementById('rotatescreen').classList.remove('d-none');
    }
}, 100);


/**
 * set keydown event
 */
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.Right = true;
    }
    if (event.keyCode == 37) {
        keyboard.Left = true;
    }
    if (event.keyCode == 38) {
        keyboard.Up = true;
    }
    if (event.keyCode == 40) {
        keyboard.Down = true;
    }
    if (event.keyCode == 87) {
        keyboard.W = true;
    }
    if (event.keyCode == 65) {
        keyboard.A = true;
    }
    if (event.keyCode == 83) {
        keyboard.S = true;
    }
    if (event.keyCode == 68) {
        keyboard.D = true;
    }
})

/**
 * set keyup event
 */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.Right = false;
    }
    if (event.keyCode == 37) {
        keyboard.Left = false;
    }
    if (event.keyCode == 38) {
        keyboard.Up = false;
    }
    if (event.keyCode == 40) {
        keyboard.Down = false;
    }
    if (event.keyCode == 87) {
        keyboard.W = false;
    }
    if (event.keyCode == 65) {
        keyboard.A = false;
    }
    if (event.keyCode == 83) {
        keyboard.S = false;
    }
    if (event.keyCode == 68) {
        keyboard.D = false;
    }
})

/**
 * show game in fullscreen
 */
function openFullScreen() {
    let fullScreen = document.getElementById('fullscreen');
    let canvas = document.getElementById('canvas');
    canvas.style = 'height: 100%'
    canvas.style = 'width: 100%'
    enterFullscreen(fullScreen);
}

/**
 * show the element in Fullscreen
 * @param {element} element 
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * close Fullscreen
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * toggle Button Function
 */
function toggleFullscreen() {
if (fullScreen) {
    fullScreen = false
    exitFullscreen()
} else {
    fullScreen = true;
    openFullScreen();
}
}

/**
 * mute or Play sound
 */
function muteAndPlaySounds() {
    soungImg = document.getElementById('volume');    
    if(soundOn) {
        soundOn = false;
        soungImg.src = 'img/mute.png'
    } else {
        soundOn = true;
        soungImg.src = 'img/volume.png'
    }
}

/**
 * save all Intervalls in array
 * @param {function} fn 
 * @param {number} time 
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
}

/**
 * stopp all game Intervalls
 * @param {string} isWin 
 */
function stoppGame(isWin) {
    world.world_sound.pause();
    if (isWin == 'win') {
        win.play();
    } else {
        lose.play();
    }
    intervalIDs.forEach(clearInterval);
}