import { ElementBase } from "../../shared/ElementBase.js";
import { ProjectConfig } from "../../shared/utils/ProjectConfig.js";
import { EventListener } from "../../shared/utils/EventListener.js";
import { Rectangle } from "../../shared/lib/geom/Rectangle.js";
export class Scene extends ElementBase {
    constructor() {
        super();
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.scrollBorderSize = 50;
        this.projectConfig = ProjectConfig.getInstance();
        this.ctxPosition = new Rectangle();
        this.scrollBorders = { top: 0, left: 0, bottom: 0, right: 0 };
        this.id = "scene";
        this.init();
    }
    init() {
        this.listenEvents(new EventListener(window, "resize" /* Events.RESIZE */, (event) => {
            this.onWindowResize(event);
        }));
        this.append(this.canvas);
    }
    get width() {
        return this.canvas.width;
    }
    get height() {
        return this.canvas.height;
    }
    onWindowResize(event = undefined) {
        this.canvas.width = this.offsetWidth;
        this.canvas.height = this.offsetHeight;
        this.drawCtx();
    }
    connectedCallback() {
        super.connectedCallback();
        this.onWindowResize();
        const canvasSize = this.projectConfig.canvasSize;
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const width = canvasSize.width;
        const height = canvasSize.height;
        const ctxPosition = this.ctxPosition;
        const scrollBorders = this.scrollBorders;
        ctxPosition.x = Math.round(centerX - (width / 2));
        ctxPosition.y = Math.round(centerY - (height / 2));
        ctxPosition.width = canvasSize.width;
        ctxPosition.height = canvasSize.height;
        scrollBorders.top = -ctxPosition.height + this.scrollBorderSize;
        scrollBorders.left = -ctxPosition.width + this.scrollBorderSize;
        scrollBorders.bottom = this.height - this.scrollBorderSize;
        scrollBorders.right = this.width - this.scrollBorderSize;
        this.drawCtx();
    }
    drawCtx() {
        if (!this.ctx)
            return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.ctxPosition.x, this.ctxPosition.y, this.ctxPosition.width, this.ctxPosition.height);
        console.log(this.ctxPosition);
    }
}
customElements.define("el-scene", Scene);
//# sourceMappingURL=Scene.js.map