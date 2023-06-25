"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drawImage_1 = require("./drawImage");
const colorSelected_1 = require("./colorSelected");
const pickColor_1 = require("./pickColor");
const renderPicker_1 = require("./renderPicker");
const copyText_1 = require("./copyText");
function init() {
    const allElements = Object.assign(Object.assign({}, (_selectElements())), (_createElements()));
    const { container, circle, canvas, hexTextOnHover, copyButton, pickerBtn, } = allElements;
    const clickListener = (e) => (0, pickColor_1.default)(e, allElements);
    const mouseMoveListener = (e) => (0, renderPicker_1.default)(e, allElements);
    container.style.position = 'relative';
    circle.classList.add('circle');
    container.appendChild(circle);
    container.appendChild(hexTextOnHover);
    container.appendChild(canvas);
    pickerBtn.addEventListener('click', () => _startColorPicking(mouseMoveListener, clickListener, allElements));
    copyButton.addEventListener('click', () => (0, copyText_1.default)(allElements));
    canvas.addEventListener('color-selected', () => _stopColorPicking(mouseMoveListener, clickListener, allElements));
    canvas.addEventListener('color-selected', (e) => (0, colorSelected_1.default)(e, allElements));
    (0, drawImage_1.default)(canvas);
}
function _selectElements() {
    const container = document.querySelector('.color-picker-wrapper');
    const pickerBtn = document.querySelector('.btn-picker');
    const pickerBtnGlow = document.querySelector('.btn-picker-glow');
    const copyBtnText = document.querySelector('.btn-copy-text');
    const copyBtnShowBox = document.querySelector('.btn-copy-color-show-box');
    const copyButton = document.querySelector('.btn-copy');
    const mainTag = document.querySelector('main');
    if (copyBtnText === null || copyBtnText === void 0 ? void 0 : copyBtnText.innerText) {
        copyButton.disabled = true;
    }
    return { container, copyBtnText, copyBtnShowBox, pickerBtn, pickerBtnGlow, copyButton, mainTag };
}
function _createElements() {
    const canvas = document.createElement('canvas');
    const circle = document.createElement('div');
    const hexTextOnHover = document.createElement('span');
    hexTextOnHover.classList.add('text');
    return { canvas, circle, hexTextOnHover };
}
function _startColorPicking(mouseMoveListener, clickListener, { canvas, pickerBtnGlow }) {
    canvas.addEventListener('click', clickListener);
    canvas.addEventListener('mousemove', mouseMoveListener);
    pickerBtnGlow.classList.add('active');
}
function _stopColorPicking(mouseMoveListener, clickListener, { canvas, pickerBtnGlow }) {
    canvas.removeEventListener('mousemove', mouseMoveListener);
    canvas.removeEventListener('click', clickListener);
    pickerBtnGlow.classList.remove('active');
}
init();
//# sourceMappingURL=main.js.map