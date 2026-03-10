sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code1cl5edu02.code1cl5edu02.controller.code1_cl5_edu_02", {
        onInit() {
        },
      //  3. 계산기 문제 장황ver
      //  cal_val: function ()
      //  {
      //      var vNum1 = 0,
      //          vNum2 = 0,
      //          vNum3 = 0;
//
      //      let oView = null,
      //          oIn1 = null,
      //          oIn2 = null,
      //          oIn3 = null;
//
      //      oView = this.getView();
//
      //      oIn1 = oView.byId("num1");
      //      oIn2 = oView.byId("num2");
      //      oIn3 = oView.byId("num3");
//
      //      vNum1 = oIn1.getValue();
      //      vNum2 = oIn2.getValue();
      //      vNum3 = (parseInt(vNum1) + parseInt(vNum2))*10 ;
//
      //      oIn3.setValue(vNum3);
//
      //  },

        //  3. 계산기 문제 간소ver
        cal_val: function()
        {
            oView = this.getValue()
        },


        // 4. 삼각형 계산
        tri_nol: function()
        {
            var vLow = 0,
                vHi = 0,
                vNol = 0;

            let oView = null,
                oLow = null,
                oHi = null,
                oNol = null;
            
            oView = this.getView();
            oLow = oView.byId("low");
            oHi = oView.byId("hi");
            oNol = oView.byId("nol");

            vLow = oLow.getValue();
            vHi = oHi.getValue();
            vNol = (parseInt(vLow) * parseInt(vHi))*0.5;

            oNol.setValue(vNol);

        },
        
        // 5. 할인율 계산
        dc_rate: function()
        {
            var vPric = 0,
                vPaid = 0,
                vDcr = 0;

            let oView = 0,
                oPric = 0,
                oPaid = 0,
                oDcr = 0;
            
            oView = this.getView();
            oPric = oView.byId("price");
            oPaid = oView.byId("paid");
            oDcr = oView.byId("dcr");

            vPric = oPric.getValue();
            vPaid = oPaid.getValue();
            vDcr = (1-(parseInt(vPaid) / parseInt(vPric)))*100;

            oDcr.setValue(vDcr);
        },
        // 글자 정렬
        leftie: function()
        {
            let oView = null;

            oView = this.getView();

            oView.byId("txt").setTextAlign("Begin");
        },

        centre: function()
        {
            let oView = null;
            
            oView = this.getView();

            oView.byId("txt").setTextAlign("Center");
        },

        rightie: function()
        {
            let oView = null;

            oView = this.getView();
            oView.byId("txt").setTextAlign("Right");
        },


    // 라벨 문자 수정
        modi: function()
        {   
            var vString = this.getView().byId("insert").getValue();

            this.getView().byId("lab").setText(vString);
        }
            //우선순위
            // 라벨 문자를 바꾸기 위해서는
            // 1. input에 입력된 값을 파악
                // var vString = this.getView().byId("insert").getValue();
            // 2. 라벨의 값을 바꾼다
                // this.getView().byId("lab").setText(vString);


    });
});