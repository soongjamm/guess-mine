import { getSocket } from "./sockets";

const canvas = document.getElementById("jsCanvas");
const controls = document.getElementById("jsControls");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

const beginPath = (x, y) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
};

// currentColor를 저장했다가 다시 사용하는 이유는 
// 다른 사람이 그림을 그렸을 때 그 사람이 지정한 색으로 내 화면에도 칠해주고 나면
// 내가 내 그림에 그릴 때는 내가 기존에 선택했던 색상을 유지해야 하기 때문
// 넘겨받는 값이 null이 아니라, 기본값이 null
const strokePath = (x, y, color = null) => {
    let currentColor = ctx.strokeStyle;
    if (color !== null) {
        ctx.strokeStyle = color;
    } else if (color === null && ctx.strokeStyle === null) {
        console.log('color===null')
        ctx.strokeStyle = INITIAL_COLOR;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.strokeStyle = currentColor;
    console.log(ctx.strokeStyle, x, y);
};

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        beginPath(x, y);
        getSocket().emit(window.events.beginPath, { x, y });
    } else {
        strokePath(x, y, ctx.strokeStyle);
        getSocket().emit(window.events.strokePath, { x, y, color: ctx.strokeStyle });
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

// handleFill은 내 화면을 칠한다.
// handleFill()을 인자없이 호출했다면 기존에 선택된 색으로 칠하는 것뿐.
function handleFill(color = null) {
    let currentColor = ctx.fillStyle;
    if (color !== null) {
        ctx.fillStyle = color;
    }
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.strokeStyle = currentColor;
}

// 다른 사용자들 화면을 칠한다.
function handleCanvasClick() {
    if (filling) {
        handleFill();
        getSocket().emit(window.events.fill, { color: ctx.fillStyle });
    }
}

function handleCM(event) {
    event.preventDefault();
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", handleColorClick)
);

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

export const handleBeganPath = ({ x, y }) => beginPath(x, y);
export const handleStrokedPath = ({ x, y, color }) => strokePath(x, y, color);
export const handleFilled = ({ color }) => handleFill(color);
export const disableCanvas = () => {
    canvas.removeEventListener("mousemove", onMouseMove);
    canvas.removeEventListener("mousedown", startPainting);
    canvas.removeEventListener("mouseup", stopPainting);
    canvas.removeEventListener("mouseleave", stopPainting);
    canvas.removeEventListener("click", handleCanvasClick);
}

export const enableCanvas = () => {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

export const hideCanvasControls = () => {
    controls.style.display = 'none';
}

export const showCanvasControls = () => {
    controls.style.display = 'flex';
}

export const resetCansvas = () => {
    handleFill('#fff');
}

if (canvas) {
    canvas.addEventListener("contextmenu", handleCM);
}