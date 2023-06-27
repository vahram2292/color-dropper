"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drawImage_1 = require("./drawImage");
const colorSelected_1 = require("./colorSelected");
const pickColor_1 = require("./pickColor");
const renderPicker_1 = require("./renderPicker");
const copyText_1 = require("./copyText");
/**
 * Initializes the color picker functionality.
 *
 * @returns {void}
 */
function init() {
    const allElements = Object.assign(Object.assign({}, (_selectElements())), (_createElements()));
    const { container, circle, canvas, hexTextOnHover, } = allElements;
    container.appendChild(circle);
    container.appendChild(hexTextOnHover);
    container.appendChild(canvas);
    _setListeners(allElements);
    (0, drawImage_1.default)(allElements);
}
/**
 * Selects the necessary elements from the DOM.
 *
 * @returns {Object} - An object containing the selected DOM elements.
 * @private
 */
function _selectElements() {
    const container = document.querySelector('.color-picker-wrapper');
    const pickerBtn = document.querySelector('.btn-picker');
    const pickerBtnGlow = document.querySelector('.btn-picker-glow');
    const copyBtnText = document.querySelector('.btn-copy-text');
    const copyBtnShowBox = document.querySelector('.btn-copy-color-show-box');
    const copyButton = document.querySelector('.btn-copy');
    const mainTag = document.querySelector('main');
    container.style.position = 'relative';
    if (copyBtnText === null || copyBtnText === void 0 ? void 0 : copyBtnText.innerText) {
        copyButton.disabled = true;
    }
    return { container, copyBtnText, copyBtnShowBox, pickerBtn, pickerBtnGlow, copyButton, mainTag };
}
/**
 * Creates the necessary elements dynamically.
 *
 * @returns {Object} - An object containing the created DOM elements.
 * @private
 */
function _createElements() {
    const canvas = document.createElement('canvas');
    const circle = document.createElement('div');
    const hexTextOnHover = document.createElement('span');
    circle.classList.add('circle');
    hexTextOnHover.classList.add('text');
    return { canvas, circle, hexTextOnHover };
}
/**
 * Sets up event listeners for the color picker functionality.
 *
 * @param {AllElements} allElements - An object containing the DOM elements.
 * @returns {void}
 * @private
 */
function _setListeners(allElements) {
    const { pickerBtn, copyButton, canvas } = allElements;
    const clickListener = (e) => (0, pickColor_1.default)(e, allElements);
    const mouseMoveListener = (e) => (0, renderPicker_1.default)(e, allElements);
    copyButton.addEventListener('click', () => (0, copyText_1.default)(allElements));
    pickerBtn.addEventListener('click', () => _startColorPicking(mouseMoveListener, clickListener, allElements));
    canvas.addEventListener('color-selected', (e) => {
        _stopColorPicking(mouseMoveListener, clickListener, e, allElements);
    });
}
/**
 * Starts the color picking process.
 *
 * @param {Function} mouseMoveListener - The mousemove event listener function.
 * @param {Function} clickListener - The click event listener function.
 * @param {AllElements} allElements - An object containing the DOM elements.
 * @returns {void}
 * @private
 */
function _startColorPicking(mouseMoveListener, clickListener, { canvas, pickerBtnGlow }) {
    canvas.addEventListener('click', clickListener);
    canvas.addEventListener('mousemove', mouseMoveListener);
    pickerBtnGlow.classList.add('active');
}
/**
 * Stops the color picking process.
 *
 * @param {Function} mouseMoveListener - The mousemove event listener function.
 * @param {Function} clickListener - The click event listener function.
 * @param {CustomEvent} customEvent - The color-selected custom event.
 * @param {AllElements} allElements - An object containing the DOM elements.
 * @returns {void}
 * @private
 */
function _stopColorPicking(mouseMoveListener, clickListener, customEvent, allElements) {
    const { canvas, pickerBtnGlow } = allElements;
    canvas.removeEventListener('mousemove', mouseMoveListener);
    canvas.removeEventListener('click', clickListener);
    pickerBtnGlow.classList.remove('active');
    (0, colorSelected_1.default)(customEvent, allElements);
}
init();
//# sourceMappingURL=main.js.map