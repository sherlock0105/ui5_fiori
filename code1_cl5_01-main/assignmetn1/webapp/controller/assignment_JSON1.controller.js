sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("assignmentjson1.assignmetnjson1.controller.assignment_JSON1", {
        onInit() 
        {

        },

  // 1029 비행기 for, if, switch 실습
        flight: function(rof)
            {
                let aAirline = ['AA', 'KA', 'LH', 'DL', 'QA'];
                for (var i = 0; i < aAirline.length; i++) 
                {
                    if (i == 1)
                    {
                        console.log("Korean Air");
                    }
                    else if (i == 3)
                    {
                        console.log("Delta Air");
                    }
                    else if (i == 4)
                    {
                        console.log("Qatar Air");
                    }
                    else
                    {
                        console.log("Nothing");
                    }
                }

            },
        
        Flight: function()
            {
                let aAirline = ['AA', 'KA', 'LH', 'DL', 'QA'];
                switch(aAirline)
                {
                    case 'AA':
                        console.log("American Air");
                        break;

                    case "LH":
                        console.log("Lufy Hansa");
                        break;

                    default:
                        console.log("etc")
                        break;
                    
                }
            },


 // 1029 걷기 if, MessageToast 실습
        check: function()
            {
                let move = parseInt(this.getView().byId("walk").getValue());

                if (move <= 10)
                {
                    MessageToast.show("걸어라 걸어 쫌~");
                }
                else if (10 < move && move <= 50)
                {
                    MessageToast.show("걷다 말았냐?");
                }
                else if (50 < move && move <= 100)
                {
                    MessageToast.show("쫌 걸었네");
                }
                else
                {
                    MessageToast.show("많이도 걸었네")
                }
            },
        
//이름반번호 체크
        qcheck: function()
        {
            var vName = "이상현";
            var vClass = "5";
            var vNumber = "12";

            let lName = this.getView().byId("qname").getValue(),
                lClass = this.getView().byId("qclass").getValue(),
                lNumber = this.getView().byId("qnumber").getValue();
            
            if (vName != lName)
            {
                alert("이름이 맞지 않습니다");
            }
            else if (vClass != lClass)
            {
                alert("반이 맞지 않습니다");
            }
            else if (vNumber != lNumber)
            {
                alert("번호가 맞지 않습니다");
            }
            else
            {
                alert("합격");
            }
        },

// 1029 로그인 if || switch
        ulogin: function()
        {
            var vId = "eminem",
                vPw = "8mile";
            let lId = this.getView().byId("uid").getValue(),
                lPw = this.getView().byId("upw").getValue();

            if (vId != lId)
            {
                MessageToast.show("아이디가 없습니다");
            }
            else if (vPw != lPw)
            {
                MessageToast.show("암호가 틀립니다");
            }
            else
            {
                MessageToast.show(vId + "님 반갑습니다");
            }

        },

        //  ulogin: function()
        // {
        //     var vId = "eminem",
        //         vPw = "8mile";
        //     let lId = this.getView().byId("uid").getValue(),
        //         lPw = this.getView().byId("upw").getValue();
            
        //     switch (vId)
        //     {
        //         case lId:
        //             console.log("IOOO");
        //             break;
        //         default:
        //             console.log("IXXX");
        //             break;
        //     }

        //     switch (vPw)
        //     {
        //         case lPw:
        //             console.log("POOO");
        //             break;
        //         default:
        //             console.log("PXXX");
        //             break;
        //     }

        // }






    });
});