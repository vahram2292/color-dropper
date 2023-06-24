import { getImgData } from './utils';

function renderPicker(
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  circle: HTMLDivElement
): void {
  const { x, y, r, g, b } = getImgData(event, canvas);

  circle.style.top = y - 42 + 'px';
  circle.style.left = x - 42 + 'px';
  circle.style.borderColor = `rgb(${r}, ${g}, ${b})`;
}

export default renderPicker;
