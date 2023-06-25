"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const constants_1 = require("./constants");
function renderPicker(event, { canvas, circle, hexTextOnHover }) {
    const { x, y, r, g, b } = (0, utils_1.getImgData)(event, canvas);
    hexTextOnHover.innerText = (0, utils_1.rgbToHex)(r, g, b);
    hexTextOnHover.style.opacity = '1';
    hexTextOnHover.style.top = y - (constants_1.CIRCLE_WIDTH_HALF + 30) + 'px';
    hexTextOnHover.style.left = x - constants_1.CIRCLE_WIDTH_HALF + 'px';
    circle.style.top = y - constants_1.CIRCLE_WIDTH_HALF + 'px';
    circle.style.left = x - constants_1.CIRCLE_WIDTH_HALF + 'px';
    circle.style.borderColor = `rgb(${r}, ${g}, ${b})`;
}
exports.default = renderPicker;
//# sourceMappingURL=renderPicker.js.map