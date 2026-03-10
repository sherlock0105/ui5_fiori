sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("code1.cl5.searchfield01.code1cl5searchfield01.controller.SearchView", {
        onInit() {
            let oModel1 = new JSONModel("/val.json");
            this.getView().setModel(oModel1);

        onSearch: function()
        {
            var vCarrid = this.getView().byId("carrid").getValue("query"), //검색어 받기
                vCurrency = this.getView().byId("currency").getValue("query");

            let oBinding = this.getView().byId("airLineList").getBinding("rows"),
                oFilter = null,
                aFilter = [];


            if (vCarrid != "")
            {
                oFilter = new Filter("Carrid", FilterOperator.EQ, vCarrid);
                aFilter.push(oFilter);

            }

            if (vCurrency != "")
            {
                oFilter = new Filter("Currency", FilterOperator.EQ, vCurrency);
                aFilter.push(oFilter);
            }

            if (aFilter.length > 0)
            {
                oBinding.filter(aFilter);
            }
            else
                oBinding.filter();


            // console.log(oEvent.getParameter("query"));
            // console.log(oEvent.getParameters().query);
        },
            //문제
                // 통화키 입력 필드(서치필드) 만들 것
                // 통화키 입력조건을 Filter에 추가할 것

    });
});