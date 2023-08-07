import {ElementBase} from "../../shared/ElementBase.js";
import {ProjectConfig} from "../../shared/utils/ProjectConfig.js";
import {Events} from "../../shared/lib/Events.js";
import {EventListener} from "../../shared/utils/EventListener.js";
import {ICanvasSize} from "../../shared/interfaces/ICanvasSize";
import {Rectangle} from "../../shared/lib/geom/Rectangle.js";
import {IScrollBorders} from "../../shared/interfaces/IScrollBorders";

export class Scene extends ElementBase {

    private readonly canvas: HTMLCanvasElement = document.createElement("canvas");
    private readonly ctx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
    private readonly scrollBorderSize: number = 50;
    private readonly projectConfig: ProjectConfig = ProjectConfig.getInstance();
    private readonly ctxPosition: Rectangle = new Rectangle();
    private readonly scrollBorders: IScrollBorders = {top: 0, left: 0, bottom: 0, right: 0};

    constructor() {
        super();
        this.id = "scene";
        this.init();
    }

    private init() {
        this.listenEvents(
            new EventListener(window, Events.RESIZE, (event) => {
                this.onWindowResize(event)
            })
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
        const ctxPosition:Rectangle = this.ctxPosition;
        const scrollBorders:IScrollBorders = this.scrollBorders;

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

    private drawCtx():void {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(this.ctxPosition.x, this.ctxPosition.y, this.ctxPosition.width, this.ctxPosition.height);
        console.log(this.ctxPosition)
    }
}

customElements.define("el-scene", Scene);