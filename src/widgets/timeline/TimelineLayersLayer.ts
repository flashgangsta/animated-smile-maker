import {
    ListElementWithRenameLabel
} from "../../features/components/list_element_with_rename_label/ListElementWithRenameLabel.js";
import {ProjectConfig} from "../../shared/utils/ProjectConfig.js";
import {Events} from "../../shared/lib/Events";
import {EventListener} from "../../shared/utils/EventListener.js";

export class TimelineLayersLayer extends ListElementWithRenameLabel {

    public readonly layerID: number;
    private projectConfig: ProjectConfig = ProjectConfig.getInstance();

    constructor(index: number, name?:string) {
        super(
            name || `Layer ${index}`,
            {
                "Rename Layer": {
                    handler: (): void => { this.setLabelEditable(); }
                },
                "Insert Layer": {},
                "Delete Layer": {},

            }
        );
        this.layerID = index;
        this.classList.add("timeline-layers-layer");

        this.projectConfig.pushLibraryLayer(this);
    }


    override selectItem(): void {
        this.dispatchEvent(new Event(Events.LAYER_SELECT, {bubbles: true}));
        super.selectItem();
    }


    unselect(): void {
        this.classList.remove("selected");
    }

    serializeObject() {
        //todo: set type
        return {
            id: this.layerID,
            label: this.labelText,
        }
    }


    remove() {
        this.projectConfig.removeLibraryLayer(this);
        super.remove();
    }
}


customElements.define("el-timeline-layers-layer", TimelineLayersLayer);