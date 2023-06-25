import drawImage from './drawImage';
import colorSelected from './colorSelected';
import pickColor from './pickColor';
import renderPicker from './renderPicker';
import copyText from './copyText';

import { AllElements } from './interfaces';

// TODO: refactor CSS
// TODO: refactor CodeBase (main.ts, go throw all files)
// TODO: may be add footer
// TODO: may be add general listener

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
    copyButton,
    pickerBtn,
  } = allElements;


  const clickListener = (e: MouseEvent) => pickColor(e, allElements);
  const mouseMoveListener = (e: MouseEvent) => renderPicker(e, allElements);

  container.style.position = 'relative';
  circle.classList.add('circle')

  container.appendChild(circle);
  container.appendChild(hexTextOnHover);
  container.appendChild(canvas);

  pickerBtn.addEventListener('click', () => _startColorPicking(mouseMoveListener, clickListener, allElements))
  copyButton.addEventListener('click', () => copyText(allElements))
  canvas.addEventListener('color-selected', () => _stopColorPicking(mouseMoveListener, clickListener, allElements));
  canvas.addEventListener('color-selected', (e: CustomEvent) => colorSelected(e, allElements));

  drawImage(canvas);
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

  hexTextOnHover.classList.add('text');

  return { canvas, circle, hexTextOnHover };
}

function _startColorPicking(
  mouseMoveListener,
  clickListener,
  { canvas, pickerBtnGlow }: AllElements,
): void {
  canvas.addEventListener('click', clickListener);
  canvas.addEventListener('mousemove', mouseMoveListener);

  pickerBtnGlow.classList.add('active');
}

function _stopColorPicking(
  mouseMoveListener,
  clickListener,
  { canvas, pickerBtnGlow }: AllElements,
): void {
  canvas.removeEventListener('mousemove', mouseMoveListener);
  canvas.removeEventListener('click', clickListener);

  pickerBtnGlow.classList.remove('active');
}

init();
