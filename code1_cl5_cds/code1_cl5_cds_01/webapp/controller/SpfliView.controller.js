sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend(
    "code1.cl5.cds01.code1cl5cds01.controller.SpfliView",
    {
      onInit() {
        let oModel = new sap.ui.model.odata.v2.ODataModel(
          "/sap/opu/odata/sap/ZC505CDS0020_CDS/",
        );

        this.getView().setModel(oModel, "Scarr");
      },
    },
  );
});
