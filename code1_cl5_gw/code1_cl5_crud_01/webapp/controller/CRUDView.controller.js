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
      "code1.cl505.gw0005.code1cl5crud01.controller.CRUDView",
      {
        onInit() {
          //초기 데이터 로드
        },
        onSearch: function () {
          //검색어 가져오기
          var vWerks = this.getView().byId("IWerks").getValue().toUpperCase(), //대문자 변환
            vMatnr = this.getView().byId("IMatnr").getValue().toUpperCase(),
            vMtart = this.getView().byId("IMtart").getValue().toUpperCase();

          //필요한 객체 선언
          let oBinding = this.getView().byId("matList").getBinding("rows"),
            oFilter = null,
            aFilter = [];

          //검색어가 입력된 필드를 필터에 구성
          if (vWerks != "") {
            oFilter = new Filter("Werks", FilterOperator.EQ, vWerks);
            aFilter.push(oFilter);
          }
          if (vMatnr != "") {
            //?filter=Matnr eq 'RT0001'
            oFilter = new Filter("Matnr", FilterOperator.EQ, vMatnr);
            aFilter.push(oFilter);
          }
          if (vMtart != "") {
            oFilter = new Filter("Mtart", FilterOperator.EQ, vMtart);
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
          //상세보기 로직
          let oTable = this.getView().byId("matList"),
            aIndex = oTable.getSelectedIndices(), // 선택한 행의 번호를 배열로 던짐
            //1개만 온다.
            oData = oTable.getContextByIndex(aIndex[0]).getObject();
          //SetValue 로 읽어온 행의 데이터를 넣어준다.
          this.getView().byId("Werks").setValue(oData.Werks);
          this.getView().byId("Matnr").setValue(oData.Matnr);
          this.getView().byId("Lgort").setValue(oData.Lgort);
          this.getView().byId("Bwart").setValue(oData.Bwart);
          this.getView().byId("Mtart").setValue(oData.Mtart);
          this.getView().byId("Matkl").setValue(oData.Matkl);
          this.getView().byId("Dispo").setValue(oData.Dispo);
        },

        onClear: function () {
          this.getView().byId("Werks").setValue();
          this.getView().byId("Matnr").setValue();
          this.getView().byId("Lgort").setValue();
          this.getView().byId("Bwart").setValue();
          this.getView().byId("Mtart").setValue();
          this.getView().byId("Matkl").setValue();
          this.getView().byId("Dispo").setValue();
        },

        onRead: function () {
          //get entity 경로로 부르기 (GW)
          let oTable = this.getView().byId("matList"),
            aIndex = oTable.getSelectedIndices(), // 선택한 행의 번호를 배열로 던짐
            oData = oTable.getContextByIndex(aIndex[0]).getObject(), //선택 Row 데이터 추출
            oModel = this.getView().getModel(),
            oView = this.getView();
          //  /MatSet(Matnr='RTX00',Werks='0001') 이거랑 같음
          //ODataModel 가져오기
          oModel.read(
            "/MatSet(Matnr='" + oData.Matnr + "',Werks='" + oData.Werks + "')",
            {
              success: function (oReturn) {
                oView.byId("Werks").setValue(oReturn.Werks);
                oView.byId("Matnr").setValue(oReturn.Matnr);
                oView.byId("Lgort").setValue(oReturn.Lgort);
                oView.byId("Bwart").setValue(oReturn.Bwart);
                oView.byId("Mtart").setValue(oReturn.Mtart);
                oView.byId("Matkl").setValue(oReturn.Matkl);
                oView.byId("Dispo").setValue(oReturn.Dispo);
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
              Werks: oView.byId("Werks").getValue(),
              Lgort: oView.byId("Lgort").getValue(),
              Mtart: oView.byId("Mtart").getValue(),
              Bwart: oView.byId("Bwart").getValue(),
              Matkl: oView.byId("Matkl").getValue(),
              Dispo: oView.byId("Dispo").getValue(),
            };

          oModel.create("/MatSet", oData, {
            success: function (oReturn) {
              //oReturn
              //1. Function Mapping 인 경우에는 자동으로 값이 들어온다.
              //2. CREATE_ENTITY METHOD 에 직접 로직을 구성한 경우에는
              // ER_ENTITY PARAMETER 에 입력값을 넣어줘야 들어온다.
              oModel.refresh();
              MessageToast.show("Create Success");
            },

            error: function () {
              MessageToast.show("Create Fail");
            },
          });
        },
        //수정 로직
        // INPUT 에서 가져와야한다.
        onUpdate: function () {
          let oView = this.getView(),
            oModel = oView.getModel();

          var vMatnr = oView.byId("Matnr").getValue(),
            vWerks = oView.byId("Werks").getValue();

          let oData = {
            Lgort: oView.byId("Lgort").getValue(),
            Mtart: oView.byId("Mtart").getValue(),
            Bwart: oView.byId("Bwart").getValue(),
            Matkl: oView.byId("Matkl").getValue(),
            Dispo: oView.byId("Dispo").getValue(),
          };

          oModel.update(
            "/MatSet(Matnr='" + vMatnr + "',Werks='" + vWerks + "')",
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
            "/MatSet(Matnr='" + oData.Matnr + "',Werks='" + oData.Werks + "')",
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
