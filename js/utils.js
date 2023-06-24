"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rgbToHex = exports.getImgData = exports.rgb2hsl = void 0;
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
const getImgData = (event, canvas) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const context = canvas.getContext('2d');
    const imgData = context.getImageData(x, y, 1, 1);
    const [r, g, b] = imgData.data;
    return { x, y, r, g, b };
};
exports.getImgData = getImgData;
const rgbToHex = (r, g, b) => {
    const int2hex = (num) => (Math.round(num) < 16 ? '0' : '') + Math.round(num).toString(16);
    return `#${int2hex(r)}${int2hex(g)}${int2hex(b)}`;
};
exports.rgbToHex = rgbToHex;
//# sourceMappingURL=utils.js.map