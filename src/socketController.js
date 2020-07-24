import events from './events';

// setNickname의 매개변수 nickname은 새로 입력받은 닉네임을 말함
// disconnect에서 data로 socket.nickname을 주는 이유는 위에서 변경된 nickname이 socket.nickname에 있기 때문
// disconnect에서 broadcast 이벤트로 disconnected를 쓰는 이유 : disconnect가 disconnect를 또 emit하면 재귀호출이 된다. 그래서 새로운 이벤트를 listening 하도록 해야함

const socketController = (socket) => {
    const broadcast = (event, data) => socket.broadcast.emit(event, data);

    socket.on(events.setNickname, ({ nickname }) => {
        socket.nickname = nickname;
        broadcast(events.newUser, { nickname })
    })
    socket.on(events.disconnect, () => {
        broadcast(events.disconnected, { nickname: socket.nickname });
    })
    socket.on(events.sendMsg, ({ message }) =>
        broadcast(events.newMsg, { message, nickname: socket.nickname })
    );

    socket.on(events.beginPath, ({ x, y }) =>
        broadcast(events.beganPath, { x, y })
    );

    socket.on(events.strokePath, ({ x, y, color }) => {
        broadcast(events.strokedPath, { x, y, color });
        console.log(x, y);
    });

    socket.on(events.fill, ({ color }) => {
        broadcast(events.filled, { color });
    })
};

export default socketController;