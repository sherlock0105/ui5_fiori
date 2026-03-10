sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("code1.cl5.edu.pou1flightinfo.controller.POU", {
        onInit() {
            let oFlightprice = new JSONModel("/data/price.json");
            this.getView().setModel(oFlightprice, "price");

        },



    });
});