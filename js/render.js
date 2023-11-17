let titelScreen

function init() {
    titelScreen = document.getElementById('titelscreen');
    titelScreen.style.backgroundImage = 'url("img/titelscreen.png")';
    titelScreen.innerHTML = renderStartscreen();
    pannelAktivate();
    // generateWorld();
}

function renderStartscreen() {
   return `<button class="start-btn" onclick="generateWorld()">Start Game</button>`;
}

function deadScreen() {
    document.getElementById('titelscreen').classList.remove('d-none');
    document.getElementById('fullscreen').classList.add('d-none');
    titelScreen.style.backgroundImage = 'url("img/diedscreen.png")';
    titelScreen.innerHTML = '<button class="start-btn" onclick="generateWorld()">Neu Start</button>'
}

function pannelAktivate() {
    document.getElementById('btn_special_attack').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.A = true
    });
    document.getElementById('btn_special_attack').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.A = false;
    });
    
    document.getElementById('btn_standard_attack').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.S = true
    });
    document.getElementById('btn_standard_attack').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.S = false;
    });
    
    document.getElementById('btn_move_left').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.Left = true
    });
    document.getElementById('btn_move_left').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.Left = false;
    });
    
    document.getElementById('btn_jump').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.Up = true
    });
    document.getElementById('btn_jump').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.Up = false;
    });
    
    document.getElementById('btn_move_right').addEventListener('touchstart', (e) => {
        e.preventDefault();
        keyboard.Right = true
    });
    document.getElementById('btn_move_right').addEventListener('touchend', (e) => {
        e.preventDefault();
        keyboard.Right = false;
    });
}