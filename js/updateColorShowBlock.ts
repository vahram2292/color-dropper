import { rgbToHex } from './utils';

function updateColorShowBlock(
  event: CustomEvent,
  colorShowBox: HTMLDivElement,
  text: HTMLSpanElement,
  circle: HTMLDivElement,
  copyButton: HTMLButtonElement,
  hexTextOnHover: HTMLSpanElement,
  container: HTMLDivElement,
): void {
  const { r, g, b } = event.detail;
  const hexText = rgbToHex(r, g, b);

  text.innerHTML = hexText;
  colorShowBox.style.backgroundColor = hexText;
  circle.style.borderColor = 'transparent';
  copyButton.removeAttribute('disabled');
  hexTextOnHover.style.opacity = '0';
  hexTextOnHover.style.backgroundColor = '#dfe6e9';

  container.setAttribute('tooltip', 'Color picked!');

  setTimeout(() => {
    container.removeAttribute('tooltip');
  }, 1000)
}

export default updateColorShowBlock;
