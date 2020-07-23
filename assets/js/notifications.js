const body = document.querySelector('body');

const fireNotification = (text, color) => {
    const notification = document.createElement('div');
    notification.innerHTML = text;
    notification.style.backgroundColor = color;
    notification.className = "notification";
    body.appendChild(notification);
}

export const handleNewUser = ({ nickname }) =>
    fireNotification(`${nickname} has joined !`, "rgb(0, 122, 255)");

export const handleDisconnected = ({ nickname }) =>
    fireNotification(`${nickname} has left !`, "rgb(255, 149, 000)");
