sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend(
    "code1.cl5.param.route01.code1cl5paramroute01.controller.MainView",
    {
      onInit() {},

      onSearch: function () {
        let vCarrid = this.getView().byId("airLine").getValue(),
          vConnid = this.getView().byId("connNo").getValue();
        // vAirpto = this.getView().byId('destination').getValue();

        this.getRouter().navTo("GridView", {
          Carrid: vCarrid,
          Connid: vConnid,
        });
      },

      getRouter: function () {
        return sap.ui.core.UIComponent.getRouterFor(this);
      },
      // return이 있다는 것
      // getRouter가 sap.ui.core.UIComponent.getRouterFor(this);를 대신한다는 것(변수처럼)
      //onSearch에서 this.getRouter().navTo('GridView')는
      // sap.ui.core.UIComponent.getRouterFor(this).navTo('GridView')와 동일함
    },
  );
});
