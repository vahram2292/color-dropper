"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
function drawImage(canvas) {
    if (canvas.getContext) {
        const context = canvas.getContext('2d');
        const img = new Image();
        img.src = 'source.jpg';
        img.onload = () => _onImageLoad(img, canvas, context);
    }
}
function _onImageLoad(img, canvas, context) {
    let loadedImageWidth = img.width;
    let loadedImageHeight = img.height;
    [canvas.width, canvas.height] = [loadedImageWidth + (2 * constants_1.CIRCLE_WIDTH_HALF), loadedImageHeight + (3.5 * constants_1.CIRCLE_WIDTH_HALF)];
    // get the top left position of the image in order to center the image within the canvas
    let x = (canvas.width + img.width) / 2;
    let y = (canvas.height + img.height) / 2;
    context.drawImage(img, x, y, img.width, img.height);
}
exports.default = drawImage;
//# sourceMappingURL=drawImage.js.map