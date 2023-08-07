import { ElementBase } from "../../shared/ElementBase.js";
import { ProjectConfig } from "../../shared/utils/ProjectConfig.js";
import { EventListener } from "../../shared/utils/EventListener.js";
import { Rectangle } from "../../shared/lib/geom/Rectangle.js";
import { Point } from "../../shared/lib/geom/Point.js";
export class Scene extends ElementBase {
    constructor() {
        super();
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.scrollBorderSize = 50;
        this.projectConfig = ProjectConfig.getInstance();
        this.ctxPosition = new Rectangle();
        this.scrollBorders = { top: 0, left: 0, bottom: 0, right: 0 };
        this.handActive = false;
        this.moveMouseStart = undefined;
        this.id = "scene";
        this.init();
    }
    init() {
        this.listenEvents(new EventListener(window, "resize" /* Events.RESIZE */, (event) => { this.onWindowResize(event); }), new EventListener(window, "keydown" /* Events.KEY_DOWN */, (event) => { this.onKeyDown(event); }), new EventListener(window, "keyup" /* Events.KEY_UP */, (event) => { this.onKeyUp(event); }), new EventListener(window, "mousedown" /* Events.MOUSE_DOWN */, (event) => { this.onMouseDown(event); }), new EventListener(window, "mouseup" /* Events.MOUSE_UP */, (event) => { this.onMouseUp(event); }), new EventListener(window, "mousemove" /* Events.MOUSE_MOVE */, (event) => { this.onMouseMove(event); }), new EventListener(window, "mouseleave" /* Events.MOUSE_LEAVE */, (event) => { this.onMouseLeave(event); }), new EventListener(this, "wheel" /* Events.WHEEL */, (event) => { this.onWheel(event); }, { passive: true }));
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
        this.scrollBorders.bottom = this.height - this.scrollBorderSize;
        this.scrollBorders.right = this.width - this.scrollBorderSize;
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
    onKeyDown(event) {
        if (event.code === "Space" /* KeyCodes.SPACE */ && !this.handActive) {
            this.onToolSelect("hand" /* ToolNames.HAND */);
            console.log("SPACE PRESS");
        }
    }
    onKeyUp(event) {
        if (event.code === "Space" /* KeyCodes.SPACE */) {
            this.canvas.classList.remove("hand-active");
            this.handActive = false;
            console.log("SPACE RELEASE");
        }
    }
    onMouseDown(event) {
        if (this.handActive) {
            this.moveMouseStart = new Point(event.clientX, event.clientY);
        }
    }
    onMouseUp(event) {
        this.moveMouseStart = undefined;
    }
    onMouseMove(event) {
        if (this.handActive && this.moveMouseStart) {
            const moveX = this.moveMouseStart.x - event.clientX;
            const moveY = this.moveMouseStart.y - event.clientY;
            this.moveMouseStart.x = event.clientX;
            this.moveMouseStart.y = event.clientY;
            this.moveCanvas(moveX, moveY);
        }
    }
    onWheel(event) {
    }
    onMouseLeave(event) {
    }
    moveCanvas(x, y) {
        this.ctxPosition.x -= x;
        this.ctxPosition.y -= y;
        this.setBorders();
        this.drawCtx();
    }
    setBorders() {
        const ctxPosition = this.ctxPosition;
        const scrollBorders = this.scrollBorders;
        if (ctxPosition.x < scrollBorders.left) {
            ctxPosition.x = scrollBorders.left;
        }
        if (ctxPosition.y < scrollBorders.top) {
            ctxPosition.y = scrollBorders.top;
        }
        if (ctxPosition.x > scrollBorders.right) {
            ctxPosition.x = scrollBorders.right;
        }
        if (ctxPosition.y > scrollBorders.bottom) {
            ctxPosition.y = scrollBorders.bottom;
        }
    }
    drawCtx() {
        if (!this.ctx)
            return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.ctxPosition.x, this.ctxPosition.y, this.ctxPosition.width, this.ctxPosition.height);
    }
    onToolSelect(toolName) {
        switch (toolName) {
            case "hand" /* ToolNames.HAND */: {
                this.canvas.classList.toggle("hand-active", true);
                this.handActive = true;
                break;
            }
        }
    }
}
customElements.define("el-scene", Scene);
//# sourceMappingURL=Scene.js.map