sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
  ],
  (Controller, Filter, FilterOperator, MessageToast) => {
    "use strict";

    return Controller.extend(
      "code1.cl505.crud02.code1cl5crud02.controller.CRUDView02",
      {
        onInit() {},
        onSearch: function () {
          //검색어 가져오기
          var vSteel = this.getView().byId("ISteel").getValue().toUpperCase(), //대문자 변환
            vWerks = this.getView().byId("IWerks").getValue().toUpperCase();

          //필요한 객체 선언
          let oBinding = this.getView().byId("stList").getBinding("rows"),
            oFilter = null,
            aFilter = [];

          if (vSteel != "") {
            oFilter = new Filter("Steel", FilterOperator.EQ, vSteel);
            aFilter.push(oFilter);
          }
          //검색어가 입력된 필드를 필터에 구성
          if (vWerks != "") {
            oFilter = new Filter("Werks", FilterOperator.EQ, vWerks);
            aFilter.push(oFilter);
          }
          //필터 적용
          if (aFilter.length > 0) {
            oBinding.filter(aFilter);
          } else {
            oBinding.filter();
          }
        },
        onDisplay: function () {
          let oTable = this.getView().byId("stList"),
            aIndex = oTable.getSelectedIndices(),
            oData = oTable.getContextByIndex(aIndex[0]).getObject();
          //SetValue 로 읽어온 행의 데이터를 넣어준다.
          this.getView().byId("Steel").setValue(oData.Steel);
          this.getView().byId("Werks").setValue(oData.Werks);
          this.getView().byId("IndustryKind").setValue(oData.IndustryKind);
          this.getView().byId("Area").setValue(oData.Area);
          this.getView().byId("Menge").setValue(oData.Menge);
          this.getView().byId("Meins").setValue(oData.Meins);
          this.getView().byId("Dmbtr").setValue(oData.Dmbtr);
          this.getView().byId("Waers").setValue(oData.Waers);
        },

        onClear: function () {
          this.getView().byId("Steel").setValue();
          this.getView().byId("Werks").setValue();
          this.getView().byId("IndustryKind").setValue();
          this.getView().byId("Area").setValue();
          this.getView().byId("Menge").setValue();
          this.getView().byId("Meins").setValue();
          this.getView().byId("Dmbtr").setValue();
          this.getView().byId("Waers").setValue();
        },

        onRead: function () {
          //get entity 경로로 부르기 (GW)
          let oTable = this.getView().byId("stList"),
            aIndex = oTable.getSelectedIndices(),
            oData = oTable.getContextByIndex(aIndex[0]).getObject(),
            oModel = this.getView().getModel(),
            oView = this.getView();

          oModel.read(
            "/StSet(Steel='" + oData.Steel + "',Werks='" + oData.Werks + "')",
            {
              success: function (oReturn) {
                oView.byId("Steel").setValue(oReturn.Steel);
                oView.byId("Werks").setValue(oReturn.Werks);
                oView.byId("IndustryKind").setValue(oReturn.IndustryKind);
                oView.byId("Area").setValue(oReturn.Area);
                oView.byId("Menge").setValue(oReturn.Menge);
                oView.byId("Meins").setValue(oReturn.Meins);
                oView.byId("Dmbtr").setValue(oReturn.Dmbtr);
                oView.byId("Waers").setValue(oReturn.Waers);
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
              Steel: oView.byId("Steel").getValue(),
              Werks: oView.byId("Werks").getValue(),
              IndustryKind: oView.byId("IndustryKind").getValue(),
              Area: oView.byId("Area").getValue(),
              Menge: oView.byId("Menge").getValue() || "0",
              Meins: oView.byId("Meins").getValue(),
              Dmbtr: oView.byId("Dmbtr").getValue() || "0",
              Waers: oView.byId("Waers").getValue(),
            };

          var vSteel = oView.byId("Steel").getValue(),
            vWerks = oView.byId("Werks").getValue();

          if (!vSteel.trim() || !vWerks.trim()) {
            MessageToast.show("PK 입력해!");
            return;
          }

          oModel.create("/StSet", oData, {
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

          var vSteel = oView.byId("Steel").getValue(),
            vWerks = oView.byId("Werks").getValue();

          let oData = {
            IndustryKind: oView.byId("IndustryKind").getValue(),
            Area: oView.byId("Area").getValue(),
            Menge: oView.byId("Menge").getValue(),
            Meins: oView.byId("Meins").getValue(),
            Dmbtr: oView.byId("Dmbtr").getValue(),
            Waers: oView.byId("Waers").getValue(),
          };

          oModel.update(
            "/StSet(Steel='" + vSteel + "',Werks='" + vWerks + "')",
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
          let oTable = this.getView().byId("stList"),
            aIndex = oTable.getSelectedIndices(),
            oModel = this.getView().getModel();

          if (aIndex.length < 1) {
            MessageToast.show("삭제할 행을 선택하세요");
            return;
          }

          let oData = oTable.getContextByIndex(aIndex[0]).getObject();

          oModel.remove(
            "/StSet(Steel='" + oData.Steel + "',Werks='" + oData.Werks + "')",
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
