sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"

], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("personaltrain2.personaltrain2.controller.ptView1", {
        onInit() {
            
        },

        butt2: function(){
            MessageToast.show("hi");
        },
//L=====실습1

        check1: function(){
            let Num1 = 0,
                Num2 = 0,
                res = 0;

            Num1 = parseInt(this.getView().byId("num1").getValue()),
            Num2 = parseInt(this.getView().byId("num2").getValue()),
            res = Num1 + Num2;
            this.getView().byId("res").setValue(res);
        },
//L======실습2

        // 함수 하나로 퉁치기 (노가다로 button press 각각 다르게 하고 함수 각각 만들어도 됨)
        move: function(aa){
            this.getView().byId('magma').setTextAlign(aa); 
        },
        copy: function(){
            let orgn = this.getView().byId('magma').getTextAlign();
            this.getView().byId('gamag').setTextAlign(orgn);
        },
//L======실습3

        chacha: function(){
            let cop = this.getView().byId('nEw').getValue();
            this.getView().byId('orgn').setText(cop);
        },
//L======실습4

        cala: function(){
            let oView = null;
            oView = this.getView()
            let bot = oView.byId('bot').getValue(),
                hi =  oView.byId('hi').getValue();
            oView.byId('resu').setValue((bot * hi)/2)
        },
//L======실습5

        class: function(){
            let clas = this.getView().byId("classchk").getValue();
            if (clas == "cl1"){
                MessageToast.show("You are Class 1");
            }
            else if (clas == "cl2"){
                MessageToast.show("You are Class 2");
            }
            else if (clas == "cl3"){
                MessageToast.show("You are Class 3");
            }
            else if (clas == "cl4"){
                MessageToast.show("You are Class 4");
            }
            else if (clas == "cl5"){
                MessageToast.show("You are Class 5");
            }
            else {
                MessageToast.show("You are FIRED");
            }

        },
//L======2w-5 실습1
        mea: function(){
            let vala1 = parseInt(this.getView().byId('vala1').getValue()),
                vala2 = parseInt(this.getView().byId('vala2').getValue());
            if (vala1 < vala2){
                console.log('vala2 is greater');
            }
            else if (vala1 > vala2){
                console.log('vala1 is greater');
            }
            else if (vala1 == vala2){
                console.log('same same');
            }

        },
//L======2w-5 실습2

        math: function(){
            // for (var i = 2; i < 10; i++ ){
            //     for (var j = 1; j < 10; j++)
            //         console.log(i + '*' + j + '=' + i*j);
            // }
            
            var i = 1,
                j = 1;
            while (i < 10) {
                i++;
                while (j < 10){
                    j++;
                    console.log(i + " X " + j + " = " + i * j);
                }
                j = 1;
            }

        },
    

        





    });
});