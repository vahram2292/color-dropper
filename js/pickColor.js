"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
/**
 * Picks a color from a canvas based on the mouse event and dispatches a 'color-selected' event with the color information.
 *
 * @param {MouseEvent} event - The mouse event.
 * @param {AllElements} elements - The element references.
 * @returns {void}
 */
function pickColor(event, { canvas }) {
    const { r, g, b } = (0, utils_1.getRGBPositionData)(event, canvas);
    const [h, s, l] = (0, utils_1.rgb2hsl)(r, g, b);
    canvas.dispatchEvent(new CustomEvent('color-selected', {
        bubbles: true,
        detail: { r, g, b, h, s, l },
    }));
}
exports.default = pickColor;
//# sourceMappingURL=pickColor.js.map