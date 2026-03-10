sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend(
      "code1.cl5.param.route01.code1cl5paramroute01.controller.GridView",
      {
        onInit() {
          this.getRouter()
            .getRoute("GridView")
            .attachPatternMatched(this.onSearch.bind(this), this);
          //onSearch
        },
        onSearch: function (oEvent) {
          var vCarrid = oEvent.getParameter("arguments").Carrid,
            vConnid = oEvent.getParameter("arguments").Connid;
          // vAirpto = oEvent.getParameter("arguments").Airpto;
          let oBinding = this.getView().byId("gridSchedule").getBinding("rows"),
            aFilter = [];

          if (vCarrid) {
            aFilter.push(new Filter("Carrid", FilterOperator.EQ, vCarrid));
          }
          if (vConnid) {
            aFilter.push(new Filter("Connid", FilterOperator.EQ, vConnid));
          }
          // if(vAirpto){
          // aFilter.push(new Filter('Airpto', FilterOperator.EQ, vAirpto));
          // }

          // aFilter.push (new Filter({
          //     path: 'Connid',
          //     operator: FilterOperator.EQ,
          //     value1: vConnid
          // }));
          // }
          oBinding.filter(aFilter);
        },

        onMain: function () {
          this.getRouter().navTo("RouteMainView");
        },

        getRouter: function () {
          return sap.ui.core.UIComponent.getRouterFor(this);
        },
      },
    );
  },
);
