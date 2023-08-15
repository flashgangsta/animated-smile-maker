import {
    ListElementWithRenameLabel
} from "../../features/components/list_element_with_rename_label/ListElementWithRenameLabel.js";
import {MediaFile} from "../../shared/utils/MediaFile.js";
import {Paths} from "../../shared/consts/Paths";
import {EventListener} from "../../shared/utils/EventListener.js";
import {Events} from "../../shared/lib/Events";

export class LibraryItemListElement extends ListElementWithRenameLabel {
    private icon:HTMLImageElement = new Image();
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
        );

    }


    override selectItem(): void {
        this.dispatchEvent(new Event(Events.LIBRARY_ITEM_SELECTED, {bubbles: true}));
        super.selectItem();
    }

}

customElements.define("el-library-item-list-element", LibraryItemListElement);