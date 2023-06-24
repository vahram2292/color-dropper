"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function updateColorShowBlock(event, colorShowBox, text, circle, copyButton) {
    const { r, g, b } = event.detail;
    const hexText = _rgbToHex(r, g, b);
    text.innerHTML = hexText;
    colorShowBox.style.backgroundColor = hexText;
    circle.style.borderColor = 'transparent';
    copyButton.removeAttribute('disabled');
}
function _rgbToHex(r, g, b) {
    const int2hex = (num) => (Math.round(num) < 16 ? '0' : '') + Math.round(num).toString(16);
    return `#${int2hex(r)}${int2hex(g)}${int2hex(b)}`;
}
exports.default = updateColorShowBlock;
//# sourceMappingURL=updateColorShowBlock.js.map