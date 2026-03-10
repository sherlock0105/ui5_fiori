sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code1.cl5.edu01.test3.controller.LeftView", {
        onInit() {
            let oriData = {
                            "valSet": [
                                {"Val": "33.1",  "Label": "5월"},
                                {"Val": "12",    "Label": "6월"},
                                {"Val": "51.4",  "Label": "7월"},
                                {"Val": "52",    "Label": "8월"},
                                {"Val": "69.9",  "Label": "9월"},
                                {"Val": "0.9",   "Label": "10월"},
                                {"Val": "20",    "Label": "11월"},
                                {"Val": "14",    "Label": "12월"}
                                ]
                          },
                oriModel = new JSONModel(oriData)
            this.getView().setModel(oriModel, "ori");

            
            
        },

        goLeft: function(){
            this.getRouter().navTo("LeftView"); // navTo의 괄호 안에 target이 되는 라우팅 이름을 "문자열"로 입력 안그러면 변수로 인식함
        },
        // 실질적 view로 이동할때는 targets를 보고 가는데
        // manifest.json에 있는 targets의 name 필드값에 있는 View로 이동한다.(id는 지워도 됨)

        goMain: function(){
            this.getRouter().navTo("RouteUlalaTest3"); // navTo의 괄호 안에 target이 되는 라우팅 이름을 "문자열"로 입력 안그러면 변수로 인식함
        },
        // 실질적 view로 이동할때는 targets를 보고 가는데
        // targets의 name 필드값에 있는 View로 이동한다


        // 현재 UI5의 라우팅 정보를 가져옴: manifest.json의 routes
        getRouter: function ()
        {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }
        


    });
});