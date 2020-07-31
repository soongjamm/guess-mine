import { disableCanvas, hideCanvasControls, enableCanvas, showCanvasControls, resetCansvas } from "./paint";
import { disableChat, enableChat } from "./chat";

const board = document.getElementById('jsPBoard');
const notifs = document.getElementById('jsNotifs');
const timer = document.getElementById('jsTimer');

const addPlayers = (players) => {
    board.innerHTML = '';
    players.forEach(player => {
        const playerElement = document.createElement('span');
        playerElement.innerText = `${player.nickname} : ${player.score} `;
        board.appendChild(playerElement);
    });
}
const setNotifs = (text) => {
    notifs.innerText = '';
    notifs.innerText = text;
}
const setTimer = (t) => {
    let time = parseInt(t) - 0;
    timer.innerText = time;
}

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);
export const handleGameStarted = () => {
    setNotifs('');
    disableCanvas();
    hideCanvasControls();
    enableChat();
}
export const handleLeaderNotif = ({ word }) => {
    enableCanvas();
    showCanvasControls();
    setNotifs(`You are the leader. paint : ${word}`);
    disableChat();
}
export const handleGameEnded = () => {
    disableCanvas();
    hideCanvasControls();
    setNotifs('Game ended.');
    resetCansvas();
}

export const handleGameStarting = () => {
    hideCanvasControls();
    setNotifs('Game will start soon.');
}

export const handleShowTimer = (time) => {
    setTimer(time);
}