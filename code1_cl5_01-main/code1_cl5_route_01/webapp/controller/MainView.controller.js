sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("coed1.cl5.route01.code1cl5route01.controller.MainView", {
        onInit() {

        },

        goLeft: function(){
            this.getRouter().navTo("LeftView"); // navTo의 괄호 안에 target이 되는 라우팅 이름을 "문자열"로 입력 안그러면 변수로 인식함
        },
        // 실질적 view로 이동할때는 targets를 보고 가는데
        // manifest.json에 있는 targets의 name 필드값에 있는 View로 이동한다.(id는 지워도 됨)

        goRight: function(){
            this.getRouter().navTo("RightView"); // navTo의 괄호 안에 target이 되는 라우팅 이름을 "문자열"로 입력 안그러면 변수로 인식함
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