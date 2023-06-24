"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function drawImage(canvas) {
    if (canvas.getContext) {
        const context = canvas.getContext('2d');
        const img = new Image();
        img.src = './bg.jpg';
        img.onload = () => _onImageLoad(img, canvas, context);
    }
}
function _onImageLoad(img, canvas, context) {
    let loadedImageWidth = img.width;
    let loadedImageHeight = img.height;
    [canvas.width, canvas.height] = [loadedImageWidth + 88, loadedImageHeight + 132];
    // get the scale
    // it is the min of the 2 ratios
    // let scale_factor = Math.min(canvas.width/img.width, canvas.height/img.height);
    // Lets get the new width and height based on the scale factor
    // let newWidth = img.width * scale_factor;
    // let newHeight = img.height * scale_factor;
    // get the top left position of the image
    // in order to center the image within the canvas
    let x = (canvas.width / 2) - (img.width / 2);
    let y = (canvas.height / 2) - (img.height / 2);
    context.drawImage(img, x, y, img.width, img.height);
}
exports.default = drawImage;
//# sourceMappingURL=drawImage.js.map