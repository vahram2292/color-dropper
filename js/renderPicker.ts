import { getImgData, rgbToHex } from './utils';

import { AllElements } from './interfaces';

function renderPicker(
  event: MouseEvent,
  { canvas, circle, hexTextOnHover }: AllElements
): void {
  const { x, y, r, g, b } = getImgData(event, canvas);

  hexTextOnHover.innerText = rgbToHex(r, g, b);
  hexTextOnHover.style.opacity = '1';
  hexTextOnHover.style.top = y - 72 + 'px';
  hexTextOnHover.style.left = x - 42 + 'px';
  circle.style.top = y - 42 + 'px';
  circle.style.left = x - 42 + 'px';
  circle.style.borderColor = `rgb(${r}, ${g}, ${b})`;
}

export default renderPicker;
