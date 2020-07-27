import events from './events';
import { chooseWord } from '../assets/js/words';

// setNickname의 매개변수 nickname은 새로 입력받은 닉네임을 말함
// disconnect에서 data로 socket.nickname을 주는 이유는 위에서 변경된 nickname이 socket.nickname에 있기 때문
// disconnect에서 broadcast 이벤트로 disconnected를 쓰는 이유 : disconnect가 disconnect를 또 emit하면 재귀호출이 된다. 그래서 새로운 이벤트를 listening 하도록 해야함

let sockets = [];
let inProgress = false;
let word = null;
let leader = null;
let timeout = null;

const chooseLeader = () => sockets[Math.floor(Math.random() * sockets.length)];


const socketController = (socket, io) => {
    const broadcast = (event, data) => socket.broadcast.emit(event, data);
    const superBroadcast = (event, data) => io.emit(event, data);
    const sendPlayerUpdate = () => superBroadcast(events.playerUpdate, { sockets });
    const startGame = () => {
        if (sockets.length > 1) {
            if (inProgress === false) {
                inProgress = true;
                leader = chooseLeader();
                word = chooseWord();
                superBroadcast(events.gameStarting);
                setTimeout(() => {
                    superBroadcast(events.gameStarted);
                    io.to(leader.id).emit(events.leaderNotif, { word });
                    timeout = setTimeout(() => endGame(), 30000);
                }, 3000);
            }
        }
    }
    const endGame = () => {
        if (timeout !== null) timeout = null;
        inProgress = false;
        superBroadcast(events.gameEnded);
        setTimeout(() => startGame(), 2000)
    }
    const addPoints = (id) => {
        sockets = sockets.map(socket => {
            if (socket.id === id) {
                socket.score += 10;
            }
            return socket;
        });
        sendPlayerUpdate();
        endGame();
    }

    socket.on(events.setNickname, ({ nickname }) => {
        socket.nickname = nickname;
        sockets.push({ id: socket.id, nickname: socket.nickname, score: 0 });
        broadcast(events.newUser, { nickname })
        sendPlayerUpdate();
        if (sockets.length === 2) {
            startGame();
        }
    })
    socket.on(events.disconnect, () => {
        sockets = sockets.filter(aSocket => aSocket.id !== socket.id);
        if (sockets.length === 1) {
            endGame();
        } else if (leader) {
            if (leader.id === socket.id) {
                endGame();
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
};

export default socketController;