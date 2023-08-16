import {SubPanel} from "../../features/components/sub_panel/SubPanel.js";
import {PanelButton} from "../../entities/components/panel_button/PanelButton.js";
import {PanelButtonRemove} from "../../entities/components/panel_button/PanelButtonRemove.js";
import {Events} from "../../shared/lib/Events";
import {ProjectConfig} from "../../shared/utils/ProjectConfig.js";
import {TimelineLayersLayer} from "./TimelineLayersLayer.js";
import {EventListener} from "../../shared/utils/EventListener.js";

export class TimelineLayers extends SubPanel {

    private readonly projectConfig:ProjectConfig = ProjectConfig.getInstance();
    private unnamedLayerNum: number = this.projectConfig.layersLength;

    constructor() {
        super();
        this.id = "timeline-layers";
        this.init();
    }


    private init(): void {
        const buttonVisibility: PanelButton = new PanelButton("eye-ico.png");
        const buttonLock: PanelButton = new PanelButton("lock-ico.png");

        const buttonNewLayer: PanelButton = new PanelButton("new-layer-ico.png");
        const buttonRemoveLayer: PanelButtonRemove = new PanelButtonRemove();

        this.addLayer();

        this.listenEvents(
            new EventListener(buttonNewLayer, Events.CLICK, (event: Event) => this.addLayer()),
            new EventListener(buttonRemoveLayer, Events.CLICK, (event: Event) => this.removeSelectedLayer()),
            new EventListener(this.projectConfig, Events.PROJECT_OPEN, (event: Event) => this.removeAllLayers()),
            new EventListener(this.projectConfig, Events.PROJECT_LAYERS_INIT, (event: Event) => this.loadProjectLayers()),
            new EventListener(this.subPanelContainer, Events.LAYER_SELECT, (event: Event) => this.onLayerSelect(event)),
        )

        this.subPanelContainer.classList.add("layers-container");

        this.header.append(buttonVisibility, buttonLock);
        this.footer.append(buttonNewLayer, buttonRemoveLayer);
    }

    private addLayer(): void {
        const layer: TimelineLayersLayer = new TimelineLayersLayer(++this.unnamedLayerNum);
        const lastSelectedLayer: TimelineLayersLayer | null = this.getSelectedLayer();
        if(lastSelectedLayer) {
            lastSelectedLayer.unselect();
            this.subPanelContainer.insertBefore(layer, lastSelectedLayer);
        } else {
            this.subPanelContainer.prepend(layer);
        }

        layer.selectItem();

        this.dispatchLayerAdded();
    }


    private removeSelectedLayer(): void {
        //TODO: Move this and same in LibraryItemsList to extends class
        const layersList: HTMLCollection = this.subPanelContainer.children;
        if(layersList.length > 1) {
            const selectedLayer: TimelineLayersLayer | null = this.getSelectedLayer();
            if(selectedLayer) {
                const selectedLayerIndex: number = Array.from(layersList).indexOf(selectedLayer);
                selectedLayer.remove();
                (layersList[Math.min(selectedLayerIndex, layersList.length-1)] as TimelineLayersLayer).selectItem();
                this.dispatchEvent(new Event(Events.LAYER_REMOVED, {bubbles: true}));
            }

        }
    }


    private removeAllLayers(): void {
        const layersList: Element[] = Array.from(this.subPanelContainer.children);
        layersList.forEach((layer: Element): void => {
            layer.remove();
            this.dispatchEvent(new Event(Events.LAYER_REMOVED, {bubbles: true}));
        })
    }


    private onLayerSelect(event: Event): void {
        event.stopPropagation();
        this.getSelectedLayer()?.unselect();
    }


    private getSelectedLayer(): TimelineLayersLayer | null {
        return this.subPanelContainer.querySelector(".selected");
    }


    private loadProjectLayers(): void {
       const layersList: TimelineLayersLayer[] = this.projectConfig.libraryLayers;
        layersList.forEach((layer: TimelineLayersLayer ): void => {
            this.subPanelContainer.prepend(layer);
            this.dispatchLayerAdded();
        })

        layersList[layersList.length - 1].selectItem();

    }


    private dispatchLayerAdded(): void {
        this.dispatchEvent(new Event(Events.LAYER_ADDED, {bubbles: true}));
    }
}

customElements.define("el-timeline-layers", TimelineLayers);