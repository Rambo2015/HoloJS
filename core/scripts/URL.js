function URLImplementation() {
    this.urlObjectIndex = 0;
    this.createObjectURL = function (blob) {
        let key = "blob:" + URL.urlObjectIndex++;
        URL.objects.push({ data: blob, key: key });
        return key;
    };

    this.revokeObjectURL = function (url) {
        for (var index = 0; index < URL.objects.length; index++) {
            if (url === URL.objects[index].key) {
                URL.objects.splice(index, 1);
                break;
            }
        }
    };

    this.objects = [];
}

var URL = new URLImplementation();
window.URL = URL;