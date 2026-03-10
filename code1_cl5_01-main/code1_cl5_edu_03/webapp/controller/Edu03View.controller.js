sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("code1.cl5.edu03.code1cl5edu03.controller.Edu03View",
    {
        onInit() 
        {

        },

        onCheck01: function ()
        {
            var vNumber = this.getView().byId("Iclass").getValue();

            if (vNumber > 10)
            {
                MessageToast.show("10 초과");
            }
            else if (vNumber > 5 && vNumber <= 10 )
            {
                MessageToast.show("5초과 10이하");
            }
            else if (vNumber <= 5 && vNumber > 1)
            {
                MessageToast.show("1초과 5이하");
            }
            else if (vNumber <= 5 || vNumber > 1)
            {
                MessageToast.show("1초과 5이하");
            }
        },

        ifCheck01: function ()
        {
            var oView = null,
                oClass = null;

            //View에 있는 Input 입력창에서 입력된 값을 받아오기
            oView = this.getView();
            oClass = oView.byId("Iclass").getValue();
            // 한줄로 쓰려면
            // var oClass = this.getView().byId("Iclass").getValue();

            if (oClass == "CL1")
            {
                MessageToast.show("1반");
            }
            else if (oClass == "CL2")
            {
                MessageToast.show("2반");
            }
            else if (oClass == "CL3")
            {
                MessageToast.show("3반");
            }
            else if (oClass == "CL4")
            {
                MessageToast.show("4반");
            }
            else if (oClass == "CL5")
            {
                MessageToast.show("5반");
            }
            else
            {
                MessageToast.show("반이 없습니다");
            }

        },

        caseCheck01: function()
        {
            var vInput = this.getView().byId("number2").getValue();
            
        //     if (vInput == "A")
        //     {
        //         MessageToast.show("A 입력");
        //     }
        //     else if (vInput == "B")
        //     {
        //         MessageToast.show("B 입력");
        //     }
        //     else
        //     {
        //         MessageToast.show("기타 입력");
        //     }
        // }

        // 위 if 구문을 switch 구문으로 바꾸었을 때 ㄱ
        
            switch (vInput)
            {
                case "A":
                    MessageToast.show("A 입력")
                    break;
                case "B":
                    MessageToast.show("B 입력")
                    break;
                case "C":
                    MessageToast.show("C 입력")
                    break;
                default:
                    MessageToast.show("기타 입력")
                    break;
            }
        },
        
        ifCheck02: function()
        {
            var vMonth = "July";
            if (vMonth == "July")
            {
                console.log("7월이다");
            }
            else
            {
                console.log("7월이 아니야");
            }           
        },

        caseCheck02: function()
        {   
            var vCity = this.getView().byId("city").getValue();

            switch (vCity)
            {
                case "Seoul":
                    alert("서울");
                    break;
                case "Gwangju":
                    alert("광주");
                    break;
                case "Daegu":
                    alert("대구");
                    break;
                case "Busan":
                    alert("부산");
                    break;
                case "Daejeon":
                    alert("대전");
                    break;
                default:
                    alert("도시없음");
                    break;
            }
        },
        
        compareNum: function()
        {
            var v1Num = parseInt(this.getView().byId("1stNum").getValue()),
                v2Num = parseInt(this.getView().byId("2ndNum").getValue());
            
            if (v1Num > v2Num)
            {
                alert("크다");
            }
            else if (v1Num == v2Num)
            {
                alert("같다");
            }
            else if (v1Num < v2Num)
            {
                alert("작다");
            }
        },

        forCheck01: function()
        {
        //    for(var i = 0; i < 5; i = i + 1) // = for(var i = 0; i < 5; i =+ 1) = for(var i = 0; i < 5; i++)
        //    {
        //        console.log(i);
        //    }
           let aNumber = ['A', 'B', 'AB', 'BB'];
           for (var i = 0; i <= 4; i++)
           {
            console.log(aNumber[i]);
           }
           //for 안의 변수가 꼭 상수는 X. 산식도 됨
           //ex1. for (var i = 1-1; i<=4; i++)
           //ex2. var vNum = 1;
           //     for(var i = vNum - 1; i <=4; i++) 
           
           //let bNumber = ['A', 'B', 'AB', 'BB'];
           //for (var i = 1; i < bNumber.length ; i++)
           //배열의 길이에 따라 for의 조건문이 바뀜
           //배열에 값을 추가하면 그에 따라 bNumber.length가 바뀜
        },

        matchNum: function()
        {
            var vMach = parseInt(this.getView().byId("match").getValue());
            let aNumber = [10, 20, 30, 40, 50];
            for (var i = 0; i < aNumber.length; i++)
            {
                if (aNumber[i] == vMach)
                {
                    alert("Match");
                }
            }

            // let aNumber = [10, 20, 30, 40, 50];
            // var vInput = parseInt(this.getView().byId("match").getValue());

            // for (var i = 0; i < aNumber.length; i++)
            // {
            //     switch (aNumber[i])
            //     {
            //         case vInput:
            //             alert("Match");
            //             break;
            //     }
            // }
        }
        
    

    });
});