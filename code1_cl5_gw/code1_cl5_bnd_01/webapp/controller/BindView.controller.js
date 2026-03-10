sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend(
      "code1.cl505pv0002.code1cl5bnd01.controller.BindView",
      {
        onInit() {},

        onSearch: function () {
          //검색어 가져오기
          var vClass = this.getView().byId("iClass").getValue().toUpperCase(), //대문자 변환
            vClNum = this.getView().byId("iClNum").getValue().toUpperCase();
          //필요한 객체 선언
          let oBinding = this.getView().byId("Student").getBinding("rows"),
            oFilter = null,
            aFilter = [];

          //검색어가 입력된 필드를 필터에 구성
          if (vClass != "") {
            oFilter = new Filter("Class", FilterOperator.EQ, vClass);
            aFilter.push(oFilter);
          }

          if (vClNum != "") {
            oFilter = new Filter("ClNum", FilterOperator.EQ, vClNum);
            aFilter.push(oFilter);
          }
          //필터 적용
          if (aFilter.length > 0) {
            oBinding.filter(aFilter); //조건이 있으면 필터 적용
          } else {
            oBinding.filter(); //조건이 없으면 필터 해제
          }
        },
        onStudentExpand: function (oEvent) {
          const bExpanded = oEvent.getParameter("expand");
          const oIdolPanel = this.byId("idIdol");

          // 상태 그대로 동기화
          oIdolPanel.setExpanded(bExpanded);
        },

        onIdolExpand: function (oEvent) {
          const bExpanded = oEvent.getParameter("expand");
          const oStudentPanel = this.byId("idClass"); // ← ID 정확히 확인

          // 상태 그대로 동기화
          oStudentPanel.setExpanded(bExpanded);
        },
      },
    );
  },
);
