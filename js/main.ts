import drawImage from './drawImage';
import colorSelected from './colorSelected';
import pickColor from './pickColor';
import renderPicker from './renderPicker';
import copyText from './copyText';

import { AllElements } from './interfaces';

/**
 * Initializes the color picker functionality.
 *
 * @returns {void}
 */
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

/**
 * Selects the necessary elements from the DOM.
 *
 * @returns {Object} - An object containing the selected DOM elements.
 * @private
 */
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

/**
 * Creates the necessary elements dynamically.
 *
 * @returns {Object} - An object containing the created DOM elements.
 * @private
 */
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

/**
 * Sets up event listeners for the color picker functionality.
 *
 * @param {AllElements} allElements - An object containing the DOM elements.
 * @returns {void}
 * @private
 */
function _setListeners(allElements: AllElements): void {
  const { pickerBtn, copyButton, canvas } = allElements;
  const clickListener = (e: MouseEvent) => pickColor(e, allElements);
  const mouseMoveListener = (e: MouseEvent) => renderPicker(e, allElements);

  copyButton.addEventListener(
    'click',
    () => copyText(allElements)
  );
  pickerBtn.addEventListener(
    'click',
    () => _startColorPicking(mouseMoveListener, clickListener, allElements)
  );
  canvas.addEventListener(
    'color-selected',
    (e: CustomEvent) => {
      _stopColorPicking(mouseMoveListener, clickListener, e, allElements);
    }
  );
}

/**
 * Starts the color picking process.
 *
 * @param {Function} mouseMoveListener - The mousemove event listener function.
 * @param {Function} clickListener - The click event listener function.
 * @param {AllElements} allElements - An object containing the DOM elements.
 * @returns {void}
 * @private
 */
function _startColorPicking(
  mouseMoveListener: (e: MouseEvent) => void,
  clickListener: (e: MouseEvent) => void,
  { canvas, pickerBtnGlow }: AllElements,
): void {
  canvas.addEventListener('click', clickListener);
  canvas.addEventListener('mousemove', mouseMoveListener);

  pickerBtnGlow.classList.add('active');
}

/**
 * Stops the color picking process.
 *
 * @param {Function} mouseMoveListener - The mousemove event listener function.
 * @param {Function} clickListener - The click event listener function.
 * @param {CustomEvent} customEvent - The color-selected custom event.
 * @param {AllElements} allElements - An object containing the DOM elements.
 * @returns {void}
 * @private
 */
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
