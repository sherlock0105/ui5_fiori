sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
  ],  
  (Controller, FilterOperator, Filter) => {
    "use strict";

    return Controller.extend(
      "code1.cl505.gw0008.code1cl5split02.controller.SplitView02",
      {
        onInit() {},

        onBseg: function (oEvent) {
          const oView = this.getView();

          let oData = oEvent.getParameter("rowBindingContext").getObject();
          let oBinding = oView.byId("Bseg").getBinding("rows");
          let aFilter = [];
          // var vBelnr = String(변경할 숫자).padStart(채워서 만들 자리수, 채울 숫자);
          var vBelnr = String(oData.Belnr).padStart(10, "0");

          aFilter.push(new Filter("Bukrs", FilterOperator.EQ, oData.Bukrs));
          aFilter.push(new Filter("Belnr", FilterOperator.EQ, vBelnr));
          aFilter.push(new Filter("Gjahr", FilterOperator.EQ, oData.Gjahr));

          //   oView.byId("Bseg").getBinding("rows").filter(null);
          oBinding.filter(aFilter);
        },
      },
    );
  },
);