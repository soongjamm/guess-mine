import events from './events';
import { chooseWord } from '../assets/js/words';

// setNickname의 매개변수 nickname은 새로 입력받은 닉네임을 말함
// disconnect에서 data로 socket.nickname을 주는 이유는 위에서 변경된 nickname이 socket.nickname에 있기 때문
// disconnect에서 broadcast 이벤트로 disconnected를 쓰는 이유 : disconnect가 disconnect를 또 emit하면 재귀호출이 된다. 그래서 새로운 이벤트를 listening 하도록 해야함

let sockets = [];
let inProgress = false;
let word = null;
let painter = null;
let timeout = null;
let interval = null;
const TIMEOUT_MSEC = 10000;
let remain_time = null;

let host = null;

const choosePainter = () => sockets[Math.floor(Math.random() * sockets.length)];
const randomHost = () => sockets[Math.floor(Math.random(sockets.length))];

const socketController = (socket, io) => {
    const broadcast = (event, data) => socket.broadcast.emit(event, data);
    const superBroadcast = (event, data) => io.emit(event, data);
    const notifyHost = () => {
        io.to(host.id).emit(events.setHost);
        const nickname = host.nickname;
        broadcast(events.newHost, { nickname });
        console.log(host, "새 호스트정보")
    }
    const sendPlayerUpdate = () => superBroadcast(events.playerUpdate, { sockets });
    const setIntervalImmedi = (func, msec) => {
        func();
        return setInterval(func, msec);
    };
    const clearGame = () => {
        superBroadcast(events.showTimer, 0);
        clearTimeout(timeout);
        timeout = null;
        clearInterval(interval);
        interval = null;
    }
    const setTimer = () => {
        superBroadcast(events.showTimer, remain_time);
        remain_time -= 1;
    };
    const endGame = () => {
        if (timeout !== null || interval !== null) {
            clearGame();
        }
        inProgress = false;
        painter = null;
        superBroadcast(events.gameEnded);
        if (host === null) {
            setHost(painter);
        }
        console.log(host.nickname);
        superBroadcast(events.notifHost, host);
    };
    const addPoints = (id) => {
        sockets = sockets.map(socket => {
            if (socket.id === id) {
                socket.score += 10;
                setHost(socket);
            }
            return socket;
        });
        sendPlayerUpdate();
        endGame();
    };
    const initTimer = () => {
        remain_time = TIMEOUT_MSEC / 1000;
    }
    const startGame = () => {
        if (sockets.length > 1) {
            if (inProgress === false && timeout === null && interval === null) {
                inProgress = true;
                painter = choosePainter();
                word = chooseWord();
                superBroadcast(events.gameStarting);
                setTimeout(() => {
                    superBroadcast(events.gameStarted);
                    io.to(painter.id).emit(events.painterNotif, { word });
                    superBroadcast(events.removeHost);
                    io.to(host.id).emit(events.setHost);
                    initTimer();
                    emptyHost();
                    interval = setIntervalImmedi(setTimer, 1000);
                    timeout = setTimeout(() => endGame(), TIMEOUT_MSEC);
                }, 3000);
            }
        }
    }
    const setHost = (socket) => {
        host = socket;
        notifyHost();
    }
    const emptyHost = () => {
        host = null;
    }
    const checkReady = () => {
        // sockets.
    }

    // ///////////////// ///
    // --- socket.on --- //
    // //////////////// ///

    socket.on(events.setNickname, ({ nickname }) => {
        socket.nickname = nickname;
        sockets.push({ id: socket.id, nickname: socket.nickname, score: 0 });
        broadcast(events.newUser, { nickname })
        sendPlayerUpdate();
        if (sockets.length === 2) {
            // startGame();
        } else if (sockets.length === 1) {
            setHost(sockets[0]);
        }
    })
    socket.on(events.disconnect, () => {
        sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
        if (sockets.length === 1) {
            if (inProgress) endGame();
            if (host.id !== sockets[0].id) {
                setHost(sockets[0]);
            }
        } else if (painter) {
            if (painter.id === socket.id) {
                endGame();
            }
        } else if (host) {
            if (host.id === socket.id) {
                host = randomHost();
            }
        }
        broadcast(events.disconnected, { nickname: socket.nickname });
        sendPlayerUpdate();
    });

    socket.on(events.sendMsg, ({ message }) => {
        broadcast(events.newMsg, { message, nickname: socket.nickname });
        if (message === word) {
            superBroadcast(events.newMsg, {
                message: `Winner is ${socket.nickname}, The word was '${word}'`,
                nickname: 'Bot'
            })
            addPoints(socket.id);
        }
    });

    socket.on(events.beginPath, ({ x, y }) => {
        broadcast(events.beganPath, { x, y })

    });

    socket.on(events.strokePath, ({ x, y, color }) => {
        broadcast(events.strokedPath, { x, y, color });
        // console.log(x, y);
    });

    socket.on(events.fill, ({ color }) => {
        broadcast(events.filled, { color });
    })

    socket.on(events.startClicked, ({ socket }) => {
        checkReady();
        // console.log(socket);
    })
};

setInterval(() => console.log(sockets), 5000)

export default socketController;