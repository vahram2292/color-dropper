import { getImgData, rgb2hsl } from './utils';

function pickColor(event: MouseEvent, canvas: HTMLCanvasElement): void {
  const { r, g, b } = getImgData(event, canvas);
  const [h, s, l] = rgb2hsl(r, g, b);

  canvas.dispatchEvent(
    new CustomEvent('color-selected', {
      bubbles: true,
      detail: { r, g, b, h, s, l },
    })
  );
}
export default pickColor;
