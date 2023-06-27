"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTimeout = exports.rgbToHex = exports.getRGBPositionData = exports.rgb2hsl = void 0;
/**
 * Converts an RGB color value to its corresponding HSL representation.
 *
 * @param {number} r - The red color value (0-255).
 * @param {number} g - The green color value (0-255).
 * @param {number} b - The blue color value (0-255).
 * @returns {number[]} - The HSL representation of the input color as an array [h, s, l].
 */
const rgb2hsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0; // achromatic
    }
    else {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, l];
};
exports.rgb2hsl = rgb2hsl;
/**
 * Retrieves the RGB color values of a pixel from a canvas based on the coordinates of a mouse event.
 *
 * @param {MouseEvent} event - The mouse event.
 * @param {HTMLCanvasElement} canvas - The canvas element.
 * @returns {Object} - The coordinates and RGB color values of the pixel as an object { x, y, r, g, b }.
 */
const getRGBPositionData = (event, canvas) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const context = canvas.getContext('2d');
    const imgData = context.getImageData(x, y, 1, 1);
    const [r, g, b] = imgData.data;
    return { x, y, r, g, b };
};
exports.getRGBPositionData = getRGBPositionData;
/**
 * Converts RGB color values to a hexadecimal color representation.
 *
 * @param {number} r - The red color value (0-255).
 * @param {number} g - The green color value (0-255).
 * @param {number} b - The blue color value (0-255).
 * @returns {string} - The hexadecimal color representation.
 */
const rgbToHex = (r, g, b) => {
    const int2hex = (num) => (Math.round(num) < 16 ? '0' : '') + Math.round(num).toString(16);
    return `#${int2hex(r)}${int2hex(g)}${int2hex(b)}`;
};
exports.rgbToHex = rgbToHex;
/**
 * Creates a timeout that executes a callback function after a specified delay.
 *
 * @param {Function} listener - The callback function to be executed.
 * @returns {Function} - A function that can be called to cancel the timeout.
 */
const createTimeout = (listener) => {
    let id = setTimeout(listener, 700);
    return () => {
        clearTimeout(id);
    };
};
exports.createTimeout = createTimeout;
//# sourceMappingURL=utils.js.map