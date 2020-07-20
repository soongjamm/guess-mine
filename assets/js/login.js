const body = document.querySelector('body');
const loginForm = document.getElementById('jsLogin');

const LOGGED_OUT = 'loggedOut';
const LOGGED_IN = 'loggedIn';
const NICKNAME = 'nickname';

const nickname = localStorage.getItem(NICKNAME);

const logIn = (nickname) => {
    events.socket = io('/');
    events.socket.emit(window.events.setNickname, { nickname });
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
