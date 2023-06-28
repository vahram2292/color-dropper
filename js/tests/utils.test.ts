/**
 * @jest-environment jsdom
 */

import { rgb2hsl, getRGBPositionData, rgbToHex, createTimeout } from '../utils';

describe('rgb2hsl', () => {
  test('converts RGB color values to HSL representation', () => {
    const hsl = rgb2hsl(255, 0, 0);
    expect(hsl).toEqual([0, 1, 0.5]);

    const hsl2 = rgb2hsl(0, 255, 0);
    expect(hsl2).toEqual([0.3333333333333333, 1, 0.5]);

    const hsl3 = rgb2hsl(0, 0, 255);
    expect(hsl3).toEqual([0.6666666666666666, 1, 0.5]);
  });
});

describe('getRGBPositionData', () => {
  test('retrieves RGB color values of a pixel from a canvas', () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    context.fillStyle = 'rgb(0, 0, 0)';
    context.fillRect(0, 0, 1, 1);

    const event = new MouseEvent('click', {
      clientX: 0,
      clientY: 0,
      bubbles: true,
      cancelable: true,
      view: window,
    });
    Object.defineProperty(event, 'target', {value: canvas, enumerable: true});

    const data = getRGBPositionData(event, canvas);
    expect(data).toEqual({ x: 0, y: 0, r: 0, g: 0, b: 0 });
  });
});

describe('rgbToHex', () => {
  test('converts RGB color values to hexadecimal representation', () => {
    const hex = rgbToHex(255, 0, 0);
    expect(hex).toBe('#ff0000');

    const hex2 = rgbToHex(0, 255, 0);
    expect(hex2).toBe('#00ff00');

    const hex3 = rgbToHex(0, 0, 255);
    expect(hex3).toBe('#0000ff');
  });
});

describe('createTimeout', () => {
  jest.useFakeTimers(); // Enable fake timers

  test('executes the callback after the specified delay', () => {
    const callback = jest.fn();
    const cancelTimeout = createTimeout(callback);


    jest.advanceTimersByTime(700);
    expect(callback).toHaveBeenCalled();
    cancelTimeout();
    jest.advanceTimersByTime(700);

    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('cancels the timeout when the cancel function is called', () => {
    const callback = jest.fn(); // Create a mock callback function
    const cancelTimeout = createTimeout(callback);

    cancelTimeout();
    jest.advanceTimersByTime(700);

    expect(callback).not.toHaveBeenCalled();
  });
});
