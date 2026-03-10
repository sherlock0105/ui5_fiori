sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code1.cl5.edu01.test3.controller.MainView", {
        onInit() {

        },

        goLeft: function(){
            this.getRouter().navTo("LeftView"); // 2. navTo의 괄호 안에 target이 되는 라우팅 이름을 "문자열"로 입력 
                                                    //입력된 값을 1에서 가져온 routes에서 찾음
                                                        //manifest-routes에 일치하는 name으로 이동-target확인-targets로 이동-routes의 target과 동일한 target의 view로 route함
        },


        goRight: function(){
            this.getRouter().navTo("RightView"); // 상동
        },



        // 1. manifest.json의 routes의 정보를 모두 가져옴
        getRouter: function ()
        {
            return sap.ui.core.UIComponent.getRouterFor(this);
        }

    });
});