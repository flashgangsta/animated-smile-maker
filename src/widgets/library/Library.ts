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
            new EventListener(projectConfig, Events.MEDIA_IMPORTED, (event:Event): void => { this.onMediaImported() })
        );


        /*this.#itemsList.addEventListener(Events.LIBRARY_ITEM_SELECTED, (event) => {
            const selectedItem = event.target;
            const lastSelectedItem = this.#itemsList.selectedItem;

            event.stopPropagation();

            if(selectedItem === lastSelectedItem) {
                return;
            }

            const image = new Image();

            this.#removePreviewImage();

            image.src = selectedItem.mediaFile.base64;
            lastSelectedItem?.classList.remove("selected");
            selectedItem.classList.add("selected");
            this.#preview.append(image);
        });


        this.addEventListener(Events.LIBRARY_ITEM_REMOVE, (event) => {
            this.#projectConfig.removeLibraryMedia(event.target.mediaFile);
        })


        this.addEventListener(Events.LIBRARY_ITEM_REMOVED, (event) => {
            event.stopPropagation();

            if(!this.#itemsList.subPanelContainer.children.length) {
                this.#removePreviewImage();
            }
        });


        this.#projectConfig.addEventListener(Events.PROJECT_OPEN, (event) => this.#clearLibrary())*/

        this.panelsContainer.append(this.preview, this.itemsList);
    }

    private onMediaImported() {
        const imports: MediaFile[] = this.projectConfig.lastImports;
        imports.forEach((mediaFile: MediaFile): void => {
            const libraryItemListElement: LibraryItemListElement = new LibraryItemListElement(mediaFile);
            this.itemsList.appendToSubPanelContainer(libraryItemListElement);
        });
    }
}

customElements.define("el-library", Library);