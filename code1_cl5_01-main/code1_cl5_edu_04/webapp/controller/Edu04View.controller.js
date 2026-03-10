sap.ui.define(["sap/ui/core/mvc/Controller"], (Controller) => {
  "use strict";

  return Controller.extend(
    "code.cl5.edu04.code1cl5edu04.controller.Edu04View",
    {
      onInit() {},

      forCheck01: function () {
        for (var i = 0; i < 10; i++) {
          console.log("i = " + i); // 콘솔 로그 창에 "i = "와 i 값을 출력. i는 변수니까 따옴표 X. 문자열 옆에 오는 +는 이어서 쓰라는 거
          for (var j = 0; j < 5; j++) {
            console.log(i + "+" + j + "=" + (i + j));
          }
        }
      },

      onGugudan: function () {
        // for문으로 구구단
        // for(var i = 2; i < 10; i++)
        // {
        //     for(var j = 1; j < 10; j++)
        //     {
        //         console.log(i+ " X " +j+ " = " +(i*j));
        //     }
        // }

        //while문으로 구구단
        var i = 1,
          j = 1;
        while (i < 10) {
          i++;

          while (j < 10) {
            j++;
            console.log(i + " X " + j + " = " + i * j);
          }
        }
      },

      onGugudan_n: function () {
        // for 문으로 구구단
        // let lGu = this.getView().byId("gugu").getValue()
        // for(var i = 1; i <= lGu; i++)
        // {
        //     for(var j = 1; j < 10; j++)
        //     {
        //         console.log(i+ " X " +j+ " = " +(i*j));
        //     }
        // }

        //while 문으로 구구단
        let lGu = this.getView().byId("gugu").getValue();
        var i = 2,
          j = 1;
        while (i <= lGu) {
          j = 1; // i while, j while 한바퀴 돌고 나면 j는 9인 상태라 더이상 돌지 않음 (2단만 돌고 끝남)
          // 그래서 j while 돌기 전에 j = 1;로 clear 시켜줘야 함

          while (j < 10) {
            console.log(i + "X" + j + "=" + i * j);
            j++;
          }
          i++;
        }
      },
      onMultiArray: function () {
        let aNumber = [
          [1, 2],
          [3, 4],
          [5, 6],
          [7, 8],
        ];
        aNumber.push([9, 10]); // 배열 "마지막 행"으로 추가됨
        for (var i = 0; i < aNumber.length; i++) {
          for (
            var j = 0;
            j < 2;
            j++ // j < 2를 다른 방식으로: aNumber[i].length <- 배열 열의 길이
          ) {
            console.log("aNumber[" + i + "][" + j + "] = " + aNumber[i][j]);
          }
        }
      },

      forCheck02: function () {
        let aNumber = ["A", "B", "C", "D"];

        for (var i in aNumber) // abap에서는 loop가 이 역할 //cf) aNumber.length <-이건 배열의 길이 값을 준 것 //in <- index의 in. i가 배열 안에서 배열 데이터의 개수만큼 알아서 돎. (배열의 순서를 던져줌)
        {
          // console.log(i) <- 배열의 순서를 출력: 0, 1, 2, 3
          console.log("aNumber[" + i + "] = " + aNumber[i]); // aNumber[i] <- 이렇게 해야 배열의 순서에 해당하는 값을 출력
        }
        for (var i of aNumber) { //cf) in <- 배열의 순서를 던져줌 //of <- 배열의 데이터를 직접 던져줌.
          console.log(i);
        }
      },

      whileCheck01: function () {
        var i = 1;

        while (i <= 10) {
          console.log(i + "번째 회전");
          i++;
        }

        //var i = 0;

        do {
          i++;
          console.log(i + "do 번째 회전");
        } while (i <= 10);
        // 이 경우 while에서 i가 10이 될 때 까지 10번 돌고 do while로 나옴.
        // do while은 조건을 확인하지 않고 일단 한 번 돌림.
        // 돌린 후 조건을 확인하고 멈춤.
        // 결과: while에서 10번, do while에서 1번 돌음
        // 이것을 방지하기 위해 while과 do while 사이에 i를 clear 시켜야 함: var i = 0;
        // var i = 0;을 넣으면, while은 10회전, do while은 11회전 (do while은 실행 코드가 증감문, 조건문 보다 앞에 있기 때문)
        // do while 10회전만 시키려면 while ( i <= 10); 이걸 while ( i < 10); 이렇게 수정
      },
    },
  );
});
