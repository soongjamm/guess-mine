const body = document.querySelector('body');

const NEW_HOST = 'newHost';

const fireNotification = (text, color, type) => {
    const notification = document.createElement('div');
    notification.innerHTML = text;
    notification.style.backgroundColor = color;
    notification.className = "notification";
    if (type === NEW_HOST) {
        notification.classList.add(NEW_HOST);
    }
    body.appendChild(notification);
}

export const handleNewUser = ({ nickname }) =>
    fireNotification(`${nickname} has joined !`, "rgb(0, 122, 255)");

export const handleDisconnected = ({ nickname }) =>
    fireNotification(`${nickname} has left !`, "rgb(255, 149, 000)");

export const handleNewHost = ({ nickname }) =>
    fireNotification(`${nickname} has become new Host!`, "rgb(123,123,123)", NEW_HOST);