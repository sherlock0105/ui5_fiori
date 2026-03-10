sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel",
    "sap/m/MessageToast"
], (Controller, JSONModel, ResourceModel, MessageToast) => {
    "use strict";

    return Controller.extend("code1.cl5.edu01.test1.controller.UlalaTest1", {
        onInit() {
            //1-1
            let oModel1 = new JSONModel("/data/Fiori1Set.json"), 
                oModel2 = new JSONModel("/data/Fiori2Set.json"),
                oModel3 = new JSONModel("/data/LabelSet.json");
            //webapp(루트)-data-파일명으로 경로를 설정하고 해당 파일을 각각 Json모델로 변환한 뒤 변수로 설정
            //각 모델에 변수를 지정하는 이유는 후에 모델 세팅도 해야되고 경로도 정해줘야됨
            this.getView().setModel(oModel1, "Fi1");
            this.getView().setModel(oModel2, "Fi2");
            this.getView().setModel(oModel3, "Label");
            //모델들 경로지정
            //모델 중 하나는 루트로 지정할 수 있는데 그러면 모델 뒤에 "별칭" 안해도 됨
            //view에서도 >/ 안하고 /이렇게 바로 시작하면 됨
            
            //1-2
            let oRModel1 = new ResourceModel
            ({bundleName: "code1.cl5.edu01.test1.fiori_text.fiori_text"});           
            this.getView().setModel(oRModel1, "lalala");

            

            //1-3
            let oData13 = { text: "CODE1 First Test of 이상현", align: "Center"},
                oModel13 = new JSONModel(oData13);
            this.getView().setModel(oModel13, "Tanda");

            let oRModel13 = new ResourceModel({bundleName: "code1.cl5.edu01.test1.msg.msg"});
            this.getView().setModel(oRModel13, "With");

            //1-33
            let oData133 = { text: "이상현 Fiori 시험중"},
                //json형식으로 작성했지만 별도의 json 파일에 작성한 것이 아니므로 key에 ""를 안해도 됨(value에는 해야됨)
                oModel133 = new JSONModel(oData133);
            this.getView().setModel(oModel133, "Tanda2");
                //"Tanda2"로 별도 지정한 json모델을 view에 세팅

            //1-4
            
            //1-5
            let oModel15 = new JSONModel("/data/1_5button.json");
            //절대경로로 경로 지정. webapp(루트경로) 안에 data 안에 1_5button이라는 json 파일을 지정해서 jsonmodel로 만들기
            this.getView().setModel(oModel15, "15Bu");
            //이 json모델을 15Bu로 별도 지정후 view에 세팅
            
            //1-6
            let oData16 =   {
                                Input1:{
                                    Ivalue: "입력필드", Idesc:"Input field", Imxl: 20, Iwith: "300px", IsCI: true
                                },

                                Input2: {
                                    Idesc:"컨트롤러에서 세팅", Iwith: "300px", Imxl: 10
                                }
                            }, 
                //view에 입력할 데이터니까 onInit에 입력, 변수선언
                oModel16 = new JSONModel(oData16);
                // oData16을 JSONModel로 변환
            this.getView().setModel(oModel16, "16In");
                //json모델인 oModel16을 view에 set함. 근데 이제 "16In"으로
                //루트

        },

        //1-7
        cala: function(){
        let oView17 = null;     //사용할 변수를 안전하게 초기화 (앞서 동일한 변수명을 사용했을 경우 오류가 날 수 있음)
        oView17 = this.getView();       //this.getView()를 그때마다 쓰기 귀찮으니까.

        let bot = parseFloat(oView17.byId('bot').getValue()),
            //view에서 bot에 입력된 값을 가져오고 이 값을 실수로 변환 (수학 계산이니까 float로 했음 getValue는 string으로 가져옴)
            hi =  parseFloat(oView17.byId('hi').getValue()); //상동
        
        oView17.byId('resu').setValue((bot * hi)/2)
            //위에서 parsing한 숫자로 계산을 하고 view에 있는 resu라는 input창에 setValue를 이용해서 값을 입력.
        },
            
        //1-8
        caldc: function(){
        let oView18 = null;         //사용할 변수를 안전하게 초기화 (앞서 동일한 변수명을 사용했을 경우 오류가 날 수 있음)
        oView18 = this.getView();   //this.getView()를 그때마다 쓰기 귀찮으니까.

        let pri = parseInt(oView18.byId('18price').getValue()),     //view에서 18price에 입력된 값을 가져오고 이 값을 정수로 변환 (계산해야되니까. getValue는 string으로 가져옴)
            dc = parseInt(oView18.byId('18dc').getValue());     //상동
        
        oView18.byId('18rate').setValue((dc/pri)*100) //위에서 parsing한 숫자로 계산을 하고 view에 있는 18rate라는 input창에 setValue를 이용해서 값을 입력.
        },

        //1-9
        button19: function() {          //view에서 button19가 눌리면 시작
            let in18 = this.getView().byId('input18').getValue(); //변수 in18을 선언하고 이 변수에 view에서 'input18'에 입력된 값을 가져온다
            switch (in18) {             //input18에 입력된 값을 기준으로 본다
                case "Korea":           //input18에 입력된 값이 "Korea"라면 
                    MessageToast.show("대한민국"); //"대한민국"을 MessageToast.show 해라 (이하 생략)
                    break;
                case "America":
                    MessageToast.show("미국");
                    break;
                case "Israel":
                    MessageToast.show("이스라엘");
                    break;
                case "Thailand":
                    MessageToast.show("태국");
                    break;
                case "Russia":
                    MessageToast.show("러시아");
                    break;
                case "Poland":
                    MessageToast.show("폴란드");
                    break;
                case "Germany":
                    MessageToast.show("독일");
                    break;
                case "England":
                    MessageToast.show("영국");
                    break;
                default: //이외에는 (위에서 열거한 case에 부합하는 상황이 아닌 경우에는)
                        MessageToast.show("No Match"); //No Match라고 MessageToast.show를 해라
                        break;
                }
            
        },
        

        //1-10
        for110: function() {
            for (var i = 2; i < 10; i++) {      // 2단 부터니까 "단"에 해당하는 i는 2부터 시작. 9까지 1씩 커짐
                for (var j = 1; j < 10; j++) {  // i의 하위에서 반복하는 j는 각 단의 1부터 9까지 곱해질 숫자므로 1부터 시작. 9까지 1씩 커짐
                    console.log(i + " X " + j + " = " + i * j);
                    // 모범답안: console.log(i + " X " + j + " = " + (i * j));
                }
            }
        },

        whi110: function() {
            var i = 2,      //i는 "단"으로 설정할 것이므로 2부터 시작. 
                j = 1;      //j는 곱해질 숫자므로 1부터
            while (i < 10) {  //i는 최대 9까지.
                while (j < 10) { //j도 9까지.
                    console.log(i + " X " + j + " = " + i * j);
                    j++; //j가 1씩 커지면서 각 단을 1에서 9까지 채움
                }//j 탈출
            j = 1; //j 1로 초기화 (다음 단에서 다시 1부터 시작해야됨)
            i++;  //i 1증가. 위의 while 조건과 맞물려 9까지 1씩 커지며 각 단을 맡음
            }
        },

        fwi110: function() {
            var j = 1; //while의 j를 반복문 밖에서 선언
            for (var i = 2; i < 10; i++) { //단을 맡을 i는 2부터 10미만까지 1씩 증가
                while (j < 10) { //j는 10 미만으로 제한. 
                    console.log(i + " X " + j + " = " + i * j);
                    j++; //j 1증가. while문이 for문의 괄호 안이므로 j가 9가 될때까지 i는 같은 값으로 유지
                }
            j = 1; //9가 된 j는 while문 밖으로 탈출. 1로 초기화 for 문 반복 시작. i 1증가 - j:1~9 - j: 1로 초기화 -i가 9가 될때까지 반복
            }
        }
        //모범답안: while이 밖에, for가 안에 있는 것이 가독성이 좋음
            // var i = 1;
            // while (i <= 9){
            //     for (var j = 1; j < 10; j++) {
            //         console.log(i + " X " + j + " = " + (i * j));
            //     }
            //     i++;
            // };
        //while을 밖에 두면 초기화 과정을 생략할 수 있음
        
        

    });
});