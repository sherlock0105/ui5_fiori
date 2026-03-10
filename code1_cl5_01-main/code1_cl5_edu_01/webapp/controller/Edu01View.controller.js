sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/Text", "sap/m/MessageToast"],
  (Controller, MessageToast) => {
    "use strict";

    return Controller.extend(
      "code1.cl5.edu01.code1cl5edu01.controller.Edu01View",
      {
        onInit() {
          // new sap.m.Text (
          //  {
          //      text: "HelloWorld"
          //  }
          // ).placeAt("content")
        },

        chime: function () {
          alert("딩동댕");
        },
        sety: function () {
          alert("설정완료");
        },
        message: function () {
          MessageToast.show("메시지 토스트야");
        },

        check_val: function () {
          // r 변수 선언하고 초기값 0으로 클리어 해서 시작 ㄱ
          var vNumber1 = 0,
            vNumber2 = 0,
            vNumber3 = 0;

          let oView = null, //oView = this.getView()를 하기 전에 오작동 방지를 위해 미리 초기화 함.
            oInput1 = null, // 상동. 이하동문
            oInput2 = null,
            oInput3 = null;
          // 이 위 까지는 vNumber1,2,3 나 oView, oInput1,2,3나 다 같은 상수0이나 null을 갖고있는 일반 변수임.
          // v로 시작하는 변수는 일반 변수일 것이라고 단서를 달아준 것 (유지보수의 용이성을 위해)
          // o로 시작하는 변수는 추후 객체를 받을 것이라고 단서를 달아준 것 (상동)

          // r 현재 UI5앱의 View를 얻어옴 ㄱ
          oView = this.getView(); // 이걸 먼저 해주지 않으면 아래에 나오는 oView.~~~ 다 작동 안됨.
          // oView: View를 받는 변수(=일반 변수가 아님)-> 인스턴스
          // getView(): View 전체를 가져온다
          //oView = this.getView(); 의미:
          //이(this) UI5의 View를 가져가라
          //oView는 이때부터 일반 변수가 아닌 View를 의미하게 됨

          // r View에 있는 Input 객체들을 얻어옴 ㄱ
          oInput1 = oView.byId("number1"); // <Input id="nunmber1">이 된 거임. oInput1은 이제부터 일반 변수가 아닌 number1을 의미하는 인스턴스(객체)가 됐음.
          oInput2 = oView.byId("number2");
          oInput3 = oView.byId("number3");

          // r Input 객체에 입력된 값을 읽어오자 ㄱ
          vNumber1 = oInput1.getValue(); // = vNumber1 = parseInt(this.getView().byId("number1").getValue());
          // vNumber1은 View에서 id가 number1인 것의 값을 string형식으로 가져온 것을 Int 값으로 변환시킨 것
          vNumber2 = oInput2.getValue();

          // r getValue() 메소드는 String 타입이므로 숫자로 변환해서 계산해줘야 함 ㄱ
          vNumber3 = parseInt(vNumber1) + parseInt(vNumber2);

          // r 계산된 vNumber3를 Input3 객체에 값을 줘야 함 ㄱ
          oInput3.setValue(vNumber3);
        },

        check_val2: function () {
          this.getView()
            .byId("number3")
            .setValue(
              parseInt(this.getView().byId("number1").getValue()) +
                parseInt(this.getView().byId("number2").getValue()),
            );
        },

        // mathter: function() {
        //     var VSum = parseInt(Input1.value) + parseInt(Input2.value)
        //        console.log(parseInt(Input1.value) + parseInt(Input2.value));
        // }
      },
    );
  },
);
