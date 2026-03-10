sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend(
      "code1.cl5.gw02.code1cl5gw02.controller.SbookView",
      {
        onInit() {},
        onSearch: function () {
          var vCarrid = this.getView().byId("carrid").getValue("query");

          let oBinding = this.getView().byId("airLineList").getBinding("rows"),
            oFilter = null,
            aFilter = [];

          if (vCarrid != "") {
            oFilter = new Filter("Carrid", FilterOperator.EQ, vCarrid);
            aFilter.push(oFilter);
          }

          if (aFilter.length > 0) {
            oBinding.filter(aFilter);
          } else oBinding.filter();

          // console.log(oEvent.getParameter("query"));
          // console.log(oEvent.getParameters().query);
        },
      },
    );
  },
);
