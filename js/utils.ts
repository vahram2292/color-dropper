export const rgb2hsl = (r: number, g: number, b: number): [h: number, s: number, l :number] => {
  r /= 255;
  g /= 255;
  b /= 255;

  let max = Math.max(r, g, b);
  let min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

export const getImgData = (event: MouseEvent, canvas: HTMLCanvasElement) => {
  const rect = (event.target as Element).getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const context = canvas.getContext('2d');
  const imgData = context.getImageData(x, y, 1, 1);
  const [r, g, b] = imgData.data;

  return { x, y, r, g, b };
}

export const rgbToHex = (r: number, g: number, b: number): string => {
  const int2hex = (num) =>
    (Math.round(num) < 16 ? '0' : '') + Math.round(num).toString(16);

  return `#${int2hex(r)}${int2hex(g)}${int2hex(b)}`;
}

export const createTimeout = listener => {
  let id = setTimeout(listener, 700)

  return () => {
    clearTimeout(id)
  }
}
