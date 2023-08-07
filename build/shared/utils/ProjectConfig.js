export class ProjectConfig extends EventTarget {
    constructor() {
        super();
        this.projectName = "Untitled";
        this.fileExt = ".anmtr";
        this.canvasSize = {
            width: 550,
            height: 450
        };
        this.library = [];
        this._lastImports = [];
    }
    static getInstance() {
        if (!ProjectConfig.instance) {
            ProjectConfig.instance = new ProjectConfig();
        }
        return ProjectConfig.instance;
    }
    pushLibraryMedia(...mediaFiles) {
        this.library.push(...mediaFiles);
        this._lastImports = [...mediaFiles];
        this.dispatchEvent(new Event("MEDIA_IMPORTED" /* Events.MEDIA_IMPORTED */));
    }
    removeLibraryMedia(mediaFile) {
        const index = this.library.findIndex((el) => el.name === mediaFile.name);
        this.library.splice(index, 1);
    }
    get lastImports() {
        return this._lastImports;
    }
}
//# sourceMappingURL=ProjectConfig.js.map