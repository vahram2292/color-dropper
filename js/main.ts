import drawImage from './drawImage';
import colorSelected from './colorSelected';
import pickColor from './pickColor';
import renderPicker from './renderPicker';
import copyText from './copyText';

import { AllElements } from './interfaces';

// TODO: 1 add image zooming functionality
// TODO: 2 check responsiveness and proper functionality work for mobile
// TODO: 3 may be add general listener
// export const addListener = (element: HTMLElement, eventType: string, listener: (e?: Event) => void): () => void => {
//   element.addEventListener(eventType, listener);
//
//   return (): void => {
//     element.removeEventListener(eventType, listener);
//   }
// }

function init() {
  const allElements: AllElements = {
    ...(_selectElements()),
    ...(_createElements()),
  };
  const {
    container,
    circle,
    canvas,
    hexTextOnHover,
  } = allElements;

  container.appendChild(circle);
  container.appendChild(hexTextOnHover);
  container.appendChild(canvas);

  _setListeners(allElements);

  drawImage(allElements);
}

function _selectElements(): {
  container: HTMLDivElement,
  copyBtnText: HTMLSpanElement,
  copyBtnShowBox: HTMLDivElement,
  copyButton: HTMLButtonElement,
  pickerBtn: HTMLButtonElement,
  pickerBtnGlow: HTMLDivElement,
  mainTag: HTMLElement,
} {
  const container: HTMLDivElement = document.querySelector('.color-picker-wrapper');
  const pickerBtn: HTMLButtonElement = document.querySelector('.btn-picker');
  const pickerBtnGlow: HTMLDivElement = document.querySelector('.btn-picker-glow');
  const copyBtnText: HTMLSpanElement = document.querySelector('.btn-copy-text');
  const copyBtnShowBox: HTMLDivElement = document.querySelector('.btn-copy-color-show-box');
  const copyButton: HTMLButtonElement = document.querySelector('.btn-copy');
  const mainTag: HTMLElement = document.querySelector('main');

  container.style.position = 'relative';

  if (copyBtnText?.innerText) {
    copyButton.disabled = true;
  }

  return { container, copyBtnText, copyBtnShowBox, pickerBtn, pickerBtnGlow, copyButton, mainTag };
}

function _createElements(): {
  canvas: HTMLCanvasElement,
  circle: HTMLDivElement,
  hexTextOnHover: HTMLSpanElement,
} {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const circle: HTMLDivElement = document.createElement('div');
  const hexTextOnHover: HTMLSpanElement = document.createElement('span');

  circle.classList.add('circle');
  hexTextOnHover.classList.add('text');

  return { canvas, circle, hexTextOnHover };
}

function _setListeners(allElements: AllElements): void {
  const { pickerBtn, copyButton, canvas } = allElements;
  const clickListener = (e: MouseEvent) => pickColor(e, allElements);
  const mouseMoveListener = (e: MouseEvent) => renderPicker(e, allElements);

  pickerBtn.addEventListener(
    'click',
    () => _startColorPicking(mouseMoveListener, clickListener, allElements)
  );
  copyButton.addEventListener(
    'click',
    () => copyText(allElements)
  );
  canvas.addEventListener(
    'color-selected',
    (e: CustomEvent) => {
      _stopColorPicking(mouseMoveListener, clickListener, e, allElements);
    }
  );
}

function _startColorPicking(
  mouseMoveListener: (e: MouseEvent) => void,
  clickListener: (e: MouseEvent) => void,
  { canvas, pickerBtnGlow }: AllElements,
): void {
  canvas.addEventListener('click', clickListener);
  canvas.addEventListener('mousemove', mouseMoveListener);

  pickerBtnGlow.classList.add('active');
}

function _stopColorPicking(
  mouseMoveListener: (e: MouseEvent) => void,
  clickListener: (e: MouseEvent) => void,
  customEvent: CustomEvent,
  allElements: AllElements,
): void {
  const { canvas, pickerBtnGlow } = allElements;

  canvas.removeEventListener('mousemove', mouseMoveListener);
  canvas.removeEventListener('click', clickListener);

  pickerBtnGlow.classList.remove('active');

  colorSelected(customEvent, allElements);
}

init();
