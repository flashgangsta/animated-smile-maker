import {ElementBase} from "../../shared/ElementBase.js";
import {ProjectConfig} from "../../shared/utils/ProjectConfig.js";
import {Events} from "../../shared/lib/Events.js";
import {EventListener} from "../../shared/utils/EventListener.js";
import {ICanvasSize} from "../../shared/interfaces/ICanvasSize";
import {Rectangle} from "../../shared/lib/geom/Rectangle.js";
import {IScrollBorders} from "../../shared/interfaces/IScrollBorders";
import {ToolNames} from "../../shared/lib/ToolNames.js";
import {KeyCodes} from "../../shared/lib/KeyCodes.js";
import {Point} from "../../shared/lib/geom/Point.js";

export class Scene extends ElementBase {

    private readonly canvas: HTMLCanvasElement = document.createElement("canvas");
    private readonly ctx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
    private readonly scrollBorderSize: number = 50;
    private readonly projectConfig: ProjectConfig = ProjectConfig.getInstance();
    private readonly ctxPosition: Rectangle = new Rectangle();
    private readonly scrollBorders: IScrollBorders = {top: 0, left: 0, bottom: 0, right: 0};
    private handActive: boolean = false;
    private moveMouseStart: Point | undefined = undefined;

    constructor() {
        super();
        this.id = "scene";
        this.init();
    }

    private init() {
        this.listenEvents(
            new EventListener(window, Events.RESIZE, (event: Event):void => { this.onWindowResize(event) }),
            new EventListener(window, Events.KEY_DOWN, (event: Event):void => { this.onKeyDown(event as KeyboardEvent) }),
            new EventListener(window, Events.KEY_UP, (event: Event):void => { this.onKeyUp(event as KeyboardEvent) }),
            new EventListener(window, Events.MOUSE_DOWN, (event: Event):void => { this.onMouseDown(event as MouseEvent) }),
            new EventListener(window, Events.MOUSE_UP, (event: Event):void => { this.onMouseUp(event as MouseEvent) }),
            new EventListener(window, Events.MOUSE_MOVE, (event: Event):void => { this.onMouseMove(event as MouseEvent) }),
            new EventListener(window, Events.MOUSE_LEAVE, (event: Event):void => { this.onMouseLeave(event as MouseEvent) }),
            new EventListener(this, Events.WHEEL, (event: Event):void => { this.onWheel(event as WheelEvent) }, {passive: true})
        );

        this.append(this.canvas);
    }

    private get width(): number {
        return this.canvas.width;
    }

    private get height(): number {
        return this.canvas.height;
    }

    private onWindowResize(event: Event | undefined = undefined) {
        this.canvas.width = this.offsetWidth;
        this.canvas.height = this.offsetHeight;
        this.scrollBorders.bottom = this.height - this.scrollBorderSize;
        this.scrollBorders.right = this.width - this.scrollBorderSize;
        this.drawCtx();
    }


    connectedCallback() {
        super.connectedCallback();
        this.onWindowResize();
        const canvasSize: ICanvasSize = this.projectConfig.canvasSize;

        const centerX: number = this.width / 2;
        const centerY: number = this.height / 2;
        const width: number = canvasSize.width;
        const height: number = canvasSize.height;
        const ctxPosition: Rectangle = this.ctxPosition;
        const scrollBorders: IScrollBorders = this.scrollBorders;

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

    private onKeyDown(event: KeyboardEvent): void {
        if (event.code === KeyCodes.SPACE && !this.handActive) {
            this.onToolSelect(ToolNames.HAND);
        }
    }

    private onKeyUp(event: KeyboardEvent): void {
        if(event.code === KeyCodes.SPACE) {
            this.canvas.classList.remove("hand-active");
            this.handActive = false;
        }
    }


    private onMouseDown(event: MouseEvent): void {
        if(this.handActive) {
            this.moveMouseStart = new Point(event.clientX, event.clientY);
        }
    }

    private onMouseUp(event: MouseEvent): void {
        this.moveMouseStart = undefined;
    }

    private onMouseMove(event: MouseEvent): void {
        if(this.handActive && this.moveMouseStart) {
            const moveX: number = this.moveMouseStart.x - event.clientX;
            const moveY: number = this.moveMouseStart.y - event.clientY;
            this.moveMouseStart.x = event.clientX;
            this.moveMouseStart.y = event.clientY;
            this.moveCanvas(moveX, moveY);
        }
    }

    private onWheel(event: WheelEvent): void {

    }

    private onMouseLeave(event: MouseEvent) {

    }


    private moveCanvas(x: number, y: number) {
        this.ctxPosition.x -= x;
        this.ctxPosition.y -= y;

        this.setBorders();

        this.drawCtx();
    }


    private setBorders():void {
        const ctxPosition: Rectangle = this.ctxPosition;
        const scrollBorders: IScrollBorders = this.scrollBorders;

        if(ctxPosition.x < scrollBorders.left) {
            ctxPosition.x = scrollBorders.left;
        }

        if(ctxPosition.y < scrollBorders.top) {
            ctxPosition.y = scrollBorders.top;
        }

        if(ctxPosition.x > scrollBorders.right) {
            ctxPosition.x = scrollBorders.right;
        }

        if(ctxPosition.y > scrollBorders.bottom) {
            ctxPosition.y = scrollBorders.bottom;
        }
    }


    private drawCtx(): void {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.ctxPosition.x, this.ctxPosition.y, this.ctxPosition.width, this.ctxPosition.height);
    }

    private onToolSelect(toolName: ToolNames): void {
        switch (toolName) {
            case ToolNames.HAND: {
                this.canvas.classList.toggle("hand-active", true);
                this.handActive = true;
                break;
            }
        }
    }

}

customElements.define("el-scene", Scene);