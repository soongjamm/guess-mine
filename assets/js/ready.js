import { getSocket } from "./sockets";

const { amIHost } = require("../../src/socketController");

const playBtn = document.getElementById('jsPlayBtn');
const readyBtn = document.getElementById('jsReadyBtn');
const startBtn = document.getElementById('jsStartBtn');

const HOST = 'host';
const CLICKED = 'clicked';
const START_BTN = 'startBtn';

const handleClickBtn = (e) => {
    const btn = e.target;
    if (btn.classList.contains(CLICKED)) {
        btn.classList.remove(CLICKED);
    } else {
        btn.classList.add(CLICKED);
        if (btn.classList.contains(START_BTN)) {
            console.log(getSocket());
            // getSocket().emit(window.events.startClicked, socket);
        }
    }
}

export const handleSetHost = () => {
    playBtn.classList.add(HOST);
}

export const handleRemoveHost = () => {
    playBtn.classList.remove(HOST);
}

if (playBtn) {
    readyBtn.addEventListener('click', handleClickBtn);
    startBtn.addEventListener('click', handleClickBtn);
}