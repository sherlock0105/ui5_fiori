sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend(
      "code1.cl505.grid01.code1cl5grid01.controller.SmokerView",
      {
        onInit() {},
        onSearch: function () {
          //검색어 가져오기
          var vCarrid = this.getView().byId("iCarrid").getValue().toUpperCase(); //대문자 변환

          var vFldate = this.getView().byId("iFldate").getValue().trim();
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
          if (vFldate != "") {
            oFilter = new Filter("Fldate", FilterOperator.EQ, vFldate);
            aFilter.push(oFilter);
          }
          //필터 적용
          if (aFilter.length > 0) {
            oBinding.filter(aFilter);
          } else {
            oBinding.filter();
          }
        },
        onSmokerPress: function (oEvent) {
          // 1️⃣ 클릭된 행의 바인딩 컨텍스트 가져오기
          var oContext = oEvent.getSource().getBindingContext();

          // 2️⃣ 해당 Row 데이터 추출
          var sCarrid = oContext.getProperty("Carrid");
          var sConnid = oContext.getProperty("Connid");
          var sFldate = oContext.getProperty("Fldate");
          var sSmoker = oContext.getProperty("Smoker");

          // 3️⃣ 콘솔 확인
          console.log("Carrid:", sCarrid);
          console.log("Connid:", sConnid);
          console.log("Fldate:", sFldate);
          console.log("Smoker:", sSmoker);
        },
      },
    );
  },
);
