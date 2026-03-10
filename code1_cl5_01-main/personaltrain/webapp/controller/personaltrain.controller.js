sap.ui.define([
    "sap/ui/core/mvc/Controller"
], (Controller) => {
    "use strict";

    return Controller.extend("pt.personaltrain.controller.personaltrain",
        {
            onInit() {

            },

            left: function () {
                this.getView().byId("txt").setTextAlign("Left");
            },

            center: function () {
                this.getView().byId("txt").setTextAlign("Center");
            },

            right: function () {
                this.getView().byId("txt").setTextAlign("Right");
            },

            mock: function () {
                let copy = this.getView().byId("txt").getTextAlign();
                this.getView().byId("sat").setTextAlign(copy);
                console.log(typeof (this));
            },

            // 1030 실습
            grade: function () {
                let lt_chart = [
                    { Name: "박도현", Age: "100", Grade: "A" },
                    { Name: "임도은", Age: "50", Grade: "B" },
                    { Name: "서윤지", Age: "25", Grade: "C" }
                ];
                console.log("r-----------------for in-----------------ㄱ")
                for (var ls_tabix in lt_chart) {
                    switch (lt_chart[ls_tabix].Name) {
                        case "박도현":
                            lt_chart[ls_tabix].Name = "잔나비";
                            break;
                    }

                    if (80 <= lt_chart[ls_tabix].Age) {
                        lt_chart[ls_tabix].Grade = "C"
                    }
                    else if (30 <= lt_chart[ls_tabix].Age && lt_chart[ls_tabix].Age < 80) {
                        lt_chart[ls_tabix].Grade = "B"
                    }
                    else if (lt_chart[ls_tabix].Age < 30) {
                        lt_chart[ls_tabix].Grade = "C"
                    }


                    console.log(lt_chart[ls_tabix]); // 테이블 뒤에 '()' 아니고 '[]'
                }

                console.log("r-----------------for of-----------------ㄱ")
                for (var ls_chart of lt_chart) {
                    switch (ls_chart.Name) {
                        case "박도현":
                            ls_chart.Name = "잔나비";
                            break;
                    }

                    if (80 <= ls_chart.Age) // "=>"는 안됨
                    {
                        ls_chart.Grade = "C"
                    }
                    else if (30 <= ls_chart.Age && ls_chart.Age < 80) {
                        ls_chart.Grade = "B"
                    }
                    else if (ls_chart.Age < 30) {
                        ls_chart.Grade = "A"
                    }

                    console.log(ls_chart);
                }

                console.log("r-----------------while-----------------ㄱ")
                let wh_tabix = 0;
                while (wh_tabix < wh_tabix.maxlength) {
                    console.log(
                        lt_chart[wh_tabix].Name + ", " +
                        lt_chart[wh_tabix].Age + ", " +
                        lt_chart[wh_tabix].Grade
                    );
                    wh_tabix++;
                }


                console.log("r-----------------do while-----------------ㄱ")
                let dwh_tabix = 0;
                do {
                    //dwh_tabix++
                    switch (lt_chart[dwh_tabix].Name) {
                        case "잔나비":
                            lt_chart[dwh_tabix].Name = "박도현";
                            break;
                    }

                    // console.log(
                    //     lt_chart[dwh_tabix].Name + ", " +
                    //     lt_chart[dwh_tabix].Age + ", " +
                    //     lt_chart[dwh_tabix].Grade
                    // );

                    if (80 <= lt_chart[dwh_tabix].Age) {
                        lt_chart[dwh_tabix].Grade = "A";
                    }
                    else if (30 <= lt_chart[dwh_tabix].Age && lt_chart[dwh_tabix].Age < 80) {
                        lt_chart[dwh_tabix].Grade = "B";
                    }
                    else if (lt_chart[dwh_tabix].Age < 30) {
                        lt_chart[dwh_tabix].Grade = "C";
                    }
                    console.log(
                        lt_chart[dwh_tabix].Name + ", " +
                        lt_chart[dwh_tabix].Age + ", " +
                        lt_chart[dwh_tabix].Grade
                    );
                    dwh_tabix++
                }
                while (dwh_tabix < lt_chart.length);
                
            },







            // onClick: function (info) // 매개변수로 정보 받기
            // {
            //     console.log(info) 
            // },

            // var 일반 지정
            // flight: function()
            // {
            //     let aAirline = ['AA', 'KA', 'LH', 'DL', 'QA'];
            //     for (var i = 0; i < aAirline.length; i++)
            //     {
            //         if (aAirline[i] == "KA")
            //         {
            //             console.log("Korean Air");
            //         }
            //         else if (aAirline[i] == "DL")
            //         {
            //             console.log("Delta Air");
            //         }
            //         else if (aAirline[i] == "QA")
            //         {
            //             console.log("Qatar Air");
            //         }
            //         else
            //         {
            //             console.log("Nothing");
            //         }

            //         switch (aAirline[i])
            //         {
            //             case 'AA':
            //                 console.log("Amercan Air");
            //                 break;

            //             case 'LH':
            //                 console.log("Luft Hansa");
            //                 break;
            //             default:
            //                 console.log("Etc");
            //                 break;
            //         }

            //     }

            // }

            //var i in~
            // flight: function()
            // {
            //     let aAirline = ['AA', 'KA', 'LH', 'DL', 'QA'];

            //     for (var i in aAirline)
            //     {
            //         if (aAirline[i] == "KA")
            //         {
            //             console.log("Korean Air");
            //         }
            //         else if (aAirline[i] == "DL")
            //         {
            //             console.log("Delta Air");
            //         }
            //         else if (aAirline[i] == "QA")
            //         {
            //             console.log("Qatar Air");
            //         }
            //         else
            //         {
            //             console.log("Nothing");
            //         }
            //     }

            // }

            // var i of ~
            // flight: function()
            //     {
            //         let aAirline = ['AA', 'KA', 'LH', 'DL', 'QA'];

            //         for (var i of aAirline)
            //         {
            //             if (i == "KA")
            //             {
            //                 console.log("Korean Air");
            //             }
            //             else if (i == "DL")
            //             {
            //                 console.log("Delta Air");
            //             }
            //             else if (i == "QA")
            //             {
            //                 console.log("Qatar Air");
            //             }
            //             else
            //             {
            //                 console.log("Nothing");
            //             }

            //             switch (i)
            //             {
            //                 case 'AA':
            //                         console.log("American Air");
            //                         break;
            //                 case 'LH':
            //                         console.log("Luft Hansa");
            //                         break;
            //                 default:
            //                         console.log("Etc")
            //                         break;

            //             }

            //         }

            //     }





        });
});