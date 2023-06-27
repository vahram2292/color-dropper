"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
/**
 * Handel copy color to clipboard functionality.
 *
 * @param {AllElements} allElements - An object containing the DOM elements.
 * @returns {void}
 */
function copyText({ copyBtnText, copyButton }) {
    if (copyBtnText === null || copyBtnText === void 0 ? void 0 : copyBtnText.innerText) {
        navigator
            .clipboard
            .writeText(copyBtnText.innerText)
            .then(() => {
            copyButton.setAttribute('tooltip', 'Copied!');
        }, () => {
            console.log('Something went wrong when trying to copy to clipboard.');
        });
        const copyButtonTimeout = (0, utils_1.createTimeout)(() => {
            copyButton.removeAttribute('tooltip');
        });
        window.onbeforeunload = () => {
            copyButtonTimeout();
        };
    }
}
exports.default = copyText;
//# sourceMappingURL=copyText.js.map