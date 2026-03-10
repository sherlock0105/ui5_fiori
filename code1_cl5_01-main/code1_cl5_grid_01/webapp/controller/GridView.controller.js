sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code1.cl5.grid01.code1cl5grid01.controller.GridView", {
        onInit()
        {
            let oData = {
                            AirlineSet: [
                                            {Carrid:"AA", Carrname: "American Air", Currkey: "USD", Price: 5234},
                                            {Carrid:"KA", Carrname: "Koeran Air", Currkey: "KRW", Price: 150000},
                                            {Carrid:"LH", Carrname: "Luft Hansa", Currkey: "EUR", Price: 2391},
                                            {Carrid:"VA", Carrname: "Vietnam Air", Currkey: "VND", Price: 3000000}
                                        ]                                     
                        },

                oData2 = {
                            matSet: [
                                        {Matnr:"ST_01",   Maktx:"Steel",        Werks:"1010", Lgort:"L1000"},
                                        {Matnr:"RPX321",  Maktx:"Road_Steel",   Werks:"1020", Lgort:"L2000"},
                                        {Matnr:"EL_GANG", Maktx:"Strong Steel", Werks:"1030", Lgort:"L3000"} 
                                    ]
                         },

                oModel1 = new JSONModel(oData), // View가 인지할 수 있는 Model(데이터)은 JSON 형태이므로 JSONModel로 변환
                oModel2 = new JSONModel(oData2);
            this.getView().setModel(oModel1); // JSONModel로 변환한 Model을 View에 세팅(전송)
            this.getView().setModel(oModel2, "mat");
        },


    });
});