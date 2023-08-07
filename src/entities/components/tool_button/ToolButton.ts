import {PanelButton} from "../panel_button/PanelButton.js";
import {ToolNames} from "../../../shared/lib/ToolNames";

export class ToolButton extends PanelButton {
    private readonly toolNameValue: ToolNames;

    constructor(iconPath: string, toolName: ToolNames) {
        super(iconPath);
        this.toolNameValue = toolName;
    }

    get toolName(): ToolNames {
        return this.toolNameValue;
    }
}

customElements.define("el-tool-button", ToolButton);