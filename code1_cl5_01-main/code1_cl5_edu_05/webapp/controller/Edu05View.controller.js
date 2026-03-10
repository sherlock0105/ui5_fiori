sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("code1.cl5.edu05.code1cl5edu05.controller.Edu05View", {
        onInit() // view가 화면에 나타나기 전에 선제적으로 해야 할 작업들을 {}안에 넣고 실행
        {
            // 먼저 JSON 형태의 data를 구성
            let oData = {
                            text: "세이 헬로", 
                            place: "월드", // JSON에서 key 이름이 정해져 있는 것 X 내가 알아서 쓰면 됨
                            desc: "헬로 월드",
                            icon: "sap-icon://flight",

                            // 그룹으로 나누면 서로 다른 그룹에서는 key 값이 동일해도 상관 없음
                            // 윈도우 파일명이 같아도 폴더가 다르면 괜찮은 것 처럼 
                            ButtonSet0 : {                                         //oData 안에서 그룹을 나눌 수 있음. 이 그룹도 JSON 구조임. Key: Buttonset, Value: {}안의 내용들
                                            btext1: "Confirm",
                                            btext2: "Check",
                                            bwidth1: "150px",
                                            bwidth2: "200px",
                                            bicon1: "sap-icon://paper-plane",
                                            bboolean2: false  //boolean 값은 따옴표X
                                        },
                            
                            InputSet : {
                                            ival1: "입력필드",
                                            idesc1: "Input filed",
                                            imxlen1: 20, //숫자는 따옴표X
                                            iwidth1: "300px",
                                            iclicon1: true,
                                            idesc2: "컨트롤러에서 세팅",
                                            iwidth2: "300px",
                                            imxlen2: 10
                                        },
                            LabelSet : {
                                            text: "이상현",
                                            design: "Bold",
                                            width: "30rem"
                                        },
                            TextSet : {
                                        text: "구트 3F Class 5",
                                        width: "20rem",
                                        align: "Center" // value 대소문자 틀리면 안됨. 
                                    },
                            Buttonset: {
                                        text: "테스트",
                                        icon: "sap-icon://accept"
                                    }

                        },
                oModel = new JSONModel(oData); // JSONModel이라는 클래스를 쓰기 전에 new 생성자 사용

            this.getView().setModel(oModel); // 현재 view에 oModel이라는 데이터를 넣어라 (mvc에서 m(model)은 데이터를 의미)
        },




    });
});