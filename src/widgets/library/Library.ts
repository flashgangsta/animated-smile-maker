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

        const projectConfig = this.projectConfig;

        this.listenEvents(
            new EventListener(projectConfig, Events.MEDIA_IMPORTED, (event: Event): void => { this.onMediaImported() }),
            new EventListener(this.itemsList, Events.LIBRARY_ITEM_SELECTED, (event: Event) => { this.onItemSelect(event) })
        );


       /* this.addEventListener(Events.LIBRARY_ITEM_REMOVE, (event) => {
            this.projectConfig.removeLibraryMedia(event.target.mediaFile);
        })


        this.addEventListener(Events.LIBRARY_ITEM_REMOVED, (event) => {
            event.stopPropagation();

            if(!this.itemsList.subPanelContainer.children.length) {
                this.removePreviewImage();
            }
        });


        this.projectConfig.addEventListener(Events.PROJECT_OPEN, (event) => this.clearLibrary())*/

        this.panelsContainer.append(this.preview, this.itemsList);
    }

    private onMediaImported() {
        const imports: MediaFile[] = this.projectConfig.lastImports;
        imports.forEach((mediaFile: MediaFile): void => {
            const libraryItemListElement: LibraryItemListElement = new LibraryItemListElement(mediaFile);
            this.itemsList.appendToSubPanelContainer(libraryItemListElement);
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
}

customElements.define("el-library", Library);