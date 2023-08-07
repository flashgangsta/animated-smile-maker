export class ProjectConfig extends EventTarget {
    constructor() {
        super();
        this.projectName = "Untitled";
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
}
//# sourceMappingURL=ProjectConfig.js.map