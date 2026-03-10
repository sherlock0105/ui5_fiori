sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend(
      "code1.cl5.search01.code1cl5search01.controller.ScarrView",
      {
        onInit() {},

        onSearch: function () {
          //검색어 가져오기
          var vCarrid = this.getView().byId("iCarrid").getValue().toUpperCase(), //대문자 변환
            vCurrcode = this.getView()
              .byId("iCurrcode")
              .getValue()
              .toUpperCase();
          //필요한 객체 선언
          let oBinding = this.getView().byId("AirLineList").getBinding("rows"),
            oFilter = null,
            aFilter = [];

          //검색어가 입력된 필드를 필터에 구성
          if (vCarrid != "") {
            oFilter = new Filter("Carrid", FilterOperator.EQ, vCarrid);
            aFilter.push(oFilter);
          }
          //통화코드 조건
          if (vCurrcode != "") {
            oFilter = new Filter("Currcode", FilterOperator.EQ, vCurrcode);
            aFilter.push(oFilter);
          }
          //필터 적용
          if (aFilter.length > 0) {
            oBinding.filter(aFilter);
          } else {
            oBinding.filter();
          }
        },
      },
    );
  },
);
