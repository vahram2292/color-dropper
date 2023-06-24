function drawImage(canvas: HTMLCanvasElement): void {
  if (canvas.getContext) {
    const context = canvas.getContext('2d');
    const img = new Image();

    img.src = './bg.jpg';
    img.onload = () => _onImageLoad(img, canvas, context);
  }
}

function _onImageLoad(
  img: HTMLImageElement,
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D
): void {
  // get the scale
  // it is the min of the 2 ratios
  let scale_factor = Math.min(canvas.width/img.width, canvas.height/img.height);

  // Lets get the new width and height based on the scale factor
  let newWidth = img.width * scale_factor;
  let newHeight = img.height * scale_factor;

  // get the top left position of the image
  // in order to center the image within the canvas
  let x = (canvas.width/2) - (newWidth/2);
  let y = (canvas.height/2) - (newHeight/2);

  context.drawImage(img, x, y, newWidth, newHeight);
}

export default drawImage;
