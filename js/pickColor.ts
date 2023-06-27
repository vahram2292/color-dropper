import { getRGBPositionData, rgb2hsl } from './utils';

import { AllElements } from './interfaces';

/**
 * Picks a color from a canvas based on the mouse event and dispatches a 'color-selected' event with the color information.
 *
 * @param {MouseEvent} event - The mouse event.
 * @param {AllElements} elements - The element references.
 * @returns {void}
 */
function pickColor(event: MouseEvent, { canvas }: AllElements): void {
  const { r, g, b } = getRGBPositionData(event, canvas);
  const [h, s, l] = rgb2hsl(r, g, b);

  canvas.dispatchEvent(
    new CustomEvent('color-selected', {
      bubbles: true,
      detail: { r, g, b, h, s, l },
    })
  );
}
export default pickColor;
