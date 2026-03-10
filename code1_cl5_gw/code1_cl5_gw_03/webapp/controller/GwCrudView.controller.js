sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend(
      "code1.cl505gw03.code1cl5gw03.controller.GwCrudView",
      {
        onInit() {},

        onSearch: function () {
          //검색어 가져오기
          var vMatnr = this.getView().byId("IMatnr").getValue().toUpperCase(), //대문자 변환
            vAuart = this.getView().byId("IAuart").getValue().toUpperCase();

          //필요한 객체 선언
          let oBinding = this.getView().byId("matList").getBinding("rows"),
            oFilter = null,
            aFilter = [];

          if (vMatnr != "") {
            oFilter = new Filter("Matnr", FilterOperator.EQ, vMatnr);
            aFilter.push(oFilter);
          }
          //검색어가 입력된 필드를 필터에 구성
          if (vAuart != "") {
            oFilter = new Filter("Auart", FilterOperator.EQ, vAuart);
            aFilter.push(oFilter);
          }
          //필터 적용
          if (aFilter.length > 0) {
            oBinding.filter(aFilter);
          } else {
            oBinding.filter();
          }
        },
        onClear: function () {
          this.getView().byId("Matnr").setValue();
          this.getView().byId("Auart").setValue();
          this.getView().byId("Vkorg").setValue();
          this.getView().byId("Spart").setValue();
        },
        onDisplay: function () {
          let oTable = this.getView().byId("matList"),
            aIndex = oTable.getSelectedIndices(),
            oData = oTable.getContextByIndex(aIndex[0]).getObject();
          //SetValue 로 읽어온 행의 데이터를 넣어준다.
          this.getView().byId("Matnr").setValue(oData.Matnr);
          this.getView().byId("Auart").setValue(oData.Auart);
          this.getView().byId("Vkorg").setValue(oData.Vkorg);
          this.getView().byId("Spart").setValue(oData.Spart);
        },

        onClear: function () {
          this.getView().byId("Matnr").setValue();
          this.getView().byId("Auart").setValue();
          this.getView().byId("Vkorg").setValue();
          this.getView().byId("Spart").setValue();
        },

        onRead: function () {
          //get entity 경로로 부르기 (GW)
          let oTable = this.getView().byId("matList"),
            aIndex = oTable.getSelectedIndices(),
            oData = oTable.getContextByIndex(aIndex[0]).getObject(),
            oModel = this.getView().getModel(),
            oView = this.getView();

          oModel.read(
            "/MatSet(Matnr='" + oData.Matnr + "',Auart='" + oData.Auart + "')",
            {
              success: function (oReturn) {
                oView.byId("Matnr").setValue(oData.Matnr);
                oView.byId("Auart").setValue(oData.Auart);
                oView.byId("Vkorg").setValue(oData.Vkorg);
                oView.byId("Spart").setValue(oData.Spart);
              },

              error: function () {
                alert("실패");
              },
            },
          );
        },
        //생성 로직
        onCreate: function () {
          let oModel = this.getView().getModel(),
            oView = this.getView(),
            oData = {
              Matnr: oView.byId("Matnr").getValue(),
              Auart: oView.byId("Auart").getValue(),
              Vkorg: oView.byId("Vkorg").getValue(),
              Spart: oView.byId("Spart").getValue(),
            };

          oModel.create("/MatSet", oData, {
            success: function (oReturn) {
              oModel.refresh();
              MessageToast.show("Create Success");
            },

            error: function () {
              MessageToast.show("Create Fail");
            },
          });
        },
        //수정 로직
        onUpdate: function () {
          let oView = this.getView(),
            oModel = oView.getModel();

          let oData = {
            Matnr: oView.byId("Matnr").getValue(),
            Auart: oView.byId("Auart").getValue(),
            Vkorg: oView.byId("Vkorg").getValue(),
            Spart: oView.byId("Spart").getValue(),
          };

          oModel.update(
            "/MatSet(Matnr='" + oData.Matnr + "',Auart='" + oData.Auart + "')",
            oData,
            {
              success: function () {
                oModel.refresh();
                MessageToast.show("Update Success");
              },

              error: function () {
                MessageToast.show("Update Fail");
              },
            },
          );
        },
        //삭제 로직
        onDelete: function () {
          let oTable = this.getView().byId("matList"),
            aIndex = oTable.getSelectedIndices(),
            oModel = this.getView().getModel();

          if (aIndex.length < 1) {
            MessageToast.show("삭제할 행을 선택하세요");
            return;
          }

          let oData = oTable.getContextByIndex(aIndex[0]).getObject();

          oModel.remove(
            "/MatSet(Matnr='" + oData.Matnr + "',Auart='" + oData.Auart + "')",
            {
              success: function () {
                oModel.refresh();
                MessageToast.show("Delete Success");
              },

              error: function () {
                MessageToast.show("Delete Fail");
              },
            },
          );
        },
      },
    );
  },
);
