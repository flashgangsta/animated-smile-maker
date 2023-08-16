import {
    ListElementWithRenameLabel
} from "../../features/components/list_element_with_rename_label/ListElementWithRenameLabel.js";
import {MediaFile} from "../../shared/utils/MediaFile.js";
import {Paths} from "../../shared/consts/Paths";
import {EventListener} from "../../shared/utils/EventListener.js";
import {Events} from "../../shared/lib/Events";
import {Point} from "../../shared/lib/geom/Point.js";
import {ILibraryMediaDropInfo} from "../../shared/interfaces/ILibraryMediaDropInfo";

export class LibraryItemListElement extends ListElementWithRenameLabel {
    private icon:HTMLImageElement = new Image();
    private readonly DRAG_CLASS_NAME:string = "library-el-start-drag";
    public readonly mediaFile:MediaFile;

    constructor(mediaFile: MediaFile) {
        super(
            mediaFile.name,
            {
                "Cut": {},
                "Copy": {},
                "Paste": {},
                "Rename": {
                    handler: () => this.setLabelEditable()
                },
                "Delete": {},
            }
        );

        this.mediaFile = mediaFile;

        this.classList.add("library-item-list-el");

        if(mediaFile.type.startsWith("image/")) {
            this.icon.src = Paths.STATIC_IMGS + "image-ico.png";
        }

        this.prepend(this.icon);

        this.listenEvents(
            new EventListener(this, Events.LABEL_CHANGED, (event: Event): void => { mediaFile.name = this.labelText; }),
            new EventListener(this, Events.MOUSE_DOWN, (event: Event): void => { this.onElementMouseDown(event as MouseEvent) }),
        );

    }


    override selectItem(): void {
        this.dispatchEvent(new Event(Events.LIBRARY_ITEM_SELECTED, {bubbles: true}));
        super.selectItem();
    }

    private onElementMouseDown(event: MouseEvent): void {
        document.body.classList.add(this.DRAG_CLASS_NAME);
        this.listenEvents(
            new EventListener(window, Events.MOUSE_UP, (event: Event): void => { this.onWindowMouseUp(event as MouseEvent) })
        )
    }


    private onWindowMouseUp(event: MouseEvent): void {
        document.body.classList.remove(this.DRAG_CLASS_NAME);
        this.stopListenEvent(window, Events.MOUSE_UP);
        if(event.target instanceof HTMLCanvasElement) {
            const libraryMediaDropInfo:ILibraryMediaDropInfo = {
                media: this.mediaFile,
                point: new Point(event.pageX, event.pageY)
            }
            this.dispatchEvent(
                new CustomEvent(Events.LIBRARY_ITEM_DROP_TO_SCENE, {
                    bubbles: true,
                    detail: libraryMediaDropInfo
                })
            )
        }
    }

}

customElements.define("el-library-item-list-element", LibraryItemListElement);