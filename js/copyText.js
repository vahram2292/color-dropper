"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
function copyText({ copyBtnText, copyButton }) {
    if (copyBtnText === null || copyBtnText === void 0 ? void 0 : copyBtnText.innerText) {
        navigator.clipboard.writeText(copyBtnText.innerText);
        copyButton.setAttribute('tooltip', 'Copied!');
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