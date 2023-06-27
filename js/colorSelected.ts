import { createTimeout, rgbToHex } from './utils';

import { AllElements } from './interfaces';

/**
 * Event handler for the 'color-selected' event.
 *
 * @param {CustomEvent} event - The 'color-selected' event.
 * @param {AllElements} elements - The elements involved in the color selection.
 * @returns {void}
 */
function colorSelected(
  event: CustomEvent,
  { mainTag, copyBtnText, copyBtnShowBox, copyButton, circle, hexTextOnHover }: AllElements
): void {
  const { r, g, b } = event.detail;
  const hexText = rgbToHex(r, g, b);

  copyBtnText.innerHTML = hexText;
  copyBtnShowBox.style.backgroundColor = hexText;
  circle.style.borderColor = 'transparent';
  hexTextOnHover.style.opacity = '0';
  hexTextOnHover.style.backgroundColor = '#dfe6e9';
  copyButton.removeAttribute('disabled');
  mainTag.setAttribute('tooltip', 'Color picked!');

  const mainTagTimeout = createTimeout(() => {
    mainTag.removeAttribute('tooltip');
  });

  window.onbeforeunload = (): void => {
    mainTagTimeout();
  };
}

export default colorSelected;
