sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code1.cl5.micro.chart01.code1cl5microchart01.controller.chart_01", {
        onInit() {
            let oData = {
                            lineSet: {
                                         Val1: 33.1,  Label1: "May",  Label2: "Q2",
                                         Val2: 12,    Label3: "June",
                                         Val3: 51.4,  Label4: "July", Label5: "Q3",
                                         Val4: 52,    Label6: "Aug",
                                         Val5: 69.9,  Label7: "Sep",
                                         Val6: 0.9,   Label8: "Oct",  Label9: "Q4"
                                     }
                },
                oData2 = {
                            carSet: {
                                        Car1: 33,  Label1: "그랜져",  
                                        Car2: 12,  Label2: "소나타",
                                        Car3: 55,  Label3: "제네시스"                                         
                                    }
                },
                // oData3 = {
                //             valSet: [
                //                         {Val: "33.1",  Label: "5월"},
                //                         {Val: "12",    Label: "6월"},
                //                         {Val: "51.4",  Label: "7월"},
                //                         {Val: "52",    Label: "8월"},
                //                         {Val: "69.9",  Label: "9월"},
                //                         {Val: "0.9",   Label: "10월"},
                //                         {Val: "20",    Label: "11월"},
                //                         {Val: "14",    Label: "12월"}
                //             ]
                // },
                oModel = new JSONModel(oData),
                oModel2 = new JSONModel(oData2);
                //oModel3 = new JSONModel(oData3);

            this.getView().setModel(oModel);
            this.getView().setModel(oModel2, "Car"); //this.getView().setModel(new JSONModel(oData2), "Car");
            //this.getView().setModel(oModel3, "Month");

            let oModel3 = new JSONModel("/data/oData3.json");
            this.getView().setModel(oModel3, "Month");
            
        },
    });
});