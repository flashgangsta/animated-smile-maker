import {Panel} from "../../features/components/panel/Panel.js";
import {LibraryItemPreview} from "./LibraryItemPreview.js";
import {LibraryItemsList} from "./LibraryItemsList.js";
import {ProjectConfig} from "../../shared/utils/ProjectConfig.js";
import {Events} from "../../shared/lib/Events";
import {EventListener} from "../../shared/utils/EventListener.js";
import {MediaFile} from "../../shared/utils/MediaFile";
import {LibraryItemListElement} from "./LibraryItemListElement.js";

export class Library extends Panel {

    private readonly preview: LibraryItemPreview = new LibraryItemPreview();
    private readonly itemsList: LibraryItemsList = new LibraryItemsList();
    private readonly projectConfig: ProjectConfig = ProjectConfig.getInstance();

    constructor() {
        super("Library");
        this.id = "library";
        this.init();
    }

    private init(): void {

        const projectConfig: ProjectConfig = this.projectConfig;

        this.listenEvents(
            new EventListener(projectConfig, Events.MEDIA_IMPORTED, (event: Event): void => { this.onMediaImported() }),
            new EventListener(this.itemsList, Events.LIBRARY_ITEM_SELECTED, (event: Event) => { this.onItemSelect(event) }),
            new EventListener(this.itemsList, Events.LIBRARY_ITEM_REMOVE, (event: Event) => { this.onItemRemove(event) }),
            new EventListener(this.itemsList, Events.LIBRARY_ITEM_REMOVED, (event: Event) => { this.onItemRemoved(event) }),
            new EventListener(this.projectConfig, Events.PROJECT_OPEN, (event: Event) => { this.clearLibrary() }),
        );

        this.panelsContainer.append(this.preview, this.itemsList);
    }

    private onMediaImported() {
        const imports: MediaFile[] = this.projectConfig.lastImports;
        imports.forEach((mediaFile: MediaFile): void => {
            const libraryItemListElement: LibraryItemListElement = new LibraryItemListElement(mediaFile);
            this.itemsList.subPanelContainer.append(libraryItemListElement);
        });
    }

    private onItemSelect(event: Event) {
        const selectedItem: LibraryItemListElement = event.target as LibraryItemListElement;
        const lastSelectedItem: Element | null = this.itemsList.selectedItem;

        event.stopPropagation();

        if(selectedItem === lastSelectedItem) {
            return;
        }

        const image: HTMLImageElement = new Image();

        this.removePreviewImage();

        image.src = selectedItem.mediaFile.base64;
        lastSelectedItem?.classList.remove("selected");
        selectedItem.classList.add("selected");
        this.preview.append(image);
    }


    private removePreviewImage() {
        this.preview.children[0]?.remove();
    }

    private onItemRemove(event: Event) {
        this.projectConfig.removeLibraryMedia((event.target as LibraryItemListElement).mediaFile);
    }


    private onItemRemoved(event: Event) {
        event.stopPropagation();

        if(!this.itemsList.subPanelContainer.children.length) {
            this.removePreviewImage();
        }
    }

    private clearLibrary(): void {
        this.removePreviewImage();
        Array.from(this.itemsList.subPanelContainer.children).forEach((libraryItem: Element) => {
            libraryItem.remove();
        });
    }
}

customElements.define("el-library", Library);