sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code1.cl5.vizchart01.code1cl5vizchart01.controller.VizChartView", {
        onInit() {
            let oModel = new JSONModel("/data/val.json");
            
            this.getView().setModel(oModel);
        },
    });
});