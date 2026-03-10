sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("coed1.cl5.route01.code1cl5route01.controller.LeftView", {
        onInit() {
            
        },

        goMain: function(){
            this.getRouter().navTo("RouteMainView"); // navTo의 괄호 안에 target이 되는 라우팅 이름을 "문자열"로 입력 안그러면 변수로 인식함
        },

        goRight: function(){
            this.getRouter().navTo("RightView"); // navTo의 괄호 안에 target이 되는 라우팅 이름을 "문자열"로 입력 안그러면 변수로 인식함
        },

        getRouter: function ()
        {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }



    });
});