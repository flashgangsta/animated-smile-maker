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
var ___App_instances, ___App_currentFrame, ___App_framerate, ___App_maxFrames, ___App_drawInterval, ___App_drawIntervalTimeout, ___App_saveIntervalTimeout, ___App_sizePreview, ___App_sizeBig, ___App_sizeMid, ___App_sizeSmall, ___App_canvas, ___App_canvasBig, ___App_canvasMid, ___App_canvasSmall, ___App_context, ___App_contextBig, ___App_contextMid, ___App_contextSmall, ___App_body, ___App_meBitmap, ___App_imagePaths, ___App_handBitmap, ___App_tweenList, ___App_buttonSave, ___App_buttonPlay, ___App_buttonPause, ___App_buttonStop, ___App_isSaveToggle, ___App_saveConfig, ___App_loadImages, ___App_onImagesLoaded, ___App_updatePreviews, ___App_createTweenList, ___App_prepareElements, ___App_play, ___App_stop, ___App_pause, ___App_tick, ___App_draw, ___App_isSameElExistsAfter, ___App_onAnimationsComplete, ___App_onButtonSaveClick, ___App_savePictures;
import { Bitmap } from "./display/Bitmap.js";
import { Tween } from "./transitions/Tween.js";
import { Easing } from "./transitions/Easing.js";
import { Events } from "./app/Events.js";
export class __App {
    constructor() {
        ___App_instances.add(this);
        ___App_currentFrame.set(this, 0);
        ___App_framerate.set(this, 60);
        ___App_maxFrames.set(this, 60);
        ___App_drawInterval.set(this, null);
        ___App_drawIntervalTimeout.set(this, 1000 / __classPrivateFieldGet(this, ___App_framerate, "f"));
        ___App_saveIntervalTimeout.set(this, 1000);
        ___App_sizePreview.set(this, 600);
        ___App_sizeBig.set(this, 112);
        ___App_sizeMid.set(this, 56);
        ___App_sizeSmall.set(this, 28);
        ___App_canvas.set(this, document.createElement("canvas"));
        ___App_canvasBig.set(this, document.createElement("canvas"));
        ___App_canvasMid.set(this, document.createElement("canvas"));
        ___App_canvasSmall.set(this, document.createElement("canvas"));
        ___App_context.set(this, __classPrivateFieldGet(this, ___App_canvas, "f").getContext("2d"));
        ___App_contextBig.set(this, __classPrivateFieldGet(this, ___App_canvasBig, "f").getContext("2d"));
        ___App_contextMid.set(this, __classPrivateFieldGet(this, ___App_canvasMid, "f").getContext("2d"));
        ___App_contextSmall.set(this, __classPrivateFieldGet(this, ___App_canvasSmall, "f").getContext("2d"));
        ___App_body.set(this, document.body);
        ___App_meBitmap.set(this, void 0);
        ___App_imagePaths.set(this, ["me.png", "hand.png"]);
        ___App_handBitmap.set(this, void 0);
        ___App_tweenList.set(this, []);
        ___App_buttonSave.set(this, null);
        ___App_buttonPlay.set(this, null);
        ___App_buttonPause.set(this, null);
        ___App_buttonStop.set(this, null);
        ___App_isSaveToggle.set(this, false);
        ___App_saveConfig.set(this, [
            { name: "preview", canvas: __classPrivateFieldGet(this, ___App_canvas, "f") },
            { name: "big", canvas: __classPrivateFieldGet(this, ___App_canvasBig, "f") },
            { name: "mid", canvas: __classPrivateFieldGet(this, ___App_canvasMid, "f") },
            { name: "small", canvas: __classPrivateFieldGet(this, ___App_canvasSmall, "f") },
        ]);
        Tween.init(__classPrivateFieldGet(this, ___App_framerate, "f"));
        __classPrivateFieldGet(this, ___App_canvas, "f").width = __classPrivateFieldGet(this, ___App_canvas, "f").height = __classPrivateFieldGet(this, ___App_sizePreview, "f");
        __classPrivateFieldGet(this, ___App_canvasBig, "f").width = __classPrivateFieldGet(this, ___App_canvasBig, "f").height = __classPrivateFieldGet(this, ___App_sizeBig, "f");
        __classPrivateFieldGet(this, ___App_canvasMid, "f").width = __classPrivateFieldGet(this, ___App_canvasMid, "f").height = __classPrivateFieldGet(this, ___App_sizeMid, "f");
        __classPrivateFieldGet(this, ___App_canvasSmall, "f").width = __classPrivateFieldGet(this, ___App_canvasSmall, "f").height = __classPrivateFieldGet(this, ___App_sizeSmall, "f");
        __classPrivateFieldGet(this, ___App_body, "f").append(__classPrivateFieldGet(this, ___App_canvas, "f"));
        __classPrivateFieldGet(this, ___App_body, "f").append(__classPrivateFieldGet(this, ___App_canvasBig, "f"));
        __classPrivateFieldGet(this, ___App_body, "f").append(__classPrivateFieldGet(this, ___App_canvasMid, "f"));
        __classPrivateFieldGet(this, ___App_body, "f").append(__classPrivateFieldGet(this, ___App_canvasSmall, "f"));
        __classPrivateFieldGet(this, ___App_context, "f").fillStyle = "transparent";
        __classPrivateFieldGet(this, ___App_contextBig, "f").fillStyle = "transparent";
        __classPrivateFieldGet(this, ___App_contextMid, "f").fillStyle = "transparent";
        __classPrivateFieldGet(this, ___App_contextSmall, "f").fillStyle = "transparent";
        __classPrivateFieldGet(this, ___App_context, "f").imageSmoothingEnabled = true;
        __classPrivateFieldGet(this, ___App_context, "f").imageSmoothingQuality = "high";
        __classPrivateFieldGet(this, ___App_contextBig, "f").imageSmoothingEnabled = true;
        __classPrivateFieldGet(this, ___App_contextBig, "f").imageSmoothingQuality = "high";
        __classPrivateFieldGet(this, ___App_contextMid, "f").imageSmoothingEnabled = true;
        __classPrivateFieldGet(this, ___App_contextMid, "f").imageSmoothingQuality = "high";
        __classPrivateFieldGet(this, ___App_contextSmall, "f").imageSmoothingEnabled = true;
        __classPrivateFieldGet(this, ___App_contextSmall, "f").imageSmoothingQuality = "high";
        __classPrivateFieldGet(this, ___App_context, "f").save();
        __classPrivateFieldGet(this, ___App_contextBig, "f").save();
        __classPrivateFieldGet(this, ___App_contextMid, "f").save();
        __classPrivateFieldGet(this, ___App_contextSmall, "f").save();
        __classPrivateFieldGet(this, ___App_context, "f").fillRect(0, 0, __classPrivateFieldGet(this, ___App_sizePreview, "f"), __classPrivateFieldGet(this, ___App_sizePreview, "f"));
        __classPrivateFieldGet(this, ___App_instances, "m", ___App_updatePreviews).call(this);
        __classPrivateFieldGet(this, ___App_instances, "m", ___App_loadImages).call(this);
        __classPrivateFieldSet(this, ___App_buttonSave, __classPrivateFieldGet(this, ___App_body, "f").querySelector("#button_save"), "f");
        __classPrivateFieldSet(this, ___App_buttonPlay, __classPrivateFieldGet(this, ___App_body, "f").querySelector("#button_play"), "f");
        __classPrivateFieldSet(this, ___App_buttonPause, __classPrivateFieldGet(this, ___App_body, "f").querySelector("#button_pause"), "f");
        __classPrivateFieldSet(this, ___App_buttonStop, __classPrivateFieldGet(this, ___App_body, "f").querySelector("#button_stop"), "f");
        __classPrivateFieldGet(this, ___App_buttonSave, "f").addEventListener(Events.CLICK, (event) => __classPrivateFieldGet(this, ___App_instances, "m", ___App_onButtonSaveClick).call(this, event));
        __classPrivateFieldGet(this, ___App_buttonPlay, "f").addEventListener(Events.CLICK, (event) => __classPrivateFieldGet(this, ___App_instances, "m", ___App_play).call(this));
        __classPrivateFieldGet(this, ___App_buttonPause, "f").addEventListener(Events.CLICK, (event) => __classPrivateFieldGet(this, ___App_instances, "m", ___App_pause).call(this));
        __classPrivateFieldGet(this, ___App_buttonStop, "f").addEventListener(Events.CLICK, (event) => __classPrivateFieldGet(this, ___App_instances, "m", ___App_stop).call(this));
        document.addEventListener(Events.KEY_DOWN, (event) => {
            if (__classPrivateFieldGet(this, ___App_isSaveToggle, "f")) {
                return;
            }
            switch (event.key) {
                case ".":
                    __classPrivateFieldGet(this, ___App_instances, "m", ___App_tick).call(this);
                    break;
                case ",":
                    if (__classPrivateFieldGet(this, ___App_currentFrame, "f") > 1) {
                        __classPrivateFieldSet(this, ___App_currentFrame, __classPrivateFieldGet(this, ___App_currentFrame, "f") - 2, "f");
                        __classPrivateFieldGet(this, ___App_instances, "m", ___App_tick).call(this);
                    }
                    break;
            }
        });
    }
}
___App_currentFrame = new WeakMap(), ___App_framerate = new WeakMap(), ___App_maxFrames = new WeakMap(), ___App_drawInterval = new WeakMap(), ___App_drawIntervalTimeout = new WeakMap(), ___App_saveIntervalTimeout = new WeakMap(), ___App_sizePreview = new WeakMap(), ___App_sizeBig = new WeakMap(), ___App_sizeMid = new WeakMap(), ___App_sizeSmall = new WeakMap(), ___App_canvas = new WeakMap(), ___App_canvasBig = new WeakMap(), ___App_canvasMid = new WeakMap(), ___App_canvasSmall = new WeakMap(), ___App_context = new WeakMap(), ___App_contextBig = new WeakMap(), ___App_contextMid = new WeakMap(), ___App_contextSmall = new WeakMap(), ___App_body = new WeakMap(), ___App_meBitmap = new WeakMap(), ___App_imagePaths = new WeakMap(), ___App_handBitmap = new WeakMap(), ___App_tweenList = new WeakMap(), ___App_buttonSave = new WeakMap(), ___App_buttonPlay = new WeakMap(), ___App_buttonPause = new WeakMap(), ___App_buttonStop = new WeakMap(), ___App_isSaveToggle = new WeakMap(), ___App_saveConfig = new WeakMap(), ___App_instances = new WeakSet(), ___App_loadImages = function ___App_loadImages() {
    const bitmapsListByName = {};
    const total = __classPrivateFieldGet(this, ___App_imagePaths, "f").length;
    let loaded = 0;
    __classPrivateFieldGet(this, ___App_imagePaths, "f").forEach((path) => {
        const img = new Image();
        img.onload = (event) => {
            const bitmap = new Bitmap(event.target);
            bitmap.name = path.substring(0, path.indexOf("."));
            bitmapsListByName[bitmap.name] = bitmap;
            if (++loaded === total) {
                __classPrivateFieldSet(this, ___App_meBitmap, bitmapsListByName["me"], "f");
                __classPrivateFieldSet(this, ___App_handBitmap, bitmapsListByName["hand"], "f");
                __classPrivateFieldGet(this, ___App_instances, "m", ___App_onImagesLoaded).call(this);
            }
        };
        img.src = path;
    });
}, ___App_onImagesLoaded = function ___App_onImagesLoaded(event) {
    __classPrivateFieldGet(this, ___App_instances, "m", ___App_prepareElements).call(this);
    __classPrivateFieldGet(this, ___App_instances, "m", ___App_createTweenList).call(this);
    __classPrivateFieldGet(this, ___App_instances, "m", ___App_tick).call(this);
}, ___App_updatePreviews = function ___App_updatePreviews() {
    __classPrivateFieldGet(this, ___App_contextBig, "f").clearRect(0, 0, __classPrivateFieldGet(this, ___App_sizePreview, "f"), __classPrivateFieldGet(this, ___App_sizePreview, "f"));
    __classPrivateFieldGet(this, ___App_contextMid, "f").clearRect(0, 0, __classPrivateFieldGet(this, ___App_sizePreview, "f"), __classPrivateFieldGet(this, ___App_sizePreview, "f"));
    __classPrivateFieldGet(this, ___App_contextSmall, "f").clearRect(0, 0, __classPrivateFieldGet(this, ___App_sizePreview, "f"), __classPrivateFieldGet(this, ___App_sizePreview, "f"));
    __classPrivateFieldGet(this, ___App_contextBig, "f").drawImage(__classPrivateFieldGet(this, ___App_canvas, "f"), 0, 0, __classPrivateFieldGet(this, ___App_sizePreview, "f"), __classPrivateFieldGet(this, ___App_sizePreview, "f"), 0, 0, __classPrivateFieldGet(this, ___App_sizeBig, "f"), __classPrivateFieldGet(this, ___App_sizeBig, "f"));
    __classPrivateFieldGet(this, ___App_contextMid, "f").drawImage(__classPrivateFieldGet(this, ___App_canvas, "f"), 0, 0, __classPrivateFieldGet(this, ___App_sizePreview, "f"), __classPrivateFieldGet(this, ___App_sizePreview, "f"), 0, 0, __classPrivateFieldGet(this, ___App_sizeMid, "f"), __classPrivateFieldGet(this, ___App_sizeMid, "f"));
    __classPrivateFieldGet(this, ___App_contextSmall, "f").drawImage(__classPrivateFieldGet(this, ___App_canvas, "f"), 0, 0, __classPrivateFieldGet(this, ___App_sizePreview, "f"), __classPrivateFieldGet(this, ___App_sizePreview, "f"), 0, 0, __classPrivateFieldGet(this, ___App_sizeSmall, "f"), __classPrivateFieldGet(this, ___App_sizeSmall, "f"));
}, ___App_createTweenList = function ___App_createTweenList() {
    __classPrivateFieldGet(this, ___App_tweenList, "f").push(new Tween(__classPrivateFieldGet(this, ___App_meBitmap, "f"), { y: 0 }, Easing.OUT_BACK, 300), new Tween(__classPrivateFieldGet(this, ___App_meBitmap, "f"), { y: __classPrivateFieldGet(this, ___App_sizePreview, "f") }, Easing.IN_BACK, 300, 650), new Tween(__classPrivateFieldGet(this, ___App_handBitmap, "f"), { x: 170, y: 90, rotation: 45 }, Easing.OUT_CIRC, 250), new Tween(__classPrivateFieldGet(this, ___App_handBitmap, "f"), { x: 0, rotation: 0 }, Easing.IN_OUT_CIRC, 200, 250), new Tween(__classPrivateFieldGet(this, ___App_handBitmap, "f"), { x: 170, rotation: 45 }, Easing.IN_OUT_CIRC, 200, 450), new Tween(__classPrivateFieldGet(this, ___App_handBitmap, "f"), { x: -450, y: __classPrivateFieldGet(this, ___App_sizePreview, "f") / 2, rotation: 0 }, Easing.IN_CIRC, 200, 650));
}, ___App_prepareElements = function ___App_prepareElements() {
    __classPrivateFieldGet(this, ___App_meBitmap, "f").x = -75;
    __classPrivateFieldGet(this, ___App_meBitmap, "f").y = __classPrivateFieldGet(this, ___App_sizePreview, "f");
    __classPrivateFieldGet(this, ___App_handBitmap, "f").x = -450;
    __classPrivateFieldGet(this, ___App_handBitmap, "f").y = __classPrivateFieldGet(this, ___App_sizePreview, "f") / 2;
    __classPrivateFieldGet(this, ___App_meBitmap, "f").rotation = 0;
    __classPrivateFieldGet(this, ___App_handBitmap, "f").rotation = 0;
}, ___App_play = function ___App_play() {
    if (!__classPrivateFieldGet(this, ___App_drawInterval, "f")) {
        const timeout = __classPrivateFieldGet(this, ___App_isSaveToggle, "f") ? __classPrivateFieldGet(this, ___App_saveIntervalTimeout, "f") : __classPrivateFieldGet(this, ___App_drawIntervalTimeout, "f");
        __classPrivateFieldSet(this, ___App_drawInterval, setInterval(() => __classPrivateFieldGet(this, ___App_instances, "m", ___App_tick).call(this), timeout), "f");
    }
    __classPrivateFieldGet(this, ___App_buttonPlay, "f").disabled = true;
    __classPrivateFieldGet(this, ___App_buttonStop, "f").disabled = false;
    __classPrivateFieldGet(this, ___App_buttonPause, "f").disabled = false;
}, ___App_stop = function ___App_stop() {
    __classPrivateFieldSet(this, ___App_isSaveToggle, false, "f");
    __classPrivateFieldGet(this, ___App_instances, "m", ___App_pause).call(this);
    __classPrivateFieldSet(this, ___App_currentFrame, 0, "f");
    __classPrivateFieldGet(this, ___App_tweenList, "f").forEach((tween) => tween.reset());
    __classPrivateFieldGet(this, ___App_instances, "m", ___App_prepareElements).call(this);
    __classPrivateFieldGet(this, ___App_instances, "m", ___App_tick).call(this);
    __classPrivateFieldGet(this, ___App_buttonSave, "f").disabled = false;
    __classPrivateFieldGet(this, ___App_buttonStop, "f").disabled = true;
    __classPrivateFieldGet(this, ___App_buttonPause, "f").disabled = true;
    __classPrivateFieldGet(this, ___App_buttonPlay, "f").disabled = false;
}, ___App_pause = function ___App_pause() {
    clearInterval(__classPrivateFieldGet(this, ___App_drawInterval, "f"));
    __classPrivateFieldSet(this, ___App_drawInterval, null, "f");
    __classPrivateFieldGet(this, ___App_buttonPause, "f").disabled = true;
    __classPrivateFieldGet(this, ___App_buttonPlay, "f").disabled = false;
}, ___App_tick = function ___App_tick() {
    var _a;
    if (__classPrivateFieldGet(this, ___App_isSaveToggle, "f")) {
        __classPrivateFieldGet(this, ___App_instances, "m", ___App_savePictures).call(this);
    }
    __classPrivateFieldSet(this, ___App_currentFrame, (_a = __classPrivateFieldGet(this, ___App_currentFrame, "f"), _a++, _a), "f");
    __classPrivateFieldGet(this, ___App_instances, "m", ___App_draw).call(this);
}, ___App_draw = function ___App_draw() {
    console.log(`draw frame #${__classPrivateFieldGet(this, ___App_currentFrame, "f")}`);
    const tweenList = __classPrivateFieldGet(this, ___App_tweenList, "f");
    const context = __classPrivateFieldGet(this, ___App_context, "f");
    let completedCount = 0;
    context.clearRect(0, 0, __classPrivateFieldGet(this, ___App_sizePreview, "f"), __classPrivateFieldGet(this, ___App_sizePreview, "f"));
    const currentFrame = __classPrivateFieldGet(this, ___App_currentFrame, "f");
    for (let i = 0, len = tweenList.length; i < len; i++) {
        const tween = tweenList[i];
        const el = tween.el;
        tween.goToFrame(currentFrame);
        if (tween.isComplete)
            completedCount++;
        if (__classPrivateFieldGet(this, ___App_instances, "m", ___App_isSameElExistsAfter).call(this, i, len, el)) {
            continue;
        }
        const image = tween.el.image;
        context.save();
        const cX = el.width / 2;
        const cY = el.height / 2;
        context.translate(el.x + cX, el.y + cY);
        context.rotate(el.rotation * Math.PI / 180);
        context.translate(-el.x - cX, -el.y - cY);
        context.drawImage(image, el.x, el.y);
        context.restore();
    }
    __classPrivateFieldGet(this, ___App_instances, "m", ___App_updatePreviews).call(this);
    if (currentFrame === __classPrivateFieldGet(this, ___App_maxFrames, "f") || completedCount === tweenList.length) {
        __classPrivateFieldGet(this, ___App_instances, "m", ___App_onAnimationsComplete).call(this);
    }
}, ___App_isSameElExistsAfter = function ___App_isSameElExistsAfter(i, len, el) {
    const tweenList = __classPrivateFieldGet(this, ___App_tweenList, "f");
    if (i < len - 1) {
        for (let k = i + 1; k < len; k++) {
            const nextTween = tweenList[k];
            if (nextTween.el === el) {
                return true;
            }
        }
    }
    return false;
}, ___App_onAnimationsComplete = function ___App_onAnimationsComplete() {
    __classPrivateFieldGet(this, ___App_instances, "m", ___App_stop).call(this);
}, ___App_onButtonSaveClick = function ___App_onButtonSaveClick(event) {
    __classPrivateFieldGet(this, ___App_instances, "m", ___App_stop).call(this);
    __classPrivateFieldSet(this, ___App_isSaveToggle, true, "f");
    __classPrivateFieldGet(this, ___App_instances, "m", ___App_play).call(this);
    __classPrivateFieldGet(this, ___App_buttonSave, "f").disabled = true;
    __classPrivateFieldGet(this, ___App_buttonPlay, "f").disabled = true;
    __classPrivateFieldGet(this, ___App_buttonPause, "f").disabled = true;
    __classPrivateFieldGet(this, ___App_buttonStop, "f").disabled = true;
}, ___App_savePictures = function ___App_savePictures() {
    const link = document.createElement("a");
    __classPrivateFieldGet(this, ___App_saveConfig, "f").forEach((el) => {
        const canvas = el.canvas;
        const name = el.name;
        link.download = `${name}_frame_${__classPrivateFieldGet(this, ___App_currentFrame, "f")}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
    link.remove();
};
new __App();
//# sourceMappingURL=__App.js.map