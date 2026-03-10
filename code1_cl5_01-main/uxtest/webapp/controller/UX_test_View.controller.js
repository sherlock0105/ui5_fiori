sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("code1.uxtest01.uxtest.controller.UX_test_View", {
        onInit() {
        },

        //일반
        onGugudan01: function(){

            var vDan = this.getView().byId("Dan01").getValue();

                for (var i = 2; i <= vDan; i++)
                {
                    for (var j = 1; j <=9; j++)
                    {
                        console.log(i+ "X" + j +"="+ (i*j));
                    }
                }

        },

        // 모듈화(function 이용)
        onGugudan02: function(){

            var vDan = this.getView().byId("Dan01").getValue();

                for (var i = 2; i <= vDan; i++)
                {
                    for (var j = 1; j <=9; j++)
                    {
                        this.printDan(i, j);
                        //같은 controller에 있는 다른 함수를 참조할 때는 앞에 `this.`을 써줘야 함
                        //i, j: parameter value
                            //i가 printDan의 pDan에 대응, j가 pNum에 대응
                    }
                }

        },

        //반복되는 기능을 모듈화 하여 별도의 함수로 분리 = 모듈화
            //장점: 기능을 수정하기 용이함 (모듈화 안하면 기능마다 다 찾아가면서 수정해야됨)
        printDan: function(pDan, pNum){
                            //pDan, pNum: parameter
            console.log(pDan+ "X" + pNum +"="+ (pDan*pNum));
            
        },

        //복수의 함수를 한번에 트리거 (01하고 02를 함)
        totalPrint: function(){

            this.onGugudan01()
            this.onGugudan02()
        },
        //작동 순서
            //totalPrint - onGugudan01(printDan 함수 사용안함) - totalPrint - onGugudan02 - printDan - totalPrint(종료)
                //주의점: totalPrint에서 시작했으면 totalPrint에서 끝난다.

        cAllculation: function(){
            var vNum1 = this.getView().byId("Dan01").getValue(),
                vNum2 = this.getView().byId("Dan02").getValue(),
                vOperator = this.getView().byId("Operator").getValue(),
                vResult = "";
            

            vResult = vNum1 + vOperator + vNum2;
            alert(eval(vResult))
        },

        addOperator: function(vOpt){
            switch (vOpt) {
                case '+': 
                    break;
                case '-': 
                    break;
                case '*': 
                    break;
                case '/': 
                    break;
                default:
                    alert("유효한 연산자가 아닙니다")
                    break;
            }
            this.getView().byId("Operator").setValue(vOpt);
            //vOpt: view의 parameter value를 받는 parameter
            
        },
        



        


    });
});