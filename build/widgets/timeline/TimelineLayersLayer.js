import { ListElementWithRenameLabel } from "../../features/components/list_element_with_rename_label/ListElementWithRenameLabel.js";
import { ProjectConfig } from "../../shared/utils/ProjectConfig.js";
import { EventListener } from "../../shared/utils/EventListener.js";
export class TimelineLayersLayer extends ListElementWithRenameLabel {
    constructor(index, name) {
        super(name || `Layer ${index}`);
        this.projectConfig = ProjectConfig.getInstance();
        this.layerID = index;
        this.classList.add("timeline-layers-layer");
        this.listenEvents(new EventListener(this, "click" /* Events.CLICK */, (event) => this.select()));
        this.projectConfig.pushLibraryLayer(this);
    }
    select() {
        this.dispatchEvent(new Event("LAYER_SELECT" /* Events.LAYER_SELECT */, { bubbles: true }));
        this.classList.add("selected");
    }
    unselect() {
        this.classList.remove("selected");
    }
    serializeObject() {
        //todo: set type
        return {
            id: this.layerID,
            label: this.labelText,
        };
    }
    remove() {
        this.projectConfig.removeLibraryLayer(this);
        super.remove();
    }
}
customElements.define("el-timeline-layers-layer", TimelineLayersLayer);
//# sourceMappingURL=TimelineLayersLayer.js.map