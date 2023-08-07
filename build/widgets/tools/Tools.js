import { ElementBase } from "../../shared/ElementBase.js";
import { ToolButton } from "../../entities/components/tool_button/ToolButton.js";
export class Tools extends ElementBase {
    constructor() {
        super();
        this.id = "tools";
        this.init();
    }
    init() {
        const buttonMove = new ToolButton("move-ico.png", "move" /* ToolNames.MOVE */);
        const buttonHand = new ToolButton("hand-ico.png", "hand" /* ToolNames.HAND */);
        this.append(buttonMove, buttonHand);
        Array.from(this.children).forEach((button) => {
            button.addEventListener("click" /* Events.CLICK */, (event) => this.onToolSelect(event));
        });
    }
    onToolSelect(event) {
        var _a;
        const button = event.target;
        (_a = this.getSelectedTool()) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
        button === null || button === void 0 ? void 0 : button.classList.add("active");
        this.dispatchEvent(new Event("TOOL_SELECT" /* Events.TOOL_SELECT */));
    }
    getSelectedTool() {
        return this.querySelector(".active");
    }
    get selectedToolName() {
        var _a;
        return (_a = this.getSelectedTool()) === null || _a === void 0 ? void 0 : _a.toolName;
    }
}
customElements.define("el-tools", Tools);
//# sourceMappingURL=Tools.js.map