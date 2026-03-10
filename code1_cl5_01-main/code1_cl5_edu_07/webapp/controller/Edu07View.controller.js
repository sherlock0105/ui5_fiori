sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code1.cl5.edu07.code1cl5edu07.controller.Edu07View", {
        onInit() 
        {
            let oModel1 = new JSONModel("../data/test.json"); //JSON 파일이 있는 위치를 표시해줘야 함. controller 기준으로 webapp이 루트 위치므로 "/test.json"으로 경로 설정
                                                            //만약 test.json 파일이 controller 폴더에 있다면 "/controller/test.json"으로 경로 설정
                                                             // /controller>/test.json 이렇게는 안됨
                                                            // ../의 의미: 한단계 상위 폴더로 올라가라
                                                            // ../data/test.json: webapp(controller가 있는 폴더)보다 하나 상위 폴더로 가서 data 폴더로 가서 test.json을 가져와라
                                                            // 절대경로: webapp 루트 경로부터 full 경로를 다 써줌
                                                            // let oModel1 = new JSONModel ("/data/test.json");
                                                            // 상대경로: 현재 있는 폴더로부터 이동하는 경로를 써줌
                                                            // 현재 컨트롤러는 controller 폴더에 있으므로 
                                                            // .. : 현재 폴더에서 바로 위 상위폴더로 나가라는 뜻
                                                            // let oModel1 = new JSONModel ("../data/test.json");
            let oModel2 = new JSONModel("/cl5/cl5.json");

            this.getView().setModel(oModel1);
            this.getView().setModel(oModel2, "AA5");

        },
    });
});