sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
    "use strict";
    // return 위에서 선언하는 변수: 광역 변수
    // 함수 안에서 선언하는 변수: 지역 변수
    return Controller.extend("code1.cl5.edu08.code1cl5edu08.controller.Edu08View", {
        onInit()
        {

        },


        onArrayCheck: function()
        {   console.log("r----------internal table 수업--------------ㄱ");
            let aArray = ['A', 'B', 'C', 'D' ], 
                vNum = 0; // of로 배열을 불러온 경우 배열의 key를 알기 위해 사용
            
                // #1
            for (var index in aArray)
                // for (var 변수 in 배열): 배열의 자리(Key)를 변수로 가져옴
            {
                console.log(index + ":" + aArray[index]); 
                // index: 배열의 숫자(자리 = key), aArray[index]: 해당 자리에 있는 aArray의 값
            }

            for (var value of aArray)
                // for (var 변수 of 배열): 배열의 값(Value)을 변수로 가져옴
            {
                console.log(value);
                // aArray의 값을 출력. of만으로 배열의 value를 가져온 경우엔 배열의 key를 알 수는 없음
                // 알고싶다면 변수를 추가로 부여해야됨
            }

            for (var value of aArray)
            {
                console.log(vNum + ":" + value);
                vNum++;
                // aArray의 값을 출력. of만으로 배열의 value를 가져온 경우엔 배열의 key를 알 수는 없음
                // 알고싶다면 변수를 추가로 부여해야됨
            }

        },

        onJsonWaCheck: function()
        {
            let oData = { Name: "홍길동", Age: "500", Area: "Hanyang" };
            
            // #1
            // for(var index in oData)
            //     // for (var 변수 in 배열): 객체{JSON}의 Key를 변수로 가져옴
            //         //비교: [배열]에서는 Key가 0, 1, 2... 숫자지만 {JSON}은 ":"앞에 입력해둔 것이 Key임
            // {
            //     console.log( index + ":" + oData[index] );
            //     // oData[index]: 해당 자리에 있는 oData의 값
            // }

            // #2
            for(var value of oData)
            {
                console.log( value );
            }
            // 에러난다. 
            // "for of"는 배열 요소를 반복하는 반복문 --> [배열]이 아닌 {객체(단일행만 가능)}이기 때문에 에러 발생
                // Teacher: for of 루프는 단일 구조는 안되고 배열처럼 1개 이상의 구조를 가질 수 있는 경우만 가능
                // 따라서, for of는 불가능함. oData가 현재 한개의 구조로만 되어있기 때문
                // JSON 구조를 배열의 형태로 하면 "for of" 사용 가능
            // "for in"은 객체의 속성을 반복하는 반복문 @@ '객체 JSON'을 말하는 게 아니라 대상(object)을 의미하는 객체임
                // Teacher: for in 루프는 연속으로 된 구조면 가능
        },

        onJsonItabCheck: function ()
        {
            // 인터널 테이블
            let lt_data = [
                            {Name: "홍길동", Age:"500", Area:"한양" },   // 0행
                            {Name: "김길동", Age:"400", Area:"경성" },   // 1행
                            {Name: "고길동", Age:"700", Area:"한성" }    // 2행
                          ];
                // lt: local table

            // for(let lv_tabix in lt_data)
            //     // tabix = 0: 0행이라는 뜻. tabix = 2: 2행이라는 뜻
            // {
            //     console.log(lv_tabix + "행 " + lt_data[lv_tabix].Name + "," + lt_data[lv_tabix].Age);
            //     // 한번에 한 행씩 출력함
            //     // 뒤에 점 찍으면 Key별로 필터링 가능
            //     // lt_data[0].Name : 홍길동 -- lt_data 0행 Name의 Value
            //     // lt_data <- internal table
            //     // lt_data[0] <- work area (== structure)
            //     // lt_data[1] <- work area (== structure)
            //     // lt_data[2] <- work area (== structure)

            //     console.log(lt_data.Name);
            //     //이러면 "undefined". Internal table 전체만 볼 수 있고 각 record 내부는 볼 수 없음
            //     //console.log(lt_data[0].Name) 이렇게 work space를 제시해야됨
            // }

            for(let ls_data of lt_data)
                // for...of는 lt_data에서 value(data)를 직접 받아오기 때문에 ls_data로 네이밍
                    //ls = local structure
                // cf) lt_tabix / ls_data
                    // lt_tabix는 for...in으로 table에서 자리의 숫자(index)를 받아오므로 table의 index를 의미
                    // ls_data는 for...of로 table에서 data(value)를 받아오므로 data로 네이밍
            {  
                console.log(ls_data.Name);
            }

        },
        

        onItab01: function()
        {   console.log("r----------internal table 실습1--------------ㄱ");

            let lt_data1 =[
                            {Matnr: "ST_01", Maktx:"Steel", Werks:"1010", Lgort:"L1000"}, // 0 레코드
                            {Matnr: "RPX321", Maktx:"Road Steel", Werks:"1020", Lgort:"L2000"}, // 1 레코드
                            {Matnr: "EL_GANG", Maktx:"Strong Steel", Werks:"1030", Lgort:"L3000"} // 2 레코드
                          ]; // 테이블

            for (var lv_tabix in lt_data1) //for문을 쓰는 이유: 변수가 테이블만큼 회전하며 값을 읽어옴. 추가적인 조건이 없다면 테이블의 모든 행을 읽음
            {
                // Matnr 필드의 값이 'ST_01' 이면 Werks 필드의 값을 '1000' 으로 바꿔라
                if (lt_data1[lv_tabix].Matnr == "ST_01")
                {
                    lt_data1[lv_tabix].Werks = "1000";
                }

                // Lgort 필드의 값이 'L3000'이면 Maktx 필드의 값을 '3000'으로 바꿔라 (switch 구문 사용)
                switch (lt_data1[lv_tabix].Lgort)
                {
                    case "L3000":
                        lt_data1[lv_tabix].Maktx = "3000";
                        break;

                // switch (lt_data1[lv_tabix].Lgort == "L3000")
                // {
                //     case lt_data1[lv_tabix].Maktx = "3000":
                //         break;
                // }
                }



                console.log(   lt_data1[lv_tabix].Matnr + ", "
                             + lt_data1[lv_tabix].Maktx + ", "
                             + lt_data1[lv_tabix].Werks + ", "
                             + lt_data1[lv_tabix].Lgort
                           );
            }

            for (let ls_data1 of lt_data1)
            {
                // Matnr 필드의 값이 'ST_01' 이면 Werks 필드의 값을 '1000' 으로 바꿔라
                if (ls_data1.Matnr == "ST_01")
                {
                    ls_data1.Werks = "1000";
                }

                // Lgort 필드의 값이 'L3000'이면 Maktx 필드의 값을 '3000'으로 바꿔라 (switch 구문 사용)
                switch (ls_data1.Lgort)
                {
                    case "L3000":
                        ls_data1.Maktx = "3000";
                        break;
                }


                console.log(  ls_data1.Matnr + ", "
                            + ls_data1.Maktx + ", "
                            + ls_data1.Werks + ", "
                            + ls_data1.Lgort
                           );
            }
        },

        onAirline: function ()
        {   console.log("r----------internal table 실습2--------------ㄱ");

            let lt_itab =[
                            {Carrid: "AA", Carrname: "American Air", Price: "23145", Currkey: "USD"},
                            {Carrid: "LH", Carrname: "Luft Hansa", Price: "132435", Currkey: "EUR"},
                            {Carrid: "KO", Carrname: "Korean Air", Price: "2345", Currkey: "KRW"},
                            {Carrid: "DL", Carrname: "Dleta Air", Price: "8475", Currkey: "USD"},
                            {Carrid: "UA", Carrname: "United Air", Price: "95685", Currkey: "USD"},
                            {Carrid: "AF", Carrname: "Air France", Price: "98450", Currkey: "EUR"}
                         ];

            for(let ls_itab of lt_itab) // For로 쓰면 안 됨. 대소문자 주의
            {
                switch (ls_itab.Carrid)
                {
                    case "KO":
                        ls_itab.Currkey = "원화";
                        break;
                }

                if (ls_itab.Carrid == "AA" || ls_itab.Carrid == "DL")
                {
                    ls_itab.Currkey = "달러";
                }
                else if (ls_itab.Carrid == "LH" || ls_itab.Carrid == "AF")
                {
                    ls_itab.Currkey = "유로";
                }

            console.log(ls_itab.Carrid + ", "+
                        ls_itab.Carrname + ", "+
                        ls_itab.Price + ", "+
                        ls_itab.Currkey
                       )
            }

            for (var lv_itab in lt_itab)
            {
                switch (lt_itab[lv_itab].Carrid)
                {
                    case "KO":
                        lt_itab[lv_itab].Currkey = "원화";
                        break;
                }

                if (lt_itab[lv_itab].Carrid == "AA" || lt_itab[lv_itab].Carrid == "DL")
                {
                    lt_itab[lv_itab].Currkey = "달러"
                }
                else if (lt_itab[lv_itab].Carrid == "LH" || lt_itab[lv_itab].Carrid == "AF")
                {
                    lt_itab[lv_itab].Currkey = "유로"
                }

                console.log(
                            lt_itab[lv_itab].Carrid + ", "+
                            lt_itab[lv_itab].Carrname + ", "+
                            lt_itab[lv_itab].Price + ", "+
                            lt_itab[lv_itab].Currkey
                           )
            }

        },


        onItab02: function()
        {   console.log("r----------internal table 마트료시카 수업--------------ㄱ");
            let oData= {
                         lt_mat: [
                                    {Matnr: "ST_01", Maktx:"Steel", Werks:"1010", Lgort:"L1000"},
                                    {Matnr: "RPX321", Maktx:"Road Steel", Werks:"1020", Lgort:"L2000"},
                                    {Matnr: "EL_GANG", Maktx:"Strong Steel", Werks:"1030", Lgort:"L3000"}
                                 ],     

                         lt_mat2: [
                                     {Matnr: "ST_01", Maktx:"Steel", Werks:"1010", Lgort:"L1000"},
                                     {Matnr: "RPX321", Maktx:"Road Steel", Werks:"1020", Lgort:"L2000"},
                                     {Matnr: "EL_GANG", Maktx:"Strong Steel", Werks:"1030", Lgort:"L3000"}
                                  ]                           
                       } // 두개(이상) 이상의 internal table이 하나의 oData(JSON)에 들어있음
                          
                console.log(oData.lt_mat);
        },

            




    });
});