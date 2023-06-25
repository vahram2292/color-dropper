import { getImgData, rgbToHex } from './utils';

import { AllElements } from './interfaces';
import { CIRCLE_WIDTH_HALF } from './constants';

function renderPicker(
  event: MouseEvent,
  { canvas, circle, hexTextOnHover }: AllElements
): void {
  const { x, y, r, g, b } = getImgData(event, canvas);

  hexTextOnHover.innerText = rgbToHex(r, g, b);
  hexTextOnHover.style.opacity = '1';
  hexTextOnHover.style.top = y - (CIRCLE_WIDTH_HALF + 30) + 'px';
  hexTextOnHover.style.left = x - CIRCLE_WIDTH_HALF + 'px';
  circle.style.top = y - CIRCLE_WIDTH_HALF + 'px';
  circle.style.left = x - CIRCLE_WIDTH_HALF + 'px';
  circle.style.borderColor = `rgb(${r}, ${g}, ${b})`;
}

export default renderPicker;
