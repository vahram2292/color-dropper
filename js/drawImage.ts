import { CIRCLE_WIDTH_HALF } from './constants';
import { AllElements } from './interfaces';

function drawImage({ canvas }: AllElements): void {
  if (canvas.getContext) {
    const context = canvas.getContext('2d');
    const img = new Image();

    img.src = 'source.jpg';
    img.onload = () => _onImageLoad(img, canvas, context);
  }
}

function _onImageLoad(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
): void {

  let loadedImageWidth = img.width;
  let loadedImageHeight = img.height;

  [canvas.width, canvas.height] = [loadedImageWidth + (2 * CIRCLE_WIDTH_HALF), loadedImageHeight + (3 * CIRCLE_WIDTH_HALF)];

  // get the top left position of the image in order to center the image within the canvas
  let x = (canvas.width/2) - (img.width/2);
  let y = (canvas.height/2) - (img.height/2);

  context.drawImage(img, x, y, img.width, img.height);
}

export default drawImage;
