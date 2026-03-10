sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("code1.cl5.edu01.project1.controller.View1", {
        onInit() {

            let oSchedules = new JSONModel("/data/schedules.json");
            this.getView().setModel(oSchedules, "schedules");

        },


            frUSD: { 'USD': 1,       'AUD': 1.52,   'KRW': 1467.66,  'JPY': 154.71,  'SGD': 1.3,     'EUR': 1.16 },
            frKRW: { 'USD': 0.00068, 'AUD': 0.001,  'KRW': 1,        'JPY': 0.11,    'SGD': 0.00089, 'EUR': 0.00059 },
            frAUD: { 'USD': 1.52,    'AUD': 1,      'KRW': 963.09,   'JPY': 101.53,  'SGD': 1.17,    'EUR': 1.77 },
            frJPY: { 'USD': 154.71,  'AUD': 0.0098, 'KRW': 0.11,     'JPY': 1,       'SGD': 118.9,   'EUR': 179.3 },
            frSGD: { 'USD': 0.77,    'AUD': 0.85,   'KRW': 1127.19,  'JPY': 0.0084,  'SGD': 1,       'EUR': 0.66 },
            frEUR: { 'USD': 0.86,    'AUD': 1.77,   'KRW': 1699.18,  'JPY': 179.3,   'SGD': 1.51,    'EUR': 1 },

        toUSD: function(oItem, toCur){
            let tRate = this.frUSD[toCur]
            if (tRate !== undefined) {
                oItem.Price = oItem.Price * tRate;
                oItem.Currency = toCur;
            }
            console.log(tRate)
        },
        toKRW: function(oItem, toCur){
            let tRate = this.frKRW[toCur]
            if (oItem.Currency === "KRW" && tRate !== undefined) {
                oItem.Price = oItem.Price * tRate;
                oItem.Currency = toCur;
            }
            console.log(tRate)
        },
        toAUD: function(oItem, toCur){
            let tRate = this.frAUD[toCur]
            if (oItem.Currency === "AUD" && tRate !== undefined) {
                oItem.Price = oItem.Price * tRate;
                oItem.Currency = toCur;
            }
            console.log(tRate)
        },
        toJPY: function(oItem, toCur){
            let tRate = this.frJPY[toCur]
            if (oItem.Currency === "JPY" && tRate !== undefined) {
                oItem.Price = oItem.Price * tRate;
                oItem.Currency = toCur;
            }
            console.log(tRate)
        },
        toSGD: function(oItem, toCur){
            let tRate = this.frSGD[toCur]
            if (oItem.Currency === "SGD" && tRate !== undefined) {
                oItem.Price = oItem.Price * tRate;
                oItem.Currency = toCur;
            }
            console.log(tRate)
        },
        toEUR: function(oItem, toCur){
            let tRate = this.frEUR[toCur]
            if (oItem.Currency === "EUR" && tRate !== undefined) {
                oItem.Price = oItem.Price * tRate;
                oItem.Currency = toCur;
            }
            console.log(tRate)
        },




        checkpri: function () {

            //출발국 도착국 필터링
            var vDepcon = this.getView().byId('depcon').getValue('query'),
                vArrcon = this.getView().byId('arrcon').getValue('query');

            let oBinding = this.getView().byId('flightprice').getBinding('rows'),
                oFilter = null,
                aFilter = [];
            let curren = this.getView().byId('curren').getValue().toUpperCase(),
                oData = this.getView().getModel("schedules").oData;

            if (vDepcon != '') {
                oFilter = new Filter("COUNTRYFR", FilterOperator.EQ, vDepcon);
                aFilter.push(oFilter);
            }
            if (vArrcon != '') {
                oFilter = new Filter('COUNTRYTO', FilterOperator.EQ, vArrcon);
                aFilter.push(oFilter);
            }      
            console.log(oData)
            if (curren == "USD") {
                for (var mo of oData) {
                    this.toUSD(mo, curren); 
                    mo.Currency = curren;
                }}
            if (curren == "KRW") {   
                for (var mo of oData) {
                    this.toKRW(mo, curren); 
                    mo.Currency = curren;
                }}
            if (curren == "AUD") {
                for (var mo of oData) {
                    this.toAUD(mo, curren); 
                    mo.Currency = curren;
                }}
            if (curren == "JPY") {
                for (var mo of oData) {
                    this.toJPY(mo, curren); 
                    mo.Currency = curren;
                }}
            if (curren == "SGD") {
                for (var mo of oData) {
                    this.toSGD(mo, curren); 
                    mo.Currency = curren;
                }}
            if (curren == "EUR") {
                for (var mo of oData) {
                    this.toEUR(mo, curren); 
                    mo.Currency = curren;
                }}


            if (aFilter.length > 0) {
                oBinding.filter(aFilter);
            }
            else{
                oBinding.filter();
            }



        },

        


    });
});



