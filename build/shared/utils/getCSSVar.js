export function getCSSVar(varName) {
    return getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`);
}
//# sourceMappingURL=getCSSVar.js.map