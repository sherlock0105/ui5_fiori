sap.ui.define([
    "sap/ui/core/UIComponent",
    "code1/cl505/gw0005/code1cl5crud01/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("code1.cl505.gw0005.code1cl5crud01.Component", {
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