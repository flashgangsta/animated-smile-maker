import {ElementBase} from "../../shared/ElementBase.js";
import {Events} from "../../shared/lib/Events";
import {ToolButton} from "../../entities/components/tool_button/ToolButton.js";
import {ToolNames} from "../../shared/lib/ToolNames";
import {EventListener} from "../../shared/utils/EventListener.js";

export class Tools extends ElementBase {
    constructor() {
        super();
        this.id = "tools";
        this.init();
    }

    private init() {
        const buttonMove:ToolButton = new ToolButton("move-ico.png", ToolNames.MOVE);
        const buttonHand:ToolButton = new ToolButton("hand-ico.png", ToolNames.HAND);

        this.append(buttonMove, buttonHand);

        Array.from(this.children).forEach((button:Element):void => {
            this.listenEvents(
                new EventListener(button, Events.CLICK, (event: Event): void => this.onToolSelect(event as MouseEvent))
            )
        });
    }

    private onToolSelect(event: MouseEvent): void {
        const button: ToolButton = event.target as ToolButton;
        this.getSelectedTool()?.classList.remove("active");
        button?.classList.add("active");
        this.dispatchEvent(new Event(Events.TOOL_SELECT));
    }

    private getSelectedTool():ToolButton | undefined {
        return this.querySelector(".active") as ToolButton;
    }


    get selectedToolName():ToolNames | undefined {
        return this.getSelectedTool()?.toolName;
    }
}

customElements.define("el-tools", Tools);