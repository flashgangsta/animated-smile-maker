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
                "Insert Layer": {},
                "Delete Layer": {}
            }
        );
        this.layerID = index;
        this.classList.add("timeline-layers-layer");
        this.listenEvents(
            new EventListener(this, Events.CLICK, (event: Event) => this.select()),
        );
        this.projectConfig.pushLibraryLayer(this);
    }


    select(): void {
        this.dispatchEvent(new Event(Events.LAYER_SELECT, {bubbles: true}));
        this.classList.add("selected");
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