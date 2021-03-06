function Document() {
    this.createElement = function (type) {
        if (type === "canvas") {
            return new Canvas();
        } else if (type === "canvasvr") {
            return new CanvasVR();
        } else if (type === "img") {
            return new Image();
        } else if (type === "audio") {
            return undefined;
        } else if (type === "div") {
            return new HTMLElement();
        } else {
            throw "Type not supported by HoloJs";
        }
    };

    this.createElementNS = function (ns, type) {
        return this.createElement(type);
    };

    this.addEventListener = function (eventType, eventHandler) {
        // Let the window element manage events for the document
        navigator.holojs.nativeInterface.eventRegistration.addEventListener(window.native, eventType, eventHandler.bind(this));
    };

    this.removeEventListener = function (eventType, eventHandler) {
        // Let the window element manage events for the document
        navigator.holojs.nativeInterface.eventRegistration.removeEventListener(window.native, eventType, eventHandler.bind(this));
    };
}

function HTMLElement() {
    this.onwheel = function () { throw "not implemented"; };
}

var document = new Document();

function Blob(parts, options) {
    return navigator.holojs.nativeInterface.blob.create(parts, options);
}