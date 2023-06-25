import { createTimeout } from './utils';

import { AllElements } from './interfaces';

function copyText(
  { copyBtnText, copyButton }: AllElements): void {
  if (copyBtnText?.innerText) {
    navigator.clipboard.writeText(copyBtnText.innerText);
    copyButton.setAttribute('tooltip', 'Copied!');

    const copyButtonTimeout = createTimeout(() => {
      copyButton.removeAttribute('tooltip');
    });

    window.onbeforeunload = (): void => {
      copyButtonTimeout();
    };
  }
}

export default copyText;
