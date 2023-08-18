import { ElementBase } from "../../shared/ElementBase.js";
import { ToolButton } from "../../entities/components/tool_button/ToolButton.js";
import { EventListener } from "../../shared/utils/EventListener.js";
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
            this.listenEvents(new EventListener(button, "click" /* Events.CLICK */, (event) => this.onToolSelect(event)));
        });
    }
    onToolSelect(event) {
        const button = event.target;
        this.getSelectedTool()?.classList.remove("active");
        button?.classList.add("active");
        this.dispatchEvent(new Event("TOOL_SELECT" /* Events.TOOL_SELECT */));
    }
    getSelectedTool() {
        return this.querySelector(".active");
    }
    get selectedToolName() {
        return this.getSelectedTool()?.toolName;
    }
}
customElements.define("el-tools", Tools);
//# sourceMappingURL=Tools.js.map