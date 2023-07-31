import {ElementBase} from "../../shared/ElementBase.js";
import {Events} from "../../shared/lib/Events.js";
import {ToolButton} from "../../entities/components/tool_button/ToolButton.js";

export class Tools extends ElementBase {

    private static readonly TOOL_MOVE = "move";
    private static readonly TOOL_HAND = "hand";
    constructor() {
        super();
        this.init();
    }

    private init() {
        const buttonMove:ToolButton = new ToolButton("move-ico.png", Tools.TOOL_MOVE);
        const buttonHand:ToolButton = new ToolButton("hand-ico.png", Tools.TOOL_HAND);

        this.append(buttonMove, buttonHand);

        Array.from(this.children).forEach((button:Element):void => {
            button.addEventListener(Events.CLICK, (event:Event) => this.onToolSelect(event));
        });
    }

    private onToolSelect(event: Event):void {
        const button = event.target as ToolButton;
        this.getSelectedTool()?.classList.remove("active");
        button?.classList.add("active");
        this.dispatchEvent(new Event(Events.TOOL_SELECT));
    }

    private getSelectedTool():ToolButton | undefined {
        return this.querySelector(".active") as ToolButton;
    }


    get selectedToolName() {
        return this.getSelectedTool()?.toolName || null;
    }
}

customElements.define("el-tools", Tools);