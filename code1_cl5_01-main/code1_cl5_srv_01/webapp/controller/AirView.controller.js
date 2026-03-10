sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"    
], (Controller, Filter, FilterOperator) => {
    "use strict";

    return Controller.extend("code1.cl5.srv01.code1cl5srv01.controller.AirView", {
        onInit() {
            //onInit 전에 srv 파일이 더 먼저 view에 뿌려져 있음
            //그래서 setModel하지 않고 바로 getModel하면 모델을 볼 수 있음
            let oModel = this.getOwnerComponent().getModel();
            //getModel()하고 괄호 안에 아무 이름도 없다는 것은
            //root에 세팅된 모델을 가져 오겠다
            //만일 다른방에 있는 모델을 가져오려면
                //getModel("방 이름")
            
            // console.log(oModel.aBindings)
        },

    departfil: function(desea){
            let aFilters = [],
                sQuery = desea.getParameter("query"),
                oFilter = null,
                oBinding = this.getView().byId('ScheduleSet').getBinding('rows');
            
            if (sQuery && sQuery.length > 0){
                oFilter = new Filter("Carrid", FilterOperator.Contains, sQuery);
                aFilters.push(oFilter);
            }
            oBinding.filter(aFilters)


        },

    onClick: function ()
        {
            let oModel = this.getView().getModel();

            console.log(oModel.oData);

            for(var i in oModel.oData)
                console.log(i+":"+oModel.oData[i]);

        }
        

    });
});