function updateColorShowBlock(
  event: CustomEvent,
  colorShowBox: HTMLDivElement,
  text: HTMLSpanElement,
  circle: HTMLDivElement,
  copyButton: HTMLButtonElement,
): void {
  const { r, g, b } = event.detail;
  const hexText = _rgbToHex(r, g, b);

  text.innerHTML = hexText;
  colorShowBox.style.backgroundColor = hexText;
  circle.style.borderColor = 'transparent';
  copyButton.removeAttribute('disabled');
}

function _rgbToHex(r: number, g: number, b: number): string {
  const int2hex = (num) =>
    (Math.round(num) < 16 ? '0' : '') + Math.round(num).toString(16);

  return `#${int2hex(r)}${int2hex(g)}${int2hex(b)}`;
}
export default updateColorShowBlock;
