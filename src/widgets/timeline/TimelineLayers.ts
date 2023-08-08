import {SubPanel} from "../../features/components/sub_panel/SubPanel.js";
import {PanelButton} from "../../entities/components/panel_button/PanelButton.js";
import {PanelButtonRemove} from "../../entities/components/panel_button/PanelButtonRemove.js";
import {Events} from "../../shared/lib/Events";

export class TimelineLayers extends SubPanel {
    constructor() {
        super();
        this.id = "timeline-layers";
        this.init();
    }


    private init(): void {
        const buttonVisibility: PanelButton = new PanelButton("eye-ico.png");
        const buttonLock: PanelButton = new PanelButton("lock-ico.png");

        const buttonNewLayer = new PanelButton("new-layer-ico.png");
        const buttonRemoveLayer: PanelButtonRemove = new PanelButtonRemove();

        //this.addLayer();

        //buttonNewLayer.addEventListener(Events.CLICK, (event) => this.addLayer());
        //buttonRemoveLayer.addEventListener(Events.CLICK, (event) => this.removeSelectedLayer());
        //this.projectConfig.addEventListener(Events.PROJECT_OPEN, (event) => this.#onProjectOpen());
        //this.projectConfig.addEventListener(Events.PROJECT_LAYERS_INIT, (event) => this.#loadProjectLayers());

        this.subPanelContainer.classList.add("layers-container");

        /*this.subPanelContainer.addEventListener(Events.LAYER_SELECT, (event) => {
            event.stopPropagation();
            this.getSelectedLayer()?.unselect();
        });*/

        this.header.append(buttonVisibility, buttonLock);
        this.footer.append(buttonNewLayer, buttonRemoveLayer);
    }
}

customElements.define("el-timeline-layers", TimelineLayers);