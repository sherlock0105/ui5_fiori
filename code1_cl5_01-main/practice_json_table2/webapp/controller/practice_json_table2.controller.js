sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("practicejsontable2.practicejsontable2.controller.practice_json_table2", {
        onInit() {
            let oData1 = {
                    carSet:[
                                {Car: 33,  Label: "그랜져"},  
                                {Car: 12,  Label: "소나타"},
                                {Car: 55,  Label: "제네시스"}
                             ]                                         
                          
            },
                oModel1 = new JSONModel(oData1),
                oModel2 = new JSONModel("/Data/Month.json");

                this.getView().setModel(oModel1);
                this.getView().setModel(oModel2, "Month");
        }
    });
});