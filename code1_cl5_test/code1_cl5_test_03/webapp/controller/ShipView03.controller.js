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
      "code1.cl505.test03.code1cl5test03.controller.ShipView03",
      {
        onInit() {},
        onSearch: function () {
          //검색어 가져오기
          var vTknum = this.getView().byId("iTknum").getValue().toUpperCase(); //대문자 변환

          //필요한 객체 선언, 테이블 바인딩 객체 가져오기
          let oBinding = this.getView().byId("shipList").getBinding("rows"),
            oFilter = null,
            aFilter = [];
          //검색어가 입력된 필드를 필터에 구성
          if (vTknum != "") {
            oFilter = new Filter("Tknum", FilterOperator.EQ, vTknum);
            aFilter.push(oFilter);
          }
          //필터 적용
          if (aFilter.length > 0) {
            oBinding.filter(aFilter);
          } else {
            oBinding.filter(); //필터 초기화
          }
        },
        //선택 행 화면 표시
        onDisplay: function () {
          let oTable = this.getView().byId("shipList"),
            aIndex = oTable.getSelectedIndices();
          // 선택 없으면 종료
          if (aIndex.length === 0) {
            MessageToast.show("행을 선택하세요");
            return;
          }
          let oData = oTable.getContextByIndex(aIndex[0]).getObject();
          //SetValue 로 읽어온 행의 데이터를 넣어준다.
          this.getView().byId("Tknum").setValue(oData.Tknum);
          this.getView().byId("Tpnum").setValue(oData.Tpnum);
          this.getView().byId("Vbeln").setValue(oData.Vbeln);
          this.getView().byId("Vbtyp").setValue(oData.Vbtyp);
          this.getView().byId("Shtyp").setValue(oData.Shtyp);
          this.getView().byId("Signi").setValue(oData.Signi);
          this.getView().byId("Tprfo").setValue(oData.Tprfo);
          this.getView().byId("Smeng").setValue(oData.Smeng);
          this.getView().byId("Meins").setValue(oData.Meins);
          this.getView().byId("Netwr").setValue(oData.Netwr);
          this.getView().byId("Waerk").setValue(oData.Waerk);
        },

        //setValue() 를 공백으로 두고 clear 처리
        onClear: function () {
          this.getView().byId("Tknum").setValue();
          this.getView().byId("Tpnum").setValue();
          this.getView().byId("Vbeln").setValue();
          this.getView().byId("Vbtyp").setValue();
          this.getView().byId("Shtyp").setValue();
          this.getView().byId("Signi").setValue();
          this.getView().byId("Tprfo").setValue();
          this.getView().byId("Smeng").setValue();
          this.getView().byId("Meins").setValue();
          this.getView().byId("Netwr").setValue();
          this.getView().byId("Waerk").setValue();
        },

        onRead: function () {
          //get entity 경로로 부르기 (GW)
          let oTable = this.getView().byId("shipList"),
            aIndex = oTable.getSelectedIndices(),
            oModel = this.getView().getModel(),
            oView = this.getView();
          // 선택 없으면 종료
          if (aIndex.length === 0) {
            MessageToast.show("행을 선택하세요");
            return;
          }
          let oData = oTable.getContextByIndex(aIndex[0]).getObject();

          oModel.read(
            "/ShipSet(Tknum='" + oData.Tknum + "',Tpnum='" + oData.Tpnum + "')",
            {
              success: function (oReturn) {
                oView.byId("Tknum").setValue(oReturn.Tknum);
                oView.byId("Tpnum").setValue(oReturn.Tpnum);
                oView.byId("Vbeln").setValue(oReturn.Vbeln);
                oView.byId("Vbtyp").setValue(oReturn.Vbtyp);
                oView.byId("Shtyp").setValue(oReturn.Shtyp);
                oView.byId("Signi").setValue(oReturn.Signi);
                oView.byId("Tprfo").setValue(oReturn.Tprfo);
                oView.byId("Smeng").setValue(oReturn.Smeng);
                oView.byId("Meins").setValue(oReturn.Meins);
                oView.byId("Netwr").setValue(oReturn.Netwr);
                oView.byId("Waerk").setValue(oReturn.Waerk);
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
              Tknum: oView.byId("Tknum").getValue(),
              Tpnum: oView.byId("Tpnum").getValue(),
              Vbeln: oView.byId("Vbeln").getValue(),
              Vbtyp: oView.byId("Vbtyp").getValue(),
              Shtyp: oView.byId("Shtyp").getValue(),
              Signi: oView.byId("Signi").getValue(),
              Tprfo: oView.byId("Tprfo").getValue(),
              Smeng: oView.byId("Smeng").getValue() || "0", //빈값 방지
              Meins: oView.byId("Meins").getValue(),
              Netwr: oView.byId("Netwr").getValue() || "0",
              Waerk: oView.byId("Waerk").getValue(),
            };

          oModel.create("/ShipSet", oData, {
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
        onEdit: function () {
          let oView = this.getView(),
            oModel = oView.getModel();

          var vTknum = oView.byId("Tknum").getValue(),
            vTpnum = oView.byId("Tpnum").getValue();

          let oData = {
            Tknum: oView.byId("Tknum").getValue(),
            Tpnum: oView.byId("Tpnum").getValue(),
            Vbeln: oView.byId("Vbeln").getValue(),
            Vbtyp: oView.byId("Vbtyp").getValue(),
            Shtyp: oView.byId("Shtyp").getValue(),
            Signi: oView.byId("Signi").getValue(),
            Tprfo: oView.byId("Tprfo").getValue(),
            Smeng: oView.byId("Smeng").getValue() || "0", //빈값 방지
            Meins: oView.byId("Meins").getValue(),
            Netwr: oView.byId("Netwr").getValue() || "0",
            Waerk: oView.byId("Waerk").getValue(),
          };

          oModel.update(
            "/ShipSet(Tknum='" + vTknum + "',Tpnum='" + vTpnum + "')",
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
        //삭제 로직 행 선택으로 지운다.
        onDelete: function () {
          let oTable = this.getView().byId("shipList"),
            aIndex = oTable.getSelectedIndices(),
            oModel = this.getView().getModel();

          if (aIndex.length < 1) {
            MessageToast.show("삭제할 행을 선택하세요");
            return;
          }

          let oData = oTable.getContextByIndex(aIndex[0]).getObject();

          oModel.remove(
            "/ShipSet(Tknum='" + oData.Tknum + "',Tpnum='" + oData.Tpnum + "')",
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
