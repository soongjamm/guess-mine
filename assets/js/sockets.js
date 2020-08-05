import { handleNewUser, handleDisconnected, handleNewHost } from "./notifications";
import { handleNewMessage } from "./chat";
import { handleBeganPath, handleStrokedPath, handleFilled } from "./paint";
import { handlePlayerUpdate, handleGameStarted, handlePainterNotif, handleGameEnded, handleGameStarting, handleShowTimer } from "./players";
import { handleRemoveHost, handleSetHost } from "./ready";

let socket = null;

export const getSocket = () => socket;

export const initSockets = (aSocket) => {
    const { events } = window;
    socket = aSocket
    socket.on(events.newUser, handleNewUser);
    socket.on(events.disconnected, handleDisconnected);
    socket.on(events.newMsg, handleNewMessage);
    socket.on(events.beganPath, handleBeganPath);
    socket.on(events.strokedPath, handleStrokedPath);
    socket.on(events.filled, handleFilled)
    socket.on(events.playerUpdate, handlePlayerUpdate);
    socket.on(events.gameStarted, handleGameStarted);
    socket.on(events.painterNotif, handlePainterNotif);
    socket.on(events.gameEnded, handleGameEnded);
    socket.on(events.gameStarting, handleGameStarting);
    socket.on(events.showTimer, handleShowTimer);
    socket.on(events.setHost, handleSetHost);
    socket.on(events.newHost, handleNewHost);
}