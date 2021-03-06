function VRDisplay() {
    this.displayName = "Synthetic VR display";
    this.isPresenting = false;

    Object.defineProperty(this, 'depthNear',
        {
            get: function () {
                return navigator.holojs.nativeInterface.xrNearFar[0];
            },
            set: function (value) {
                navigator.holojs.nativeInterface.xrNearFar[0] = value;
            }
        });

    Object.defineProperty(this, 'depthFar',
        {
            get: function () {
                return navigator.holojs.nativeInterface.xrNearFar[1];
            },
            set: function (value) {
                navigator.holojs.nativeInterface.xrNearFar[1] = value;
            }
        });


    this.getFrameData = function (frameData) {
        frameData.timestamp++;
    };

    this.getLayers = function () { 
        return [new VRLayerInit()];
    };

    this.submitFrame = function () {

    };

    this.requestAnimationFrame = function (callback) {
        window.requestAnimationFrame(callback);
    };

    this.requestPresent = function (layers) {
        if (navigator.holojs.nativeInterface.window.requestPresent(this) === true) {
            let promise = new Promise((resolve, reject) => {
                setTimeout(function () {
                    resolve();
                }, 250);
            });
            return promise;
        } else {
            return Promise.reject();
        }
    };

    this.exisPresent = function () {
        // cannot exit present in HoloJs
        return Promise.reject();
    };

    this.getEyeParameters = function () {
        return new VREyeParameters();
    };
}

function VREyeParameters() {
    this.renderWidth = window.innerWidth;
    this.renderHeight = window.innerHeight;
}

function VRPose() {
    this.orientation = navigator.holojs.nativeInterface.xrOrientation;
    this.position = navigator.holojs.nativeInterface.xrPosition;
}

function VRFrameData() {
    this.timestamp = 0;

    this.leftProjectionMatrix = navigator.holojs.nativeInterface.xrLeftProjection;
    this.rightProjectionMatrix = navigator.holojs.nativeInterface.xrRightProjection;

    this.leftViewMatrix = navigator.holojs.nativeInterface.xrLeftView;
    this.rightViewMatrix = navigator.holojs.nativeInterface.xrRightView;

    this.pose = new VRPose();
}

window.VRFrameData = VRFrameData;

function VRLayerInit() {
    this.leftBounds = [0.0, 0.0, 0.5, 1.0];
    this.rightBounds = [0.5, 0.0, 0.5, 1.0];
}