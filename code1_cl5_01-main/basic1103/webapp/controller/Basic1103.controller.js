sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code1.cl5.edu.basic.basic1103.controller.Basic1103", {
        onInit() {
//실습1
            let oData = {
                            MovieSet: [
                                { Title: "인셉션", Rating: 9.1 },
                                { Title: "인터스텔라", Rating: 8.9 },
                                { Title: "라바", Rating: 7.5 },
                                { Title: "혹성탈출", Rating: 3.2 },
                                { Title: "지구를 지켜라!", Rating: 9.5 }
                            ]
                        },
                oModel = new JSONModel(oData);
                
            this.getView().setModel(oModel);
//실습2
            let oData2 = {
                            CoffeeSet: [
                            { Label: "아메리카노", Sales: 120 },
                            { Label: "카페라떼", Sales: 90 },
                            { Label: "바닐라라떼", Sales: 70 }
                            ]
                         },
                oModel2 = new JSONModel(oData2);
            
            this.getView().setModel(oModel2, "cafe");

//실습3
            let oModel3 = new JSONModel("/data/countries.json");
            this.getView().setModel(oModel3,"earth");


            //실습4
            let oModel4 = new JSONModel("/data/stocks.json");
            this.getView().setModel(oModel4, "stocks");

        }


    });
});