sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code1cl5edu06.code1cl5edu06.controller.View1",
    {
        onInit()
        {
            let oData1 = {
                            gs_button: {
                                         text   : "체크버튼",
                                         icon   : "sap-icon://paper-plane",
                                         enabled: false

                                       }, // gs_button은 단일구조 (1행짜리 배열 = structure = 일차원 배열 = work area)
                            gs_text: {
                                        text: "JSON 연습",
                                        width: "40em",
                                        textAlign: "Center"
                                     }
                         },

                oData2 = {
                            gs_input: {
                                        placeholder: "입력창",
                                        width: "20em",
                                        desc: "ID 입력"
                                      },
                            gs_Label: {//oData3로 따로 만들지 않아도 Input 폴더 안에 별도의 JSONModel을 만들어도 됨. View에 입력할 땐, Input>/gs_Label/text 이런 식으로 입력해야 함
                                        text: "JSON 통한 Label",
                                        width: "20em",
                                        design: "Bold"
                                      }
                         },

                oData3 = {
                            gs_label: {
                                        text: "JSON 통한 Label",
                                        width: "20em",
                                        design: "Bold"
                                      }
                         },

                oModel1 = new JSONModel(oData1),
                oModel2 = new JSONModel(oData2),
                oMOdel3 = new JSONModel(oData3);

            this.getView().setModel(oModel1); // 최상위 폴더에 oModel1을 저장(set)
            this.getView().setModel(oModel2, "Input"); //Input 폴더에 oModel2를 저장(set)
            this.getView().setModel(oMOdel3, "Label");

        },

    
    });
});