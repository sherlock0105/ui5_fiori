sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend(
      "code1.cl505.cdsship.code1cl5test01.controller.ShipView01",
      {
        onInit() {},
        onSearch: function () {
          //검색어 가져오기
          var vTknum = this.getView().byId("iTknum").getValue().toUpperCase(); //대문자 변환
          //필요한 객체 선언
          let oBinding = this.getView().byId("ShipList").getBinding("rows"),
            oFilter = null,
            aFilter = []; //배열로 받아서 AND 조건으로 처리

          //검색어가 입력된 필드를 필터에 구성
          if (vTknum != "") {
            oFilter = new Filter("Tknum", FilterOperator.EQ, vTknum);
            aFilter.push(oFilter);
          }

          //필터 적용
          if (aFilter.length > 0) {
            oBinding.filter(aFilter); //조건이 있으면 필터 적용
          } else {
            oBinding.filter(); //조건이 없으면 필터 해제
          }
        },
      },
    );
  },
);
