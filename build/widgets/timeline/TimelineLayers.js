import { SubPanel } from "../../features/components/sub_panel/SubPanel.js";
import { PanelButton } from "../../entities/components/panel_button/PanelButton.js";
import { PanelButtonRemove } from "../../entities/components/panel_button/PanelButtonRemove.js";
import { ProjectConfig } from "../../shared/utils/ProjectConfig.js";
import { TimelineLayersLayer } from "./TimelineLayersLayer.js";
import { EventListener } from "../../shared/utils/EventListener.js";
export class TimelineLayers extends SubPanel {
    projectConfig = ProjectConfig.getInstance();
    unnamedLayerNum = this.projectConfig.layersLength;
    constructor() {
        super();
        this.id = "timeline-layers";
        this.init();
    }
    init() {
        const buttonVisibility = new PanelButton("eye-ico.png");
        const buttonLock = new PanelButton("lock-ico.png");
        const buttonNewLayer = new PanelButton("new-layer-ico.png");
        const buttonRemoveLayer = new PanelButtonRemove();
        this.addLayer();
        this.listenEvents(new EventListener(buttonNewLayer, "click" /* Events.CLICK */, (event) => this.addLayer()), new EventListener(buttonRemoveLayer, "click" /* Events.CLICK */, (event) => this.removeSelectedLayer()), new EventListener(this.projectConfig, "PROJECT_OPEN" /* Events.PROJECT_OPEN */, (event) => this.removeAllLayers()), new EventListener(this.projectConfig, "PROJECT_LAYERS_INIT" /* Events.PROJECT_LAYERS_INIT */, (event) => this.loadProjectLayers()), new EventListener(this.subPanelContainer, "LAYER_SELECT" /* Events.LAYER_SELECT */, (event) => this.onLayerSelect(event)));
        this.subPanelContainer.classList.add("layers-container");
        this.header.append(buttonVisibility, buttonLock);
        this.footer.append(buttonNewLayer, buttonRemoveLayer);
    }
    addLayer() {
        const layer = new TimelineLayersLayer(++this.unnamedLayerNum);
        const lastSelectedLayer = this.getSelectedLayer();
        if (lastSelectedLayer) {
            lastSelectedLayer.unselect();
            this.subPanelContainer.insertBefore(layer, lastSelectedLayer);
        }
        else {
            this.subPanelContainer.prepend(layer);
        }
        layer.selectItem();
        this.dispatchLayerAdded();
    }
    removeSelectedLayer() {
        //TODO: Move this and same in LibraryItemsList to extends class
        const layersList = this.subPanelContainer.children;
        if (layersList.length > 1) {
            const selectedLayer = this.getSelectedLayer();
            if (selectedLayer) {
                const selectedLayerIndex = Array.from(layersList).indexOf(selectedLayer);
                selectedLayer.remove();
                layersList[Math.min(selectedLayerIndex, layersList.length - 1)].selectItem();
                this.dispatchEvent(new Event("LAYER_REMOVED" /* Events.LAYER_REMOVED */, { bubbles: true }));
            }
        }
    }
    removeAllLayers() {
        const layersList = Array.from(this.subPanelContainer.children);
        layersList.forEach((layer) => {
            layer.remove();
            this.dispatchEvent(new Event("LAYER_REMOVED" /* Events.LAYER_REMOVED */, { bubbles: true }));
        });
    }
    onLayerSelect(event) {
        event.stopPropagation();
        this.getSelectedLayer()?.unselect();
    }
    getSelectedLayer() {
        return this.subPanelContainer.querySelector(".selected");
    }
    loadProjectLayers() {
        const layersList = this.projectConfig.libraryLayers;
        layersList.forEach((layer) => {
            this.subPanelContainer.prepend(layer);
            this.dispatchLayerAdded();
        });
        layersList[layersList.length - 1].selectItem();
    }
    dispatchLayerAdded() {
        this.dispatchEvent(new Event("LAYER_ADDED" /* Events.LAYER_ADDED */, { bubbles: true }));
    }
}
customElements.define("el-timeline-layers", TimelineLayers);
//# sourceMappingURL=TimelineLayers.js.map