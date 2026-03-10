sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code1.cl5.edu01.calculator.controller.calculatorView", {_keydownhandler: null,

        onInit() {
            this.memoryValue = 0;
            this._keydownhandler = this._keydown.bind(this);
            document.addEventListener('keydown', this._keydownhandler);
        },

        onExit: function(){
            document.removeEventListener('keydown', this._keydownhandler);
        },

        _keydown: function(e){
            let key = e.key;
            if ((0 <= key && key <= 9) || ["+", "-", "*", "/", "."].includes(key)){
                e.preventDefault();
                this.numin(key);
                return;
            }
            switch(key){
                case "Enter":
                    e.preventDefault();
                    this.calc();
                    break;
                case "Escape":
                    e.preventDefault();
                    this.allcl();
                    break;
                case "Backspace":
                    e.preventDefault();
                    this.cl();
                    break;
            }
                
        },

        numin: function(insert){
            let wind = this.getView().byId('window'),
                oldy = wind.getValue(),
                newb = oldy + insert;
            wind.setValue(newb);
        },

        cl: function(){
            let wind = this.getView().byId("window"),
                oldy = wind.getValue(),
                newb = 0;
            
            if (oldy.length > 0){
                newb = oldy.slice(0, -1);
                wind.setValue(newb)
            }
        },

        allcl: function(){
            this.getView().byId("window").setValue("")
        },

        calc: function(){
            let ins = this.getView().byId("window").getValue(),
                resu = eval(ins);
            this.getView().byId("window").setValue(resu)
        },
        
        getyournumber: function(){
            let windo = this.getView().byId("window").getValue();

            try {
                let arisu = eval(windo);
                if (typeof arisu === 'number' && !isNaN(arisu)){
                    return arisu;
                }
            } catch (e) {
                return null;
            }
        },

        madd: function(){
            let winput = this.getyournumber();
            if (winput === null) return;
            this.memoryValue += winput;            
        },

        meinus: function(){
            let winput = this.getyournumber();
            if (winput === null) return;
            this.memoryValue -= winput;            
        },

        recall: function(){
            let wind = this.getView().byId("window");        
            wind.setValue(this.memoryValue)
        },

        forget: function(){
            this.memoryValue = 0
        }


    });
});