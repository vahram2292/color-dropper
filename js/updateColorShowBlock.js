"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function updateColorShowBlock(event, colorShowBox, text, circle, copyButton, hexTextOnHover, container) {
    const { r, g, b } = event.detail;
    const hexText = (0, utils_1.rgbToHex)(r, g, b);
    text.innerHTML = hexText;
    colorShowBox.style.backgroundColor = hexText;
    circle.style.borderColor = 'transparent';
    copyButton.removeAttribute('disabled');
    hexTextOnHover.style.opacity = '0';
    hexTextOnHover.style.backgroundColor = '#dfe6e9';
    container.setAttribute('tooltip', 'Color picked!');
    setTimeout(() => {
        container.removeAttribute('tooltip');
    }, 1000);
}
exports.default = updateColorShowBlock;
//# sourceMappingURL=updateColorShowBlock.js.map