sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/resource/ResourceModel",
    "sap/ui/model/json/JSONModel"
], (Controller, ResourceModel, JSONModel) => {
    "use strict";

    return Controller.extend("code1.cl5.resource01.code1cl5resource01.controller.ResourceView", {
        onInit() {        
            // /config/autotext 폴더에서 text.properties를 읽어옴    
            let oRModel2 = new ResourceModel({
                bundleName: "code1.cl5.resource01.code1cl5resource01.config.autotext.text"
            });

            //읽어온 Resource모델을 view에 text를 alias로 세팅함
            this.getView().setModel(oRModel2, "text")



            let oItab = {
                    gt_data: [
                        {Carrid: "AA" , Carrname: "American Air", Currency:"USD" },
                        {Carrid: "KA" , Carrname: "Korean Air",   Currency:"KRW" },
                        {Carrid: "QA" , Carrname: "Qatar Air",    Currency:"USD" },
                        {Carrid: "BR" , Carrname: "Brunei Royal", Currency:"BND" }
                    ]
                },
                oList = {
                    gt_list: [
                        {Car: "그랜져" ,   Rate: 25.7},
                        {Car: "아반떼" ,   Rate: 35.2},
                        {Car: "소나타" ,   Rate: 15.9},
                        {Car: "제네시스",  Rate: 38.7}
                    ]
                },
                oModel1 = new JSONModel(oItab),
                oModel2 = new JSONModel(oList);
            
            // json모델을 view에 세팅
            this.getView().setModel(oModel1);
            this.getView().setModel(oModel2, "car")

        },


        checkModel1: function()
        {
            // 루트에 setModel된 oModel1을 가져와서 확인하고 싶다.
            // let oModel = this.getView().getModel();

            // // 해당 모델에 있는 데이터를 출력하고 싶다 (콘솔 로그로 oModel을 출력하면 경로 확인 가능)
            // console.log(oModel.oData.gt_data);

            //위와 아래의 출력값은 같다

            let gt_data = this.getView().getModel().oData.gt_data;
            // console.log(gt_data)
            
            // for (let gs_data of gt_data)
            // {
            //     console.log(gs_data.Carrid + "," + 
            //                 gs_data.Carrname + "," +
            //                 gs_data.Currency
            //     );
            // }

            for (let gs_data of gt_data)
            {
                gs_data.Currency = "KRW";
                console.log(gs_data.Carrid + "," + 
                            gs_data.Carrname + "," +
                            gs_data.Currency
                );
            }
        },

        checkModel2: function()
        {
            // car에 setModel된 oModel2을 가져와서 확인하고 싶다.
            let //oModel2 = this.getView().getModel("car"),
                ogt_list = this.getView().getModel("car").oData.gt_list;
            // console.log(ogt_list);

            for (let gs_list of ogt_list)
            {
                // gs_list.Rate = 100
                // console.log(gs_list.Car + "," +
                //             gs_list.Rate 
                // )
                if (0 < gs_list.Rate && gs_list.Rate < 30)
                {
                    gs_list.Rate = 0;
                }
                else if (30 <= gs_list.Rate && gs_list.Rate <=100 )
                {
                    gs_list.Rate = 70;
                }
            }
            console.log(ogt_list);
            



        }
    });
});