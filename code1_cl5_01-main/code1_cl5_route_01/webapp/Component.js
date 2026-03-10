sap.ui.define([
    "sap/ui/core/UIComponent",
    "coed1/cl5/route01/code1cl5route01/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("coed1.cl5.route01.code1cl5route01.Component", {
        metadata: {
            manifest: "json",
            interfaces: [
                "sap.ui.core.IAsyncContentCreation"
            ]
        },

        init() {
            // call the base component's init function
            UIComponent.prototype.init.apply(this, arguments);

            // set the device model
            this.setModel(models.createDeviceModel(), "device");

            // enable routing
            this.getRouter().initialize();
        }
    });
});