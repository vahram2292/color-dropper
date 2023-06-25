import { createTimeout, rgbToHex } from './utils';

import { AllElements } from './interfaces';

function colorSelected(
  event: CustomEvent,
  { mainTag, copyBtnText, copyBtnShowBox, copyButton, circle, hexTextOnHover }: AllElements
): void {
  const { r, g, b } = event.detail;
  const hexText = rgbToHex(r, g, b);

  copyBtnText.innerHTML = hexText;
  copyBtnShowBox.style.backgroundColor = hexText;
  circle.style.borderColor = 'transparent';
  copyButton.removeAttribute('disabled');
  hexTextOnHover.style.opacity = '0';
  hexTextOnHover.style.backgroundColor = '#dfe6e9';

  mainTag.setAttribute('tooltip', 'Color picked!');

  const mainTagTimeout = createTimeout(() => {
    mainTag.removeAttribute('tooltip');
  });

  window.onbeforeunload = (): void => {
    mainTagTimeout();
  };
}

export default colorSelected;
