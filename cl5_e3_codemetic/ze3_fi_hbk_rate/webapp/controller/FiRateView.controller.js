sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
  ],
  (Controller, JSONModel, MessageToast, MessageBox) => {
    "use strict";

    // ── 포맷 유틸 ──────────────────────────────────────────────
    function _fmt(n) {
      return Math.abs(parseFloat(n) || 0).toLocaleString("ko-KR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    function _fmtKrw(n) {
      return Math.round(Math.abs(parseFloat(n) || 0)).toLocaleString("ko-KR");
    }
    function _fmtKpi(n) {
      var abs = Math.abs(Math.round(parseFloat(n) || 0));
      if (abs >= 100000000)
        return Math.floor(abs / 100000000).toLocaleString("ko-KR") + " 억";
      if (abs >= 10000)
        return Math.floor(abs / 10000).toLocaleString("ko-KR") + " 만";
      return abs.toLocaleString("ko-KR");
    }

    // 통화 표시 순서 (KRW 맨 앞)
    var _ORDER = ["KRW", "USD", "EUR", "JPY"];
    function _cmpCurrency(a, b) {
      var ia = _ORDER.indexOf(a.Fwaer),
        ib = _ORDER.indexOf(b.Fwaer);
      if (ia < 0) ia = 99;
      if (ib < 0) ib = 99;
      return ia !== ib ? ia - ib : b._totalEval - a._totalEval;
    }

    // ──────────────────────────────────────────────────────────

    return Controller.extend(
      "ze3.fi.hbk.rate.ze3fihbkrate.controller.FiRateView",
      {
        onInit: function () {
          var oToday = new Date();
          var sToday =
            oToday.getFullYear() +
            ("0" + (oToday.getMonth() + 1)).slice(-2) +
            ("0" + oToday.getDate()).slice(-2);

          this.getView().setModel(
            new JSONModel({
              busy: false,
              hasData: false,
              summaryText: "",
              summaryType: "Information",
              totalKrwFmt: "0",
              currencyCards: [],
              items: [],
              hasRateNotice: false,
              rateNotice: "",
            }),
            "view",
          );

          this.byId("idEvdat").setValue(sToday);
        },

        onAfterRendering: function () {
          if (this._bInitialSearchDone) return;
          this._bInitialSearchDone = true;
          this.getOwnerComponent()
            .getModel()
            .metadataLoaded()
            .then(
              function () {
                this.onSearch();
              }.bind(this),
            );
        },

        // ── 조회 ─────────────────────────────────────────────────
        // ZCDS_E3_FI_0012 : LEFT OUTER JOIN(환율)
        //   USD/EUR/JPY → Ukurs = 환율값
        //   KRW         → Ukurs = NULL, Dmbtr = 실제 원화 잔액
        onSearch: function () {
          var sEvdat = this.byId("idEvdat").getValue();
          if (!sEvdat) {
            MessageToast.show("조회 기준일을 선택해주세요.");
            return;
          }

          var sClean = sEvdat.replace(/-/g, "");
          if (sClean.length !== 8) {
            MessageToast.show("올바른 날짜 형식이 아닙니다.");
            return;
          }

          var oDate = new Date(
            Date.UTC(
              parseInt(sClean.slice(0, 4), 10),
              parseInt(sClean.slice(4, 6), 10) - 1,
              parseInt(sClean.slice(6, 8), 10),
            ),
          );

          var oVM = this.getView().getModel("view");
          oVM.setProperty("/busy", true);
          oVM.setProperty("/hasData", false);
          oVM.setProperty("/hasRateNotice", false);

          // 오늘 환율 없으면 전일 ~ 최대 7일 전 폴백
          this._loadWithFallback(oDate, 0, oVM);
        },

        // ── 환율 폴백 조회 ───────────────────────────────────────
        // nBack: 기준일에서 몇 일 전 날짜로 쿼리할지
        _loadWithFallback: function (oTargetDate, nBack, oVM) {
          if (nBack > 7) {
            oVM.setProperty("/busy", false);
            MessageBox.warning(
              "7일 이내 환율 데이터가 없습니다.\n관리자에게 문의하세요.",
            );
            return;
          }

          // 기준일에서 nBack일 전 날짜 계산
          var oQueryDate = new Date(
            Date.UTC(
              oTargetDate.getUTCFullYear(),
              oTargetDate.getUTCMonth(),
              oTargetDate.getUTCDate() - nBack,
            ),
          );

          var oModel = this.getOwnerComponent().getModel();
          var sPath =
            "/" +
            oModel.createKey("ZCDS_E3_FI_0012", { P_EVDAT: oQueryDate }) +
            "/Set";

          oModel.read(sPath, {
            success: function (d) {
              var aResults = d.results || [];
              var aFx = aResults.filter(function (r) {
                return r.Fwaer !== "KRW";
              });

              // 외화 행이 있는데 Ukurs 가 모두 NULL/0 → 환율 없음 → 하루 더 이전으로 재시도
              var bHasRate = aFx.some(function (r) {
                return Math.abs(parseFloat(r.Ukurs) || 0) > 0;
              });
              if (aFx.length && !bHasRate) {
                this._loadWithFallback(oTargetDate, nBack + 1, oVM);
                return;
              }

              oVM.setProperty("/busy", false);
              if (!aResults.length) {
                MessageToast.show("조회된 데이터가 없습니다.");
                return;
              }

              // 폴백된 경우 안내 메시지 표시
              if (nBack > 0) {
                var sQ =
                  oQueryDate.getUTCFullYear() +
                  "-" +
                  ("0" + (oQueryDate.getUTCMonth() + 1)).slice(-2) +
                  "-" +
                  ("0" + oQueryDate.getUTCDate()).slice(-2);
                oVM.setProperty("/hasRateNotice", true);
                oVM.setProperty(
                  "/rateNotice",
                  "기준일 환율 없음 — " +
                    sQ +
                    " 환율 적용 (" +
                    nBack +
                    "일 전)",
                );
              }

              this._process(aResults, oVM);
            }.bind(this),
            error: function (e) {
              oVM.setProperty("/busy", false);
              var sMsg = e.message;
              try {
                sMsg = JSON.parse(e.responseText).error.message.value;
              } catch (x) {}
              MessageBox.error("조회 오류: " + sMsg);
            }.bind(this),
          });
        },

        // ── 데이터 가공 ──────────────────────────────────────────
        _process: function (aRaw, oVM) {
          var mSummary = {};
          var fTotal = 0;
          var fFxTotal = 0;
          var fKrwTotal = 0;

          // ① 계좌별 상세 아이템
          var aItems = aRaw.map(function (r) {
            var bKrw = r.Fwaer === "KRW";
            // KRW: Wrbtr=0, 원화 잔액은 Dmbtr에 있음
            var fWrbtr = bKrw
              ? parseFloat(r.Dmbtr) || 0
              : parseFloat(r.Wrbtr) || 0;
            var fUkurs = bKrw ? 1 : Math.abs(parseFloat(r.Ukurs) || 0);
            var fEval = bKrw ? fWrbtr : fWrbtr * fUkurs;

            if (!mSummary[r.Fwaer]) {
              mSummary[r.Fwaer] = {
                Fwaer: r.Fwaer,
                TotalWrbtr: 0,
                Ukurs: fUkurs,
                TotalEval: 0,
                IsKrw: bKrw,
              };
            }
            mSummary[r.Fwaer].TotalWrbtr += fWrbtr;
            mSummary[r.Fwaer].TotalEval += fEval;
            fTotal += fEval;
            if (bKrw) fKrwTotal += fEval;
            else fFxTotal += fEval;

            return {
              Hbkid: r.Hbkid,
              Hktid: r.Hktid,
              Fwaer: r.Fwaer,
              // KRW는 소수점 없이, 외화는 소수점 2자리
              WrbtrFmt: bKrw ? _fmtKrw(fWrbtr) : _fmt(fWrbtr),
              UkursFmt: bKrw ? "-" : _fmt(fUkurs),
              EvalKrwFmt: _fmtKrw(fEval),
              IsKrw: bKrw,
              _evalKrw: fEval,
            };
          });

          // ② 통화별 요약 (KRW 우선 정렬)
          var aSummary = Object.keys(mSummary)
            .map(function (key) {
              var s = mSummary[key];
              return {
                Fwaer: s.Fwaer,
                // KRW: 소수점 없이
                TotalWrbtrFmt: s.IsKrw
                  ? _fmtKrw(s.TotalWrbtr)
                  : _fmt(s.TotalWrbtr),
                UkursFmt: s.IsKrw ? "-" : _fmt(s.Ukurs),
                TotalEvalFmt: _fmtKrw(s.TotalEval),
                IsKrw: s.IsKrw,
                _totalEval: s.TotalEval,
              };
            })
            .sort(_cmpCurrency);

          // ③ 카드 데이터 빌드 (계좌 목록 포함)
          var aCurrencyCards = aSummary.map(function (s) {
            var aAccts = aItems.filter(function (item) {
              return item.Fwaer === s.Fwaer;
            });
            return {
              title: s.IsKrw ? "KRW 원화 보유" : s.Fwaer + " 외화 보유",
              subtitle: s.IsKrw
                ? "원화 직접 보유"
                : "환율  " + s.UkursFmt + " 원",
              fwaer: s.Fwaer,
              totalWrbtrFmt: s.TotalWrbtrFmt,
              totalEvalFmt: s.TotalEvalFmt,
              isKrw: s.IsKrw,
              cssClass: "fxCurrCard fxCurrCard--" + s.Fwaer,
              icon: s.IsKrw ? "sap-icon://home" : "sap-icon://money-bills",
              accounts: aAccts,
            };
          });

          // ④ 차트 데이터
          var aChartData = aItems
            .map(function (item) {
              return {
                Label: item.Fwaer + " / " + item.Hktid,
                EvalKrw: item._evalKrw,
              };
            })
            .sort(function (a, b) {
              return b.EvalKrw - a.EvalKrw;
            });

          // ⑤ 요약 메시지
          var fxCount = Object.keys(mSummary).filter(function (k) {
            return k !== "KRW";
          }).length;
          var sSummary =
            "합계 : " +
            _fmtKrw(fTotal) +
            " 원" +
            "   |   외화 평가 : " +
            _fmtKrw(fFxTotal) +
            " 원" +
            "   |   원화 보유 : " +
            _fmtKrw(fKrwTotal) +
            " 원" +
            "   |   외화 통화 수 : " +
            fxCount +
            " 종";

          oVM.setProperty("/currencyCards", aCurrencyCards);
          oVM.setProperty("/items", aItems);
          oVM.setProperty("/totalKrwFmt", _fmtKrw(fTotal));
          oVM.setProperty("/summaryText", sSummary);
          oVM.setProperty("/summaryType", "Information");
          this._updateChart(aChartData);
          oVM.setProperty("/hasData", true);
        },

        // ── 차트 ─────────────────────────────────────────────────
        _updateChart: function (aChartData) {
          var oVizFrame = this.byId("idPnlChart");
          if (!oVizFrame) return;

          sap.ui.require(
            [
              "sap/viz/ui5/data/FlattenedDataset",
              "sap/viz/ui5/controls/common/feeds/FeedItem",
            ],
            function (FlattenedDataset, FeedItem) {
              oVizFrame.setVizType("bar");
              oVizFrame.setModel(new JSONModel({ data: aChartData }));
              oVizFrame.setDataset(
                new FlattenedDataset({
                  dimensions: [{ name: "계좌 / 통화", value: "{Label}" }],
                  measures: [{ name: "KRW 평가", value: "{EvalKrw}" }],
                  data: { path: "/data" },
                }),
              );
              if (!oVizFrame.getFeeds().length) {
                oVizFrame.addFeed(
                  new FeedItem({
                    uid: "valueAxis",
                    type: "Measure",
                    values: ["KRW 평가"],
                  }),
                );
                oVizFrame.addFeed(
                  new FeedItem({
                    uid: "categoryAxis",
                    type: "Dimension",
                    values: ["계좌 / 통화"],
                  }),
                );
              }
              oVizFrame.setVizProperties({
                title: { visible: false },
                legend: { visible: false },
                plotArea: {
                  dataLabel: { visible: false },
                  colorPalette: ["#1565c0"],
                },
                valueAxis: { title: { visible: true, text: "KRW (원)" } },
                categoryAxis: { title: { visible: false } },
              });
            },
          );
        },

        // ── Excel 내보내기 ────────────────────────────────────────
        onExport: function () {
          var aItems = this.getView().getModel("view").getProperty("/items");
          var sDate = this.byId("idEvdat").getValue().replace(/-/g, "");

          sap.ui.require(
            ["sap/ui/export/Spreadsheet"],
            function (Spreadsheet) {
              new Spreadsheet({
                workbook: {
                  columns: [
                    { label: "하우스뱅크", property: "Hbkid" },
                    { label: "계좌 ID", property: "Hktid" },
                    { label: "통화", property: "Fwaer" },
                    { label: "잔액", property: "WrbtrFmt" },
                    { label: "환율", property: "UkursFmt" },
                    { label: "KRW 평가", property: "EvalKrwFmt" },
                  ],
                },
                dataSource: aItems,
                fileName: "외화보유현황_" + sDate + ".xlsx",
              })
                .build()
                .then(function () {
                  MessageToast.show("Excel 다운로드 완료");
                })
                .catch(function (e) {
                  MessageBox.error("Excel 저장 실패: " + (e.message || ""));
                });
            }.bind(this),
          );
        },
      },
    );
  },
);
