"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function colorSelected(event, { mainTag, copyBtnText, copyBtnShowBox, copyButton, circle, hexTextOnHover }) {
    const { r, g, b } = event.detail;
    const hexText = (0, utils_1.rgbToHex)(r, g, b);
    copyBtnText.innerHTML = hexText;
    copyBtnShowBox.style.backgroundColor = hexText;
    circle.style.borderColor = 'transparent';
    hexTextOnHover.style.opacity = '0';
    hexTextOnHover.style.backgroundColor = '#dfe6e9';
    copyButton.removeAttribute('disabled');
    mainTag.setAttribute('tooltip', 'Color picked!');
    const mainTagTimeout = (0, utils_1.createTimeout)(() => {
        mainTag.removeAttribute('tooltip');
    });
    window.onbeforeunload = () => {
        mainTagTimeout();
    };
}
exports.default = colorSelected;
//# sourceMappingURL=colorSelected.js.map