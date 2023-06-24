import drawImage from './drawImage';
import updateColorShowBlock from './updateColorShowBlock';
import pickColor from './pickColor';
import renderPicker from './renderPicker';

function init() {
  const {
    container,
    text,
    colorShowBox,
    pickerButton,
    copyButton,
  } = _selectElements();
  const {
    canvas,
    circle,
    hexTextOnHover,
  } = _createElements();

  const clickListener = (e: MouseEvent) => pickColor(e, canvas);
  const mouseMoveListener = (e: MouseEvent) => renderPicker(e, canvas, circle, hexTextOnHover);

  container.style.position = 'relative';
  circle.classList.add('circle')

  container.appendChild(circle);
  container.appendChild(hexTextOnHover);
  container.appendChild(canvas);

  pickerButton.addEventListener('click', () => _startColorPicking(canvas, mouseMoveListener, clickListener))
  copyButton.addEventListener('click', () => {
    // copyButton.setAttribute('tooltip', 'Copied!');

    if (text?.innerText) {
      navigator.clipboard.writeText(text.innerText);
      copyButton.setAttribute('tooltip', 'Copied!');

      setTimeout(() => {
        copyButton.removeAttribute('tooltip');
      }, 1000)
    }
  })
  _addListenersToCanvas(canvas, mouseMoveListener, clickListener, colorShowBox, text, circle, copyButton, hexTextOnHover, container);

  drawImage(canvas);
}

function _selectElements(): {
  container: HTMLDivElement,
  text: HTMLSpanElement,
  colorShowBox: HTMLDivElement,
  pickerButton: HTMLButtonElement,
  copyButton: HTMLButtonElement,
} {
  const container: HTMLDivElement = document.querySelector('#color-picker');
  const text: HTMLSpanElement = document.querySelector('#text');
  const colorShowBox: HTMLDivElement = document.querySelector('#colored-show-box');
  const pickerButton: HTMLButtonElement = document.querySelector('#picker-button');
  const copyButton: HTMLButtonElement = document.querySelector('#show-box-wrapper');

  if (text?.innerText) {
    copyButton.disabled = true;
  }

  return { container, text, colorShowBox, pickerButton, copyButton };
}

function _createElements(): { canvas: HTMLCanvasElement, circle: HTMLDivElement, hexTextOnHover: HTMLSpanElement, } {
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  const circle: HTMLDivElement = document.createElement('div');
  const hexTextOnHover: HTMLSpanElement = document.createElement('span');

  hexTextOnHover.style.display = 'inline-block';
  hexTextOnHover.style.border = '1px solid #b2bec3';
  hexTextOnHover.style.borderRadius = '2px';
  hexTextOnHover.style.position = 'absolute';
  hexTextOnHover.style.width = '84px';
  hexTextOnHover.style.textAlign = 'center';
  hexTextOnHover.style.textTransform = 'uppercase';
  hexTextOnHover.style.backgroundColor = '#b2bec3';
  hexTextOnHover.style.opacity = '0';

  return { canvas, circle, hexTextOnHover };
}

function _startColorPicking(
  canvas: HTMLCanvasElement,
  mouseMoveListener,
  clickListener
): void {
  canvas.addEventListener('click', clickListener);
  canvas.addEventListener('mousemove', mouseMoveListener);
}

function _stopColorPicking(
  canvas: HTMLCanvasElement,
  mouseMoveListener,
  clickListener
): void {
  canvas.removeEventListener('mousemove', mouseMoveListener);
  canvas.removeEventListener('click', clickListener);
}

function _addListenersToCanvas(
  canvas: HTMLCanvasElement,
  mouseMoveListener,
  clickListener,
  colorShowBox: HTMLDivElement,
  text: HTMLSpanElement,
  circle: HTMLDivElement,
  copyButton: HTMLButtonElement,
  hexTextOnHover: HTMLSpanElement,
  container: HTMLDivElement,
): void {
  canvas.addEventListener('color-selected', () => _stopColorPicking(canvas, mouseMoveListener, clickListener));
  canvas.addEventListener('color-selected', (e: CustomEvent) => updateColorShowBlock(e, colorShowBox, text, circle, copyButton, hexTextOnHover, container));
}

init();
