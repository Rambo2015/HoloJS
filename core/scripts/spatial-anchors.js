function SpatialAnchor(options) {
    if (typeof options === "undefined") {
        navigator.holojs.nativeInterface.SpatialAnchors.createAnchor(this, {});
        this.isPersisted = false;
    } else if (typeof options.native !== "undefined") {
        this.native = options.native;
        this.name = options.name;
        this.isPersisted = true;
    } else {
        navigator.holojs.nativeInterface.SpatialAnchors.createAnchor(this, options);
        this.isPersisted = false;
    }

    if (typeof this.native === 'undefined') {
        throw "cannot create speech recognizer";
    }

    this.tryGetTransformTo = function (other) {
        return navigator.holojs.nativeInterface.SpatialAnchors.tryGetTransformTo(this.native, other);
    };
}

function SpatialAnchorStore() {

    navigator.holojs.nativeInterface.SpatialAnchors.createStore(this);
    if (typeof this.native === "undefined") {
        throw "cannot create spatial anchor store";
    }

    this.initialize = function () {
        navigator.holojs.nativeInterface.SpatialAnchors.initializeStore(this.native);
    };

    this.enumerate = function () {
        let scriptAnchors = [];
        let nativeAnchors = navigator.holojs.nativeInterface.SpatialAnchors.enumerateAnchors(this.native);
        for (let i = 0; i < nativeAnchors.length; i++) {
            scriptAnchors.push(new SpatialAnchor({ native: nativeAnchors[i].anchor, name: nativeAnchors[i].name }));
        }

        return scriptAnchors;
    };

    this.open = function (name) {
        let nativeAnchor = navigator.holojs.nativeInterface.SpatialAnchors.openAnchor(this.native, name);
        if (typeof nativeAnchor !== "undefined") {
            return new SpatialAnchor({ native: nativeAnchor, name: name });
        } else {
            return null;
        }
    };

    this.save = function (anchor, name) {
        if (navigator.holojs.nativeInterface.SpatialAnchors.saveAnchor(this.native, anchor.native, name) === true) {
            anchor.name = name;
            anchor.isPersisted = true;
        }
    };

    this.delete = function (anchorOrName) {
        if (navigator.holojs.nativeInterface.SpatialAnchors.deleteAnchor(this.native, anchorOrName)) {
            if (typeof anchorOrName !== "string") {
                anchorOrName.isPersisted = false;
                anchorOrName.name = null;
            }
        }
    };

    this.addEventListener = function (eventType, eventHandler) {
        navigator.holojs.nativeInterface.eventRegistration.addEventListener(this.native, eventType, eventHandler.bind(this));
    };

    this.removeEventListener = function (eventType, eventHandler) {
        navigator.holojs.nativeInterface.eventRegistration.removeEventListener(this.native, eventType, eventHandler.bind(this));
    };

    Object.defineProperty(this, 'oninitialized', {
        get: function () {
            return this.oninitializedEvent;
        },
        set: function (value) {
            if (this.oninitializedEvent) {
                this.removeEventListener('initialized', this.oninitializedEvent);
            }

            if (value) {
                this.addEventListener('initialized', value);
            }

            this.oninitializedEvent = value;
        }
    });

    Object.defineProperty(this, 'onerror', {
        get: function () {
            return this.onerrorEvent;
        },
        set: function (value) {
            if (this.onerrorEvent) {
                this.removeEventListener('error', this.onerrorEvent);
            }

            if (value) {
                this.addEventListener('error', value);
            }

            this.onerrorEvent = value;
        }
    });
}

SpatialAnchorStore.isAvailable = function () {
    return navigator.holojs.nativeInterface.SpatialAnchors.canPersist();
};

SpatialAnchor.areAvailable = function () {
    return navigator.holojs.nativeInterface.SpatialAnchors.areAvailable();
}