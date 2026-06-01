sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
  ],
  function (Controller, JSONModel, MessageToast, MessageBox) {
    "use strict";

    var CLASS_MAP = {
      11: { sec: "asset",  roman: "Ⅰ",  lv2: "유동자산",           sort: 1 },
      13: { sec: "asset",  roman: "Ⅱ",  lv2: "비유동자산",         sort: 2 },
      21: { sec: "liab",   roman: "Ⅰ",  lv2: "유동부채",           sort: 1 },
      23: { sec: "liab",   roman: "Ⅱ",  lv2: "비유동부채",         sort: 2 },
      31: { sec: "equity", roman: "Ⅰ",  lv2: "납입자본",           sort: 1 },
      32: { sec: "equity", roman: "Ⅱ",  lv2: "이익잉여금",         sort: 2 },
      33: { sec: "equity", roman: "Ⅲ",  lv2: "기타포괄손익누계액", sort: 3 },
    };

    function _fmt(n) {
      if (n === 0) return "-";
      return (n < 0 ? "(" : "") +
        Math.abs(Math.round(n)).toLocaleString("ko-KR") +
        (n < 0 ? ")" : "");
    }

    function _fmtKpi(n) {
      if (n === 0) return "0";
      var abs = Math.abs(Math.round(n));
      var sign = n < 0 ? "-" : "";
      if (abs >= 1000000000000) {
        return sign + (abs / 1000000000000).toFixed(1) + " 조";
      }
      if (abs >= 100000000) {
        return sign + Math.floor(abs / 100000000).toLocaleString("ko-KR") + " 억";
      }
      if (abs >= 10000) {
        return sign + Math.floor(abs / 10000).toLocaleString("ko-KR") + " 만";
      }
      return sign + abs.toLocaleString("ko-KR");
    }

    return Controller.extend(
      "financial01.financial01.controller.FinancialView01",
      {
        onInit: function () {
          var y = new Date().getFullYear();
          this.getView().setModel(
            new JSONModel({
              busy:         false,
              hasData:      false,
              bukrs:        "1000",
              gjahr:        String(y),
              prevYear:     String(y - 1),
              years:        this._buildYears(y),
              rows:         [],
              kpiAsset:     "0",
              kpiLiab:      "0",
              kpiEquity:    "0",
              sumAssetFmt:  "0",
              sumLiabFmt:   "0",
              sumEquityFmt: "0",
              sumLiabEqFmt: "0",
              balanced:     true,
            }),
            "view"
          );

          this.getOwnerComponent().getModel().metadataLoaded().then(function () {
            this._load();
          }.bind(this));
        },

        _buildYears: function (n) {
          var a = [];
          for (var i = n; i >= n - 9; i--) {
            a.push({ key: String(i), text: i + "년" });
          }
          return a;
        },

        onYearChange: function (oEvent) {
          var y = parseInt(oEvent.getSource().getSelectedKey(), 10);
          var oVM = this.getView().getModel("view");
          oVM.setProperty("/gjahr",    String(y));
          oVM.setProperty("/prevYear", String(y - 1));
          this._load();
        },

        onSearch: function () {
          this._load();
        },

        _load: function () {
          var oVM  = this.getView().getModel("view");
          var y    = oVM.getProperty("/gjahr");
          var b    = oVM.getProperty("/bukrs");

          if (!b) { MessageToast.show("회사코드를 입력하세요."); return; }
          if (!y) { MessageToast.show("회계연도를 선택하세요."); return; }

          oVM.setProperty("/busy",    true);
          oVM.setProperty("/hasData", false);

          var iYear   = parseInt(y, 10);
          var oModel  = this.getOwnerComponent().getModel();
          var oCurrDt = new Date(Date.UTC(iYear,     11, 31, 0, 0, 0));
          var oPrevDt = new Date(Date.UTC(iYear - 1, 11, 31, 0, 0, 0));
          var sKey    = oModel.createKey("ZCDS_E3_FI_0011", {
            p_bukrs:    b,
            p_curr_dat: oCurrDt,
            p_prev_dat: oPrevDt,
          });
          var path = "/" + sKey + "/Set";

          oModel.read(path, {
            success: function (d) {
              oVM.setProperty("/busy", false);
              var aRes = d.results || [];
              if (!aRes.length) {
                MessageToast.show("조회된 데이터가 없습니다.");
                return;
              }
              this._process(aRes, oVM);
            }.bind(this),
            error: function (e) {
              oVM.setProperty("/busy", false);
              var m = e.message;
              try { m = JSON.parse(e.responseText).error.message.value; } catch (x) {}
              MessageBox.error("조회 오류: " + m);
            }.bind(this),
          });
        },

        _process: function (aRaw, oVM) {
          var G = { asset: {}, liab: {}, equity: {} };
          var nA_C = 0, nA_P = 0;
          var nL_C = 0, nL_P = 0;
          var nE_C = 0, nE_P = 0;

          aRaw.forEach(function (r) {
            var cls = CLASS_MAP[r.minor_class];
            if (!cls) return;

            var c = parseFloat(r.curr_amt) || 0;
            var p = parseFloat(r.prev_amt) || 0;

            if (r.major_class === "2" || r.major_class === "3" || r.major_class === "4") {
              c = -c; p = -p;
            }

            var k = cls.sort;
            if (!G[cls.sec][k]) {
              G[cls.sec][k] = { roman: cls.roman, lv2: cls.lv2, items: [], stC: 0, stP: 0 };
            }
            G[cls.sec][k].items.push({ stext: r.stext, c: c, p: p });
            G[cls.sec][k].stC += c;
            G[cls.sec][k].stP += p;

            if (cls.sec === "asset")  { nA_C += c; nA_P += p; }
            if (cls.sec === "liab")   { nL_C += c; nL_P += p; }
            if (cls.sec === "equity") { nE_C += c; nE_P += p; }
          });

          var rows = [];

          var pushSection = function (title, secKey, totalLabel, totalC, totalP) {
            rows.push({ level: "section", label: title, currFmt: "", prevFmt: "" });
            Object.keys(G[secKey]).sort().forEach(function (k) {
              var g = G[secKey][k];
              g.items.sort(function (a, b) { return a.stext < b.stext ? -1 : 1; });
              rows.push({ level: "group", label: g.lv2, currFmt: _fmt(g.stC), prevFmt: _fmt(g.stP) });
              g.items.forEach(function (it) {
                rows.push({ level: "item", label: it.stext, currFmt: _fmt(it.c), prevFmt: _fmt(it.p) });
              });
            });
            rows.push({ level: "total", label: totalLabel, currFmt: _fmt(totalC), prevFmt: _fmt(totalP) });
          };

          pushSection("자산", "asset",  "자산 총계", nA_C, nA_P);
          pushSection("부채", "liab",   "부채 총계", nL_C, nL_P);
          pushSection("자본", "equity", "자본 총계", nE_C, nE_P);

          rows.push({
            level: "grand",
            label: "부채 및 자본 총계",
            currFmt: _fmt(nL_C + nE_C),
            prevFmt: _fmt(nL_P + nE_P),
          });

          var isBalanced = Math.abs(nA_C - (nL_C + nE_C)) < 1;

          oVM.setProperty("/rows",         rows);
          oVM.setProperty("/kpiAsset",     _fmtKpi(nA_C));
          oVM.setProperty("/kpiLiab",      _fmtKpi(nL_C));
          oVM.setProperty("/kpiEquity",    _fmtKpi(nE_C));
          oVM.setProperty("/sumAssetFmt",  _fmt(nA_C));
          oVM.setProperty("/sumLiabFmt",   _fmt(nL_C));
          oVM.setProperty("/sumEquityFmt", _fmt(nE_C));
          oVM.setProperty("/sumLiabEqFmt", _fmt(nL_C + nE_C));
          oVM.setProperty("/balanced",     isBalanced);
          oVM.setProperty("/hasData",      true);
        },

        onExport: function () {
          var oVM    = this.getView().getModel("view");
          var aRows  = oVM.getProperty("/rows");
          var sYear  = oVM.getProperty("/gjahr");
          var sBukrs = oVM.getProperty("/bukrs");

          var aData = aRows.map(function (r) {
            return { label: r.label, curr: r.currFmt, prev: r.prevFmt };
          });

          sap.ui.require(["sap/ui/export/Spreadsheet"], function (Spreadsheet) {
            new Spreadsheet({
              workbook: {
                columns: [
                  { label: "계정과목",                          property: "label" },
                  { label: "당기 (" + sYear + "년)",            property: "curr"  },
                  { label: "전기 (" + (parseInt(sYear, 10) - 1) + "년)", property: "prev" },
                ],
              },
              dataSource: aData,
              fileName: "재무상태표_" + sBukrs + "_" + sYear + ".xlsx",
            })
              .build()
              .then(function () { MessageToast.show("Excel 다운로드 완료"); })
              .catch(function (e) { MessageBox.error("저장 실패: " + (e.message || "")); });
          });
        },
      }
    );
  }
);
