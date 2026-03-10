sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], (Controller, JSONModel, Filter, FilterOperator) => {
    "use strict";
    

    return Controller.extend("code1.cl5.edu01.test2.controller.UlalaTest2", {
        onInit() {
            //2-14 
            let oModel214 = new JSONModel("/ball/Base.json");
            this.getView().setModel(oModel214, "ball214");
            
            //2-15
            var oData215 = {
                popul : [
                    {
                        Year: 2018,
                        home: 20499543
                    },
                    {
                        Year: 2019,
                        home: 20891348
                    },
                    {
                        Year: 2020,
                        home: 21484785
                    },
                    {
                        Year: 2021,
                        home: 22022753
                    },
                    {
                        Year: 2022,
                        home: 22383187
                    }
                ],
                born: [
                        {
                        Year:2018 ,
                        birth: 272337
                        },
                        {
                        Year:2019 ,
                        birth: 302676
                        },
                        {
                        Year: 2020,
                        birth: 272337
                        },
                        {
                        Year: 2021,
                        birth: 260562
                        },
                        {
                        Year: 2022,
                        birth: 249186
                        }
                ]
            }
            let oModel215 = new JSONModel(oData215);
            this.getView().setModel(oModel215, "pop215");

            //2-16
            let com216 = {
                GridSet: [
                    {
                        Bukrs: 1000, Gjahr: 2024, Anln1: 48952
                    },
                    {
                        Bukrs: 2000, Gjahr: 2024, Anln1: 5031
                    },
                    {
                        Bukrs: 3000, Gjahr: 2024, Anln1: 47189
                    },
                    {
                        Bukrs: 4000, Gjahr: 2024, Anln1: 19147
                    },
                    {
                        Bukrs: 5000, Gjahr: 2024, Anln1: 1421
                    }
                ]
            };
            let oModel216 = new JSONModel(com216);
            this.getView().setModel(oModel216, "com216");

        },
        //2-11
        gubu211: function(){        
            let in211 = this.getView().byId('guin211').getValue();
            //view의 guin211 input에 입력된 값을 가져옴.

            for (var i = 2; i < 10; i++) {      //2단부터니까 i=2 9단까지니까 i<10
                if (in211 != i) {       //위에서 가져온 input값이 i와 다르다면
                    for (var j = 1; j < 10; j++) {      //구구단 해라 (= in211이 i와 같은 경우엔 하지마)
                        console.log( i + " X " + j + " = " + i * j)
                    }
                }
            }           
        },

        //2-12
        gubu212: function(){
            for (var i = 2; i < 10; i++) {      // i가 2에서 시작해서 9까지 1씩 커질건데
                if (i%2 == 0) {     //i를 2로 나눈 나머지가 0이라면 = i가 짝수라면
                    for (var j = 1; j < 10; j++) {      //구구단 해라 (= i가 홀수면 하지 말라는 뜻)
                        console.log( i + " X " + j + " = " + i * j)
                    }
                }
            } 
        },       
        //참고
        // if (조건A){
        //     continue; }
        // 조건 A일 경우 아무 것도 수행하지 않고 넘어감
        
        //2-13
        bu213: function(){      
            var aArray = [      //Team과 Area를 필드로 갖는 인터널테이블
                            {Team: "기아 타이거즈", Area: "광주"},
                            {Team: "삼성 라이온즈" , Area: "대구"},
                            {Team: "NC다이노스", Area: "창원"},
                            {Team: "두산 베어스", Area: "서울"},
                            {Team: "LG 트윈스", Area: "서울"}
                        ];
            for (var i of aArray){     //for...of는 대상의 값을 직접 갖고 옴(in은 key를 가져옴)
               console.log(i.Team + i.Area)
               //그냥 i를 출력하면 각 레코드들이 나옴. 그래서 i뒤에 .key를 써서 원하는 key를 알려줘야됨
               //그래야 해당 key(필드)의 값들이 출력됨
            }
        },

        // //2-14 
        onSearch: function(){   //searchfield가 2개라서 oEvent는 불필요
                                //oEvent는 search 이벤트가 발생한 필드의 값만 주므로 다른 searchfield의 값을 모른다
                                //그래서 Input처럼 사용해야 함
            var vyear214 = this.getView().byId("year214").getValue("query"), //view의 year214에 입력한 검색어 받기
                varea214 = this.getView().byId("area214").getValue("query"); 

            let oBinding = this.getView().byId("base214").getBinding("rows"),
                oFilter = null,     //제어문 안에서는 변수 선언이 불가능함. 재할당이 가능한 let으로 null 변수를 선언.
                aFilter = [];       // 서치필드가 두개니까 배열 선언
            
            if (vyear214 != "")     //year214가 공백이 아니면 (입력값이 있으면)
            {
                oFilter = new Filter("Year", FilterOperator.EQ, vyear214);
                aFilter.push(oFilter);

            }

            if (varea214 != "")
            {
                oFilter = new Filter("Area", FilterOperator.EQ, varea214);
                aFilter.push(oFilter);
            }
            //두 개의 조건을 if, else if로 묶지 않고 두 개의 if로 분리한 이유:
            //두 조건을 하나의 제어문으로 제어하려면 경우의 수가 많음. (A, B), (!A, B), (!A, !B), (A, !B)
            //SearchField가 하나 추가될 수록 기하급수적으로 많아짐
            //if를 두 개로 분리하면 모든 경우의 수를 따질 필요 없음   


            if (aFilter.length > 0)
            {
                oBinding.filter(aFilter);
            }
            else
                oBinding.filter();
            //aFilter.length > 0
                //이게 무슨 말이냐면 배열에 push된 배열이 하나 이상 있다는 거임
                //이말인즉슨 서치필드에 적어도 하나 입력됐다는 거임
                //그러면 필터링을 적용하라는 뜻으로 
                    //oBinding.filter(aFilter); 필터에 배열필터를 넣은 것
            //else 즉 배열의 길이가 0작으면
                //서치필드에 입력된 값이 없으면
                //필터링을 적용하지 말라는 뜻

        },
        
        





    });
});