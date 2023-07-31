var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SubPanel_header, _SubPanel_footer, _SubPanel_subPanelContainer;
import { CustomElement } from "../CustomElement.js";
import { Container } from "../Container.js";
export class SubPanel extends CustomElement {
    constructor() {
        super();
        _SubPanel_header.set(this, new Container());
        _SubPanel_footer.set(this, new Container());
        _SubPanel_subPanelContainer.set(this, new Container());
        this.classList.add("sub-panel");
        __classPrivateFieldGet(this, _SubPanel_header, "f").classList.add("header");
        __classPrivateFieldGet(this, _SubPanel_footer, "f").classList.add("footer");
        __classPrivateFieldGet(this, _SubPanel_subPanelContainer, "f").classList.add("sub-panel-container");
        this.append(this.header, this.subPanelContainer, this.footer);
    }
    get header() {
        return __classPrivateFieldGet(this, _SubPanel_header, "f");
    }
    get footer() {
        return __classPrivateFieldGet(this, _SubPanel_footer, "f");
    }
    get subPanelContainer() {
        return __classPrivateFieldGet(this, _SubPanel_subPanelContainer, "f");
    }
}
_SubPanel_header = new WeakMap(), _SubPanel_footer = new WeakMap(), _SubPanel_subPanelContainer = new WeakMap();
//# sourceMappingURL=SubPanel.js.map