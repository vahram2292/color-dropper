"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drawImage_1 = require("./drawImage");
const updateColorShowBlock_1 = require("./updateColorShowBlock");
const pickColor_1 = require("./pickColor");
const renderPicker_1 = require("./renderPicker");
function init() {
    const { container, text, colorShowBox, pickerButton, copyButton, } = _selectElements();
    const { canvas, circle, } = _createElements();
    const clickListener = (e) => (0, pickColor_1.default)(e, canvas);
    const mouseMoveListener = (e) => (0, renderPicker_1.default)(e, canvas, circle);
    container.style.position = 'relative';
    const [width, height] = [container.offsetWidth, container.offsetHeight];
    [canvas.width, canvas.height] = [width, height];
    circle.classList.add('circle');
    container.appendChild(circle);
    container.appendChild(canvas);
    pickerButton.addEventListener('click', () => _startColorPicking(canvas, mouseMoveListener, clickListener));
    copyButton.addEventListener('click', () => {
        if (text === null || text === void 0 ? void 0 : text.innerText) {
            navigator.clipboard.writeText(text.innerText);
        }
    });
    _addListenersToCanvas(canvas, mouseMoveListener, clickListener, colorShowBox, text, circle, copyButton);
    (0, drawImage_1.default)(canvas);
}
function _selectElements() {
    const container = document.querySelector('#color-picker');
    const text = document.querySelector('#text');
    const colorShowBox = document.querySelector('#colored-show-box');
    const pickerButton = document.querySelector('#picker-button');
    const copyButton = document.querySelector('#show-box-wrapper');
    if (text === null || text === void 0 ? void 0 : text.innerText) {
        copyButton.disabled = true;
    }
    return { container, text, colorShowBox, pickerButton, copyButton };
}
function _createElements() {
    const canvas = document.createElement('canvas');
    const circle = document.createElement('div');
    return { canvas, circle };
}
function _startColorPicking(canvas, mouseMoveListener, clickListener) {
    canvas.addEventListener('click', clickListener);
    canvas.addEventListener('mousemove', mouseMoveListener);
}
function _stopColorPicking(canvas, mouseMoveListener, clickListener) {
    canvas.removeEventListener('mousemove', mouseMoveListener);
    canvas.removeEventListener('click', clickListener);
}
function _addListenersToCanvas(canvas, mouseMoveListener, clickListener, colorShowBox, text, circle, copyButton) {
    canvas.addEventListener('color-selected', () => _stopColorPicking(canvas, mouseMoveListener, clickListener));
    canvas.addEventListener('color-selected', (e) => (0, updateColorShowBlock_1.default)(e, colorShowBox, text, circle, copyButton));
}
init();
//# sourceMappingURL=main.js.map