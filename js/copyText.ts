import { createTimeout } from './utils';

import { AllElements } from './interfaces';

function copyText({ copyBtnText, copyButton }: AllElements): void {
  if (copyBtnText?.innerText) {
    navigator
      .clipboard
      .writeText(copyBtnText.innerText)
      .then(
        () => {
          copyButton.setAttribute('tooltip', 'Copied!');
        },
        () => {
          console.log('Something went wrong when trying to copy to clipboard.')
        }
      );

    const copyButtonTimeout = createTimeout(() => {
      copyButton.removeAttribute('tooltip');
    });

    window.onbeforeunload = (): void => {
      copyButtonTimeout();
    };
  }
}

export default copyText;
