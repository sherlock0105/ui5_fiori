sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend(
      "code1.cl5.search02.code1cl5search02.controller.FlightView",
      {
        onInit() {},

        onSearch: function () {
          //검색어 가져오기
          var vCarrid = this.getView().byId("iCarrid").getValue().toUpperCase(), //대문자 변환
            vConnid = this.getView().byId("iConnid").getValue().toUpperCase(),
            vFldate = this.getView()
              .byId("iFldate")
              .getValue()
              .replaceAll("-", ""); //날짜는 - 제거
          //필요한 객체 선언
          let oBinding = this.getView().byId("FlightList").getBinding("rows"),
            oFilter = null,
            aFilter = []; //배열로 받아서 AND 조건으로 처리

          //검색어가 입력된 필드를 필터에 구성
          if (vCarrid != "") {
            oFilter = new Filter("Carrid", FilterOperator.StartsWith, vCarrid);
            aFilter.push(oFilter);
          }

          if (vConnid != "") {
            oFilter = new Filter("Connid", FilterOperator.EQ, vConnid);
            aFilter.push(oFilter);
          }

          if (vFldate != "") {
            oFilter = new Filter("Fldate", FilterOperator.EQ, vFldate);
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