// sap.ui.define([
//     "sap/ui/core/mvc/Controller",
//     "sap/ui/model/json/JSONModel",
//     "sap/ui/model/Filter",
//     "sap/ui/model/FilterOperator"
// ], (Controller, JSONModel, Filter, FilterOperator) => {
//     "use strict";

//     return Controller.extend("code1.cl5.edu01.project1.controller.View1", {
//         onInit() {

//             let oSchedules = new JSONModel("/data/schedules.json");
//             this.getView().setModel(oSchedules, "schedules");
//             // this.oExchangeRates = {
//             //     USD: { USD: 1,       AUD: 0.66,   KRW: 0.00068,  JPY: 0.0065,  SGD: 0.77,    EUR: 0.86 },
//             //     KRW: { USD: 1467.66, AUD: 963.09, KRW: 1,        JPY: 9.49,    SGD: 1127.19, EUR: 1699.18 },
//             //     AUD: { USD: 1.52,    AUD: 1,      KRW: 0.001,    JPY: 0.0098,  SGD: 1.17,    EUR: 1.77 },
//             //     JPY: { USD: 154.71,  AUD: 101.53, KRW: 0.11,     JPY: 1,       SGD: 118.9,   EUR: 179.3 },
//             //     SGD: { USD: 1.3,     AUD: 0.85,   KRW: 0.00089,  JPY: 0.0084,  SGD: 1,       EUR: 1.51 },
//             //     EUR: { USD: 1.16,    AUD: 0.57,   KRW: 0.00059,  JPY: 0.00546, SGD: 0.66,    EUR: 1 }
//             // }
//         },


//             frUSD: { 'USD': 1,       'AUD': 1.52,   'KRW': 1467.66,  'JPY': 154.71,  'SGD': 1.3,     'EUR': 1.16 },
//             frKRW: { 'USD': 0.00068, 'AUD': 0.001,  'KRW': 1,        'JPY': 0.11,    'SGD': 0.00089, 'EUR': 0.00059 },
//             frAUD: { 'USD': 1.52,    'AUD': 1,      'KRW': 963.09,   'JPY': 101.53,  'SGD': 1.17,    'EUR': 1.77 },
//             frJPY: { 'USD': 154.71,  'AUD': 0.0098, 'KRW': 0.11,     'JPY': 1,       'SGD': 118.9,   'EUR': 179.3 },
//             frSGD: { 'USD': 0.77,    'AUD': 0.85,   'KRW': 1127.19,  'JPY': 0.0084,  'SGD': 1,       'EUR': 0.66 },
//             frEUR: { 'USD': 0.86,    'AUD': 1.77,   'KRW': 1699.18,  'JPY': 179.3,   'SGD': 1.51,    'EUR': 1 },

