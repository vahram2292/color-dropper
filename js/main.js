"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drawImage_1 = require("./drawImage");
const updateColorShowBlock_1 = require("./updateColorShowBlock");
const pickColor_1 = require("./pickColor");
const renderPicker_1 = require("./renderPicker");
function init() {
    const { container, text, colorShowBox, pickerButton, copyButton, } = _selectElements();
    const { canvas, circle, hexTextOnHover, } = _createElements();
    const clickListener = (e) => (0, pickColor_1.default)(e, canvas);
    const mouseMoveListener = (e) => (0, renderPicker_1.default)(e, canvas, circle, hexTextOnHover);
    container.style.position = 'relative';
    circle.classList.add('circle');
    container.appendChild(circle);
    container.appendChild(hexTextOnHover);
    container.appendChild(canvas);
    pickerButton.addEventListener('click', () => _startColorPicking(canvas, mouseMoveListener, clickListener));
    copyButton.addEventListener('click', () => {
        // copyButton.setAttribute('tooltip', 'Copied!');
        if (text === null || text === void 0 ? void 0 : text.innerText) {
            navigator.clipboard.writeText(text.innerText);
            copyButton.setAttribute('tooltip', 'Copied!');
            setTimeout(() => {
                copyButton.removeAttribute('tooltip');
            }, 1000);
        }
    });
    _addListenersToCanvas(canvas, mouseMoveListener, clickListener, colorShowBox, text, circle, copyButton, hexTextOnHover, container);
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
    const hexTextOnHover = document.createElement('span');
    hexTextOnHover.style.display = 'inline-block';
    hexTextOnHover.style.border = '1px solid #b2bec3';
    hexTextOnHover.style.borderRadius = '2px';
    hexTextOnHover.style.position = 'absolute';
    hexTextOnHover.style.width = '84px';
    hexTextOnHover.style.textAlign = 'center';
    hexTextOnHover.style.textTransform = 'uppercase';
    hexTextOnHover.style.backgroundColor = '#b2bec3';
    hexTextOnHover.style.opacity = '0';
    return { canvas, circle, hexTextOnHover };
}
function _startColorPicking(canvas, mouseMoveListener, clickListener) {
    canvas.addEventListener('click', clickListener);
    canvas.addEventListener('mousemove', mouseMoveListener);
}
function _stopColorPicking(canvas, mouseMoveListener, clickListener) {
    canvas.removeEventListener('mousemove', mouseMoveListener);
    canvas.removeEventListener('click', clickListener);
}
function _addListenersToCanvas(canvas, mouseMoveListener, clickListener, colorShowBox, text, circle, copyButton, hexTextOnHover, container) {
    canvas.addEventListener('color-selected', () => _stopColorPicking(canvas, mouseMoveListener, clickListener));
    canvas.addEventListener('color-selected', (e) => (0, updateColorShowBlock_1.default)(e, colorShowBox, text, circle, copyButton, hexTextOnHover, container));
}
init();
//# sourceMappingURL=main.js.map