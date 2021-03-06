function HTMLCanvasElement() {}

function Canvas() {
    this.context2D = new navigator.holojs.nativeInterface.makeRenderingContext();

    this.getContext = function (contextType) {
        if (contextType === '2d') {
            return this.context2D;
        } else {
            throw "only 2d is supported";
        }
    };

    Object.defineProperty(this, 'width', {
        get: function () {
            return navigator.holojs.nativeInterface.canvas2d.getWidth(this.context2D.ctxNative);
        },
        set: function (value) {
            navigator.holojs.nativeInterface.canvas2d.setWidth(this.context2D.ctxNative, value);
        }
    });

    Object.defineProperty(this, 'height', {
        get: function () {
            return navigator.holojs.nativeInterface.canvas2d.getHeight(this.context2D.ctxNative);
        },
        set: function (value) {
            navigator.holojs.nativeInterface.canvas2d.setHeight(this.context2D.ctxNative, value);
        }
    });

    this.toDataURL = function (type, encoderOptions) {
        return navigator.holojs.nativeInterface.canvas2d.toDataURL(this.context2D.ctxNative, type, encoderOptions);
    };
}

Canvas.prototype = new HTMLCanvasElement();