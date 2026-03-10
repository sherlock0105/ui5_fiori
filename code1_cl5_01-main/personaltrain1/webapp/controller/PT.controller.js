sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], (Controller, JSONModel, ResourceModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("code1.cl5.edu.pt.personaltrain1.controller.PT", {
        onInit() {

            let oModel = new JSONModel("/data/coffee.json");

            this.getView().setModel(oModel, "coffee");
            
            let oRModel = new ResourceModel({bundleName: "code1.cl5.edu.pt.personaltrain1.data.menu"});
            this.getView().setModel(oRModel, "menu");
        },

        scope: function(){
            let cafen = this.getView().byId('cafen').getValue("query"),
                money = this.getView().byId('money').getValue("query"),
                oBinding = this.getView().byId('cafe_menu').getBinding('rows'),
                oFilter = null,
                aFilter = [];

            if (cafen != ""){
                oFilter = new Filter('Label', FilterOperator.EQ, cafen);
                aFilter.push(oFilter);
            }
            if (money != ""){
                oFilter = new Filter('Sales', FilterOperator.EQ, money);
                aFilter.push(oFilter);
            }
            if (aFilter.length > 0)
            {
                oBinding.filter(aFilter);
            }
            else
                oBinding.filter();
            


        }


    });
});