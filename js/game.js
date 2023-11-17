let canvas;
let world;
let titlescreen;
let keyboard = new Keyboard();
let intervalIDs = [];
async function generateWorld() {
    document.getElementById('titelscreen').classList.add('d-none');
    document.getElementById('fullscreen').classList.remove('d-none');
    canvas = document.getElementById('canvas');
    generateNewLevel();
    world = new World(canvas, keyboard);
}

setInterval(() => {
    let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    let screenHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    if (screenWidth > screenHeight) {
        document.getElementById('rotatescreen').classList.add('d-none');
    } else {
        document.getElementById('rotatescreen').classList.remove('d-none');

    }


}, 100);


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

function openFullScreen() {
    let fullScreen = document.getElementById('fullscreen');
    let fullScreenIcon = document.getElementById('get_fullscreen');
    enterFullscreen(fullScreen);
    fullScreenIcon.innerHTML = '<img src="./img/fullscreen.png" onclick="closeFullScreen()">'
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

function closeFullScreen() {
    // let fullScreen = document.getElementById('fullscreen');
    let fullScreenIcon = document.getElementById('get_fullscreen');
    exitFullscreen();
    fullScreenIcon.innerHTML = '<img src="./img/fullscreen.png" onclick="openFullScreen()">'
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIDs.push(id);
}

function stoppGame() {
    intervalIDs.forEach(clearInterval);
}