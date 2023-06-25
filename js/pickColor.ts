import { getImgData, rgb2hsl } from './utils';

import { AllElements } from './interfaces';

function pickColor(event: MouseEvent, { canvas }: AllElements): void {
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
