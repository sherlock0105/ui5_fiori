sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code1.cl5.calculator.code1cl5calculator.controller.CalView", {
        onInit() {
        },

        numin: function(insert){
            var wind = this.getView().byId('window').getValue(),
                resu = "";
          
            switch (insert) {
                case '=':
                    resu = eval(wind);
                    break;
            
                default:
                    resu = wind + insert;
                    break;
            }
            this.getView().byId('window').setValue(resu);
            },
            


        allcl: function(){
            this.getView().byId("window").setValue("");
        },

        // calc: function(){
        //     let ins = this.getView().byId("window").getValue(),
        //         resu = eval(ins);
        //     this.getView().byId("window").setValue(resu);
        // }


    });
});