var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Body_instances, _Body_canvas, _Body_ctx, _Body_projectConfig, _Body_handActive, _Body_moveMouseStart, _Body_ctxPosition, _Body_scrollBorders, _Body_scrollBorderSize, _Body_onAddedToDOM, _Body_drawCtx, _Body_onWindowResize, _Body_onKeyDown, _Body_onKeyUp, _Body_onMouseDown, _Body_onMouseUp, _Body_onMouseMove, _Body_onWheel, _Body_moveCanvas, _Body_setBorders;
import { CustomElement } from "./CustomElement.js";
import { EventListener } from "../models/EventListener.js";
import { ProjectConfig } from "../ProjectConfig.js";
import { Tools } from "./tools/Tools.js";
import { Events } from "../Events.js";
export class Body extends CustomElement {
    constructor() {
        super();
        _Body_instances.add(this);
        _Body_canvas.set(this, document.createElement("canvas"));
        _Body_ctx.set(this, __classPrivateFieldGet(this, _Body_canvas, "f").getContext("2d"));
        _Body_projectConfig.set(this, new ProjectConfig());
        _Body_handActive.set(this, false);
        _Body_moveMouseStart.set(this, null);
        _Body_ctxPosition.set(this, {});
        _Body_scrollBorders.set(this, {});
        _Body_scrollBorderSize.set(this, 50);
        this.id = "body";
        this.listenEvents(new EventListener(window, Events.RESIZE, (event) => { __classPrivateFieldGet(this, _Body_instances, "m", _Body_onWindowResize).call(this, event); }), new EventListener(this, Events.ADDED_TO_DOM, () => { __classPrivateFieldGet(this, _Body_instances, "m", _Body_onAddedToDOM).call(this); }), new EventListener(window, Events.KEY_DOWN, (event) => { __classPrivateFieldGet(this, _Body_instances, "m", _Body_onKeyDown).call(this, event); }), new EventListener(window, Events.KEY_UP, (event) => { __classPrivateFieldGet(this, _Body_instances, "m", _Body_onKeyUp).call(this, event); }), new EventListener(window, Events.MOUSE_DOWN, (event) => { __classPrivateFieldGet(this, _Body_instances, "m", _Body_onMouseDown).call(this, event); }), new EventListener(window, Events.MOUSE_UP, (event) => { __classPrivateFieldGet(this, _Body_instances, "m", _Body_onMouseUp).call(this, event); }), new EventListener(window, Events.MOUSE_MOVE, (event) => { __classPrivateFieldGet(this, _Body_instances, "m", _Body_onMouseMove).call(this, event); }), new EventListener(this, Events.WHEEL, (event) => { __classPrivateFieldGet(this, _Body_instances, "m", _Body_onWheel).call(this, event); }, { passive: true }));
        this.append(__classPrivateFieldGet(this, _Body_canvas, "f"));
    }
    onToolSelect(toolName) {
        __classPrivateFieldSet(this, _Body_handActive, false, "f");
        __classPrivateFieldGet(this, _Body_canvas, "f").classList.toggle("hand-active", false);
        switch (toolName) {
            case Tools.TOOL_HAND: {
                __classPrivateFieldGet(this, _Body_canvas, "f").classList.toggle("hand-active", true);
                __classPrivateFieldSet(this, _Body_handActive, true, "f");
                break;
            }
        }
    }
    get width() {
        return __classPrivateFieldGet(this, _Body_canvas, "f").width;
    }
    get height() {
        return __classPrivateFieldGet(this, _Body_canvas, "f").height;
    }
}
_Body_canvas = new WeakMap(), _Body_ctx = new WeakMap(), _Body_projectConfig = new WeakMap(), _Body_handActive = new WeakMap(), _Body_moveMouseStart = new WeakMap(), _Body_ctxPosition = new WeakMap(), _Body_scrollBorders = new WeakMap(), _Body_scrollBorderSize = new WeakMap(), _Body_instances = new WeakSet(), _Body_onAddedToDOM = function _Body_onAddedToDOM() {
    __classPrivateFieldGet(this, _Body_instances, "m", _Body_onWindowResize).call(this);
    const canvasSize = __classPrivateFieldGet(this, _Body_projectConfig, "f").canvasSize;
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const width = canvasSize.width;
    const height = canvasSize.height;
    __classPrivateFieldSet(this, _Body_ctxPosition, {
        x: Math.round(centerX - (width / 2)),
        y: Math.round(centerY - (height / 2)),
        width: canvasSize.width,
        height: canvasSize.height
    }, "f");
    __classPrivateFieldSet(this, _Body_scrollBorders, {
        top: -__classPrivateFieldGet(this, _Body_ctxPosition, "f").height + __classPrivateFieldGet(this, _Body_scrollBorderSize, "f"),
        left: -__classPrivateFieldGet(this, _Body_ctxPosition, "f").width + __classPrivateFieldGet(this, _Body_scrollBorderSize, "f"),
        bottom: this.height - __classPrivateFieldGet(this, _Body_scrollBorderSize, "f"),
        right: this.width - __classPrivateFieldGet(this, _Body_scrollBorderSize, "f")
    }, "f");
    __classPrivateFieldGet(this, _Body_instances, "m", _Body_drawCtx).call(this);
}, _Body_drawCtx = function _Body_drawCtx() {
    __classPrivateFieldGet(this, _Body_ctx, "f").clearRect(0, 0, __classPrivateFieldGet(this, _Body_canvas, "f").width, __classPrivateFieldGet(this, _Body_canvas, "f").height);
    __classPrivateFieldGet(this, _Body_ctx, "f").fillStyle = "white";
    __classPrivateFieldGet(this, _Body_ctx, "f").fillRect(__classPrivateFieldGet(this, _Body_ctxPosition, "f").x, __classPrivateFieldGet(this, _Body_ctxPosition, "f").y, __classPrivateFieldGet(this, _Body_ctxPosition, "f").width, __classPrivateFieldGet(this, _Body_ctxPosition, "f").height);
}, _Body_onWindowResize = function _Body_onWindowResize(event = null) {
    __classPrivateFieldGet(this, _Body_canvas, "f").width = this.offsetWidth;
    __classPrivateFieldGet(this, _Body_canvas, "f").height = this.offsetHeight;
    __classPrivateFieldGet(this, _Body_scrollBorders, "f").bottom = this.height - __classPrivateFieldGet(this, _Body_scrollBorderSize, "f");
    __classPrivateFieldGet(this, _Body_scrollBorders, "f").right = this.width - __classPrivateFieldGet(this, _Body_scrollBorderSize, "f");
    __classPrivateFieldGet(this, _Body_instances, "m", _Body_setBorders).call(this);
    __classPrivateFieldGet(this, _Body_instances, "m", _Body_drawCtx).call(this);
}, _Body_onKeyDown = function _Body_onKeyDown(event) {
    if (event.code === "Space" && !__classPrivateFieldGet(this, _Body_handActive, "f")) {
        this.onToolSelect("hand");
    }
}, _Body_onKeyUp = function _Body_onKeyUp(event) {
    if (event.code === "Space") {
        __classPrivateFieldGet(this, _Body_canvas, "f").classList.toggle("hand-active", false);
        __classPrivateFieldSet(this, _Body_handActive, false, "f");
    }
}, _Body_onMouseDown = function _Body_onMouseDown(event) {
    if (__classPrivateFieldGet(this, _Body_handActive, "f")) {
        __classPrivateFieldSet(this, _Body_moveMouseStart, {
            x: event.clientX,
            y: event.clientY
        }, "f");
    }
}, _Body_onMouseUp = function _Body_onMouseUp(event) {
    __classPrivateFieldSet(this, _Body_moveMouseStart, null, "f");
}, _Body_onMouseMove = function _Body_onMouseMove(event) {
    if (__classPrivateFieldGet(this, _Body_handActive, "f") && __classPrivateFieldGet(this, _Body_moveMouseStart, "f")) {
        const moveX = __classPrivateFieldGet(this, _Body_moveMouseStart, "f").x - event.clientX;
        const moveY = __classPrivateFieldGet(this, _Body_moveMouseStart, "f").y - event.clientY;
        __classPrivateFieldGet(this, _Body_moveMouseStart, "f").x = event.clientX;
        __classPrivateFieldGet(this, _Body_moveMouseStart, "f").y = event.clientY;
        __classPrivateFieldGet(this, _Body_instances, "m", _Body_moveCanvas).call(this, moveX, moveY);
    }
}, _Body_onWheel = function _Body_onWheel(event) {
    __classPrivateFieldGet(this, _Body_instances, "m", _Body_moveCanvas).call(this, event.deltaX, event.deltaY);
}, _Body_moveCanvas = function _Body_moveCanvas(x = 0, y = 0) {
    const ctxPosition = __classPrivateFieldGet(this, _Body_ctxPosition, "f");
    ctxPosition.x -= x;
    ctxPosition.y -= y;
    __classPrivateFieldGet(this, _Body_instances, "m", _Body_setBorders).call(this);
    __classPrivateFieldGet(this, _Body_instances, "m", _Body_drawCtx).call(this);
}, _Body_setBorders = function _Body_setBorders() {
    const ctxPosition = __classPrivateFieldGet(this, _Body_ctxPosition, "f");
    const scrollBorders = __classPrivateFieldGet(this, _Body_scrollBorders, "f");
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
};
customElements.define("body-el", Body);
//# sourceMappingURL=Body.js.map