//         frUSDto: function(oItem, toCur){
//             let tRate = this.frUSD[toCur]
//             if (oItem.Currency === "USD" && tRate !== undefined) {
//                 oItem.Price = oItem.Price * tRate;
//                 oItem.Currency = toCur;
//             }
//             console.log(tRate)
//         },
//         frKRWto: function(oItem, toCur){
//             let tRate = this.frKRW[toCur]
//             if (oItem.Currency === "KRW" && tRate !== undefined) {
//                 oItem.Price = oItem.Price * tRate;
//                 oItem.Currency = toCur;
//             }
//             console.log(tRate)
//         },
//         frAUDto: function(oItem, toCur){
//             let tRate = this.frAUD[toCur]
//             if (oItem.Currency === "AUD" && tRate !== undefined) {
//                 oItem.Price = oItem.Price * tRate;
//                 oItem.Currency = toCur;
//             }
//             console.log(tRate)
//         },
//         frJPYto: function(oItem, toCur){
//             let tRate = this.frJPY[toCur]
//             if (oItem.Currency === "JPY" && tRate !== undefined) {
//                 oItem.Price = oItem.Price * tRate;
//                 oItem.Currency = toCur;
//             }
//             console.log(tRate)
//         },
//         frSGDto: function(oItem, toCur){
//             let tRate = this.frSGD[toCur]
//             if (oItem.Currency === "SGD" && tRate !== undefined) {
//                 oItem.Price = oItem.Price * tRate;
//                 oItem.Currency = toCur;
//             }
//             console.log(tRate)
//         },
//         frEURto: function(oItem, toCur){
//             let tRate = this.frEUR[toCur]
//             if (oItem.Currency === "EUR" && tRate !== undefined) {
//                 oItem.Price = oItem.Price * tRate;
//                 oItem.Currency = toCur;
//             }
//             console.log(tRate)
//         },




//         checkpri: function () {

//             //출발국 도착국 필터링
//             var vDepcon = this.getView().byId('depcon').getValue('query'),
//                 vArrcon = this.getView().byId('arrcon').getValue('query');

//             let oBinding = this.getView().byId('flightprice').getBinding('rows'),
//                 oFilter = null,
//                 aFilter = [];
//             let curren = this.getView().byId('curren').getValue().toUpperCase(),
//                 oData = this.getView().getModel("schedules").oData;

//             if (vDepcon != '') {
//                 oFilter = new Filter("COUNTRYFR", FilterOperator.EQ, vDepcon);
//                 aFilter.push(oFilter);
//             }
//             if (vArrcon != '') {
//                 oFilter = new Filter('COUNTRYTO', FilterOperator.EQ, vArrcon);
//                 aFilter.push(oFilter);
//             }      
            
//             if (curren == "USD") {
//                 for (var mo of oData) {
//                     this.frEURto(mo, curren); 
//                     this.frKRWto(mo, curren);
//                     this.frAUDto(mo, curren);
//                     this.frJPYto(mo, curren);
//                     this.frSGDto(mo, curren);
//                     mo.Currency = curren;
//                 }}
//             if (curren == "KRW") {   
//                 for (var mo of oData) {
//                     this.frEURto(mo, curren); 
//                     this.frUSDto(mo, curren);
//                     this.frAUDto(mo, curren);
//                     this.frJPYto(mo, curren);
//                     this.frSGDto(mo, curren);
//                     mo.Currency = curren;
//                 }}
//             if (curren == "AUD") {
//                 for (var mo of oData) {
//                     this.frEURto(mo, curren); 
//                     this.frUSDto(mo, curren);
//                     this.frKRWto(mo, curren);
//                     this.frJPYto(mo, curren);
//                     this.frSGDto(mo, curren); 
//                     mo.Currency = curren;
//                 }}
//             if (curren == "JPY") {
//                 for (var mo of oData) {
//                     this.frEURto(mo, curren); 
//                     this.frUSDto(mo, curren);
//                     this.frKRWto(mo, curren);
//                     this.frAUDto(mo, curren);
//                     this.frSGDto(mo, curren);  
//                     mo.Currency = curren;
//                 }}
//             if (curren == "SGD") {
//                 for (var mo of oData) {
//                     this.frEURto(mo, curren); 
//                     this.frUSDto(mo, curren);
//                     this.frKRWto(mo, curren);
//                     this.frAUDto(mo, curren);
//                     this.frUSDto(mo, curren); 
//                     mo.Currency = curren;
//                 }}
//             if (curren == "EUR") {
//                 for (var mo of oData) {
//                     this.frJPYto(mo, curren); 
//                     this.frUSDto(mo, curren);
//                     this.frKRWto(mo, curren);
//                     this.frAUDto(mo, curren);
//                     this.frSGDto(mo, curren); 
//                     mo.Currency = curren;
//                 }}


//             if (aFilter.length > 0) {
//                 oBinding.filter(aFilter);
//             }
//             else{
//                 oBinding.filter();
//             }



//         },

        


//     });
// });

