export class ProjectConfig extends EventTarget {
    constructor() {
        super();
        this.projectName = "Untitled";
        this.fileExt = ".anmtr";
        this.canvasSize = {
            width: 550,
            height: 450
        };
    }
    static getInstance() {
        if (!ProjectConfig.instance) {
            ProjectConfig.instance = new ProjectConfig();
        }
        return ProjectConfig.instance;
    }
    pushLibraryMedia(...mediaFiles) {
        console.log(mediaFiles);
    }
}
//# sourceMappingURL=ProjectConfig.js.map