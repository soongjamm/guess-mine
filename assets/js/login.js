import { initSockets } from "./sockets";

const body = document.querySelector('body');
const loginForm = document.getElementById('jsLogin');

const LOGGED_OUT = 'loggedOut';
const LOGGED_IN = 'loggedIn';
const NICKNAME = 'nickname';

const nickname = localStorage.getItem(NICKNAME);

const logIn = (nickname) => {
    // eslint-disable-next-line no-undef
    const socket = io('/');
    socket.emit(window.events.setNickname, { nickname });
    initSockets(socket);
}

const handleFormSubmit = (e) => {
    e.preventDefault();
    const input = loginForm.querySelector('input');
    const { value } = input // input.value와 같다.
    input.value = "";
    localStorage.setItem(NICKNAME, value);
    logIn(value);
}

if (nickname === null) {
    body.className = LOGGED_OUT;
} else {
    body.className = LOGGED_IN;
    logIn(nickname);
}

if (loginForm) {
    loginForm.addEventListener('submit', handleFormSubmit);
}
