sap.ui.define([
    "sap/ui/core/UIComponent",
    "zcl505/deployedu/code1cl5deployedu/model/models"
], (UIComponent, models) => {
    "use strict";

    return UIComponent.extend("zcl505.deployedu.code1cl5deployedu.Component", {
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