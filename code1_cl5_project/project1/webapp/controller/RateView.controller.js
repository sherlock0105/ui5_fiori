sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
  ],
  (Controller, JSONModel, MessageToast, MessageBox) => {
    "use strict";

    return Controller.extend("project1.controller.RateView", {
      /* ───────────────────────────────
       초기화
     ─────────────────────────────── */
      onInit() {
        this.getView().setModel(
          new JSONModel({
            busy: true,
            rateRows: [], // 테이블용
            chartData: [], // VizFrame용
            summary: {
              USD: { rate: "-", diff: "-", diffState: "None" },
              EUR: { rate: "-", diff: "-", diffState: "None" },
              JPY: { rate: "-", diff: "-", diffState: "None" },
            },
            totalCount: 0,
          }),
          "view",
        );

        this._loadRates();
      },

      /* ───────────────────────────────
       새로고침 버튼
     ─────────────────────────────── */
      onRefresh() {
        this._loadRates();
      },

      /* ───────────────────────────────
       OData 조회
     ─────────────────────────────── */
      _loadRates() {
        const oVM = this.getView().getModel("view");
        oVM.setProperty("/busy", true);

        this.getOwnerComponent()
          .getModel()
          .read("/FiRateSet", {
            urlParameters: {
              // Gdatu 오름차순 = 최신 날짜부터 정렬되어 옴
              $orderby: "Fcurr asc,Gdatu asc",
            },
            success: (oData) => {
              oVM.setProperty("/busy", false);
              this._processData(oData.results || []);
            },
            error: (oErr) => {
              oVM.setProperty("/busy", false);
              let sMsg = oErr.message || "조회 실패";
              try {
                sMsg = JSON.parse(oErr.responseText).error.message.value;
              } catch (e) {
                /* ignore */
              }
              MessageBox.error("환율 조회 오류: " + sMsg);
            },
          });
      },

      /* ───────────────────────────────
       데이터 가공 (수정 완료)
     ─────────────────────────────── */
      _processData(aResults) {
        if (!aResults.length) {
          MessageToast.show("조회된 환율 데이터가 없습니다.");
          return;
        }

        // gdatu 역산 → 실제 날짜 변환 함수
        const toRealDate = (sGdatu) => {
          const n = 99999999 - parseInt(sGdatu, 10);
          const s = String(n).padStart(8, "0");
          return `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
        };

        // 1. 기본 통화별 그룹 바스켓 초기화
        const oGroup = { USD: [], EUR: [], JPY: [] };

        aResults.forEach((r) => {
          const sDate = toRealDate(r.Gdatu);
          const fRate = parseFloat(r.Ukurs) || 0;
          if (oGroup[r.Fcurr]) {
            oGroup[r.Fcurr].push({ date: sDate, rate: fRate, gdatu: r.Gdatu });
          }
        });

        // [핵심 수정] 올바른 시계열 계산을 위해 각 통화별 배열을 '과거 -> 최신' 순으로 재정렬
        ["USD", "EUR", "JPY"].forEach((sCurr) => {
          oGroup[sCurr].sort((a, b) => a.date.localeCompare(b.date));
        });

        // 2. 요약 카드 계산 (과거->최신 정렬 상태이므로 0이 과거, 마지막이 최신)
        const oSummary = {};
        ["USD", "EUR", "JPY"].forEach((sCurr) => {
          const arr = oGroup[sCurr];
          if (!arr.length) {
            oSummary[sCurr] = { rate: "-", diff: "-", diffState: "None" };
            return;
          }
          const fLatest = arr[arr.length - 1].rate; // 가장 최신일자 환율
          const fFirst = arr[0].rate; // 7일 전 첫 환율
          const fDiff = fLatest - fFirst;

          oSummary[sCurr] = {
            rate: fLatest.toLocaleString("ko-KR", { minimumFractionDigits: 2 }),
            diff:
              fDiff > 0
                ? `▲ ${fDiff.toFixed(2)}`
                : fDiff < 0
                  ? `▼ ${Math.abs(fDiff).toFixed(2)}`
                  : "변동없음",
            diffState: fDiff > 0 ? "Success" : fDiff < 0 ? "Error" : "None",
          };
        });

        // 3. 차트용 데이터 축 통합 생성 (과거 -> 최신 순 정렬)
        const oDateMap = {};
        Object.entries(oGroup).forEach(([sCurr, arr]) => {
          arr.forEach(({ date, rate }) => {
            if (!oDateMap[date]) {
              oDateMap[date] = { Date: date, USD: null, EUR: null, JPY: null };
            }
            oDateMap[date][sCurr] = rate;
          });
        });
        const aChartData = Object.values(oDateMap).sort((a, b) =>
          a.Date.localeCompare(b.Date),
        );

        // 4. 테이블용 행 데이터 순차적 전일대비 계산
        let aAllRows = [];
        ["USD", "EUR", "JPY"].forEach((sCurr) => {
          const arr = oGroup[sCurr]; // 과거 -> 최신 정렬된 상태
          let fPrevRate = undefined;

          arr.forEach((item) => {
            let sDiff = "-",
              sDiffState = "None";

            if (fPrevRate !== undefined) {
              const d = item.rate - fPrevRate;
              sDiff =
                d > 0
                  ? `▲ ${d.toFixed(2)}`
                  : d < 0
                    ? `▼ ${Math.abs(d).toFixed(2)}`
                    : "0.00";
              sDiffState = d > 0 ? "Success" : d < 0 ? "Error" : "None";
            }

            fPrevRate = item.rate; // 다음 루프를 위해 직전일로 저장

            aAllRows.push({
              Fcurr: sCurr,
              DisplayDate: item.date,
              Ukurs: item.rate,
              UkursFmt: item.rate.toLocaleString("ko-KR", {
                minimumFractionDigits: 2,
              }),
              Diff: sDiff,
              DiffState: sDiffState,
            });
          });
        });

        // [UX 개선] 테이블 출력 시에는 최신 날짜 데이터가 맨 위로 오도록 역정렬
        aAllRows.sort((a, b) => {
          if (a.DisplayDate !== b.DisplayDate) {
            return b.DisplayDate.localeCompare(a.DisplayDate); // 날짜 내림차순
          }
          return a.Fcurr.localeCompare(b.Fcurr); // 통화 오름차순
        });

        // view 모델 최종 반영
        const oVM = this.getView().getModel("view");
        oVM.setProperty("/summary", oSummary);
        oVM.setProperty("/chartData", aChartData);
        oVM.setProperty("/rateRows", aAllRows);
        oVM.setProperty("/totalCount", aAllRows.length);

        // VizFrame 세팅 활성화
        this._setVizProps();
      },

      /* ───────────────────────────────
       VizFrame 속성 설정
     ─────────────────────────────── */
      _setVizProps() {
        const oViz = this.byId("vizFrame");
        if (!oViz) return;
        oViz.setVizProperties({
          title: { visible: false },
          legend: { visible: true, position: "bottom" },
          plotArea: {
            dataLabel: { visible: false },
            window: { start: "firstDataPoint", end: "lastDataPoint" },
          },
          valueAxis: {
            title: { visible: true, text: "환율 (원)" },
            gridline: { visible: true },
          },
          categoryAxis: { title: { visible: false } },
          interaction: { selectability: { mode: "EXCLUSIVE" } },
        });
      },
    });
  },
);
