sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/m/MessageToast",
    "sap/m/MessageBox",
  ],
  function (Controller, JSONModel, Filter, FilterOperator, MessageToast, MessageBox) {
    "use strict";

    var EMPTY_FORM = {
      Bpcode: "", Bptype: "C", Bpname: "",
      Countrycode: "", Bizregno: "", Telno: "",
      Address: "", Paymentterm: "", Bankaccount: "",
      Bankname: "", Useflag: "Y", Email: "", Repname: "",
    };

    // 공급업체 국가별 번호 범위
    var VENDOR_RANGES = {
      KR: { start: 1,   end: 99  },
      JP: { start: 101, end: 199 },
      EU: { start: 201, end: 299 },
      US: { start: 301, end: 399 },
    };

    var COUNTRIES = [
      { code: "KR", name: "대한민국 (Korea)" },
      { code: "JP", name: "일본 (Japan)" },
      { code: "US", name: "미국 (USA)" },
      { code: "EU", name: "유럽 (Europe)" },
      { code: "CN", name: "중국 (China)" },
      { code: "DE", name: "독일 (Germany)" },
      { code: "FR", name: "프랑스 (France)" },
      { code: "GB", name: "영국 (UK)" },
      { code: "SG", name: "싱가포르 (Singapore)" },
      { code: "AU", name: "호주 (Australia)" },
      { code: "IN", name: "인도 (India)" },
      { code: "TH", name: "태국 (Thailand)" },
      { code: "VN", name: "베트남 (Vietnam)" },
    ];

    // 고객: 30일, 60일 / 공급업체: 30일, 45일, 60일
    var PAYMENT_TERMS_C = [
      { code: "Z030", name: "30일 후 지불" },
      { code: "Z060", name: "60일 후 지불" },
    ];
    var PAYMENT_TERMS_V = [
      { code: "Z030", name: "30일 후 지불" },
      { code: "Z045", name: "45일 후 지불" },
      { code: "Z060", name: "60일 후 지불" },
    ];

    // 필수 필드 정의 (Label text, form key)
    var REQUIRED_FIELDS = [
      { key: "Bptype",      label: "BP 유형" },
      { key: "Countrycode", label: "국가 코드" },
      { key: "Bpcode",      label: "BP 코드" },
      { key: "Bpname",      label: "BP 명칭" },
      { key: "Bizregno",    label: "사업자 번호" },
      { key: "Repname",     label: "대표자명" },
      { key: "Telno",       label: "전화번호" },
      { key: "Email",       label: "이메일" },
      { key: "Address",     label: "주소" },
      { key: "Paymentterm", label: "결제 조건" },
      { key: "Bankname",    label: "은행명" },
      { key: "Bankaccount", label: "계좌번호" },
    ];

    return Controller.extend("ze3.fi.bpmaster.ze3fibpmaster.controller.BpMasterView", {

      onInit: function () {
        this.getView().setModel(
          new JSONModel({
            mode: "READ",
            selectedType: "",
            listBusy: false,
            listItems: [],
            listCount: 0,
            allItems: [],
            kpi: { total: "-", customer: "-", vendor: "-" },
            form: Object.assign({}, EMPTY_FORM),
            _backup: null,
            countries: COUNTRIES,
            paymentTerms: PAYMENT_TERMS_C,
            filteredItems: [],
            pagination: {
              currentPage: 1,
              totalPages: 1,
              pageSize: 15,
              pages: [],
              pageInfo: "0 건",
            },
          }),
          "view"
        );

        this.getOwnerComponent().getModel().metadataLoaded().then(function () {
          this._loadAll();
        }.bind(this));
      },

      // ── 전체 목록 로드 (KPI 포함) ─────────────────────────────
      _loadAll: function () {
        var oVM = this.getView().getModel("view");
        oVM.setProperty("/listBusy", true);

        this.getOwnerComponent().getModel().read("/BpMasterSet", {
          success: function (oData) {
            var aAll = oData.results || [];
            var nC = aAll.filter(function (r) { return r.Bptype === "C"; }).length;
            var nV = aAll.filter(function (r) { return r.Bptype === "V"; }).length;

            oVM.setProperty("/allItems", aAll);
            oVM.setProperty("/kpi", {
              total:    String(aAll.length),
              customer: String(nC),
              vendor:   String(nV),
            });
            oVM.setProperty("/listBusy", false);
            this._applyFilter();
          }.bind(this),
          error: function (oErr) {
            oVM.setProperty("/listBusy", false);
            this._showError("목록 조회 오류", oErr);
          }.bind(this),
        });
      },

      // ── 로컬 필터 적용 (BP코드 / BP명 / 국가코드 모두 검색) ────
      _applyFilter: function () {
        var oVM     = this.getView().getModel("view");
        var sType   = oVM.getProperty("/selectedType");
        var oSearch = this.byId("searchField");
        var sSearch = (oSearch ? oSearch.getValue() : "").trim().toLowerCase();
        var aAll    = oVM.getProperty("/allItems") || [];

        var aFiltered = aAll.filter(function (r) {
          var bType = !sType || r.Bptype === sType;
          var bSearch = !sSearch ||
            (r.Bpcode       || "").toLowerCase().indexOf(sSearch) >= 0 ||
            (r.Bpname       || "").toLowerCase().indexOf(sSearch) >= 0 ||
            (r.Countrycode  || "").toLowerCase().indexOf(sSearch) >= 0 ||
            (r.Bizregno     || "").toLowerCase().indexOf(sSearch) >= 0 ||
            (r.Email        || "").toLowerCase().indexOf(sSearch) >= 0;
          return bType && bSearch;
        });

        oVM.setProperty("/filteredItems", aFiltered);
        oVM.setProperty("/listCount", aFiltered.length);
        this._goToPage(1, aFiltered);
      },

      // ── 페이지 이동 ───────────────────────────────────────────
      _goToPage: function (nPage, aFiltered) {
        var oVM      = this.getView().getModel("view");
        aFiltered    = aFiltered || oVM.getProperty("/filteredItems") || [];
        var nSize    = 15;
        var nTotal   = aFiltered.length;
        var nPages   = Math.max(1, Math.ceil(nTotal / nSize));
        nPage        = Math.max(1, Math.min(nPage, nPages));
        var nStart   = (nPage - 1) * nSize;
        var nEnd     = Math.min(nStart + nSize, nTotal);
        var sInfo    = nTotal === 0 ? "0 건" : (nStart + 1) + " - " + nEnd + " / " + nTotal + " 건";

        oVM.setProperty("/listItems",                aFiltered.slice(nStart, nEnd));
        oVM.setProperty("/pagination/currentPage",   nPage);
        oVM.setProperty("/pagination/totalPages",    nPages);
        oVM.setProperty("/pagination/pageInfo",      sInfo);
        oVM.setProperty("/pagination/pages",         this._buildPages(nPage, nPages));
      },

      // ── 페이지 버튼 배열 생성 ─────────────────────────────────
      _buildPages: function (nCurrent, nTotal) {
        var aPages = [];

        if (nTotal <= 10) {
          for (var i = 1; i <= nTotal; i++) {
            aPages.push({ num: String(i), active: i === nCurrent, enabled: true });
          }
          return aPages;
        }

        // 슬라이딩 윈도우: 1 ... prev cur next ... last
        var aShow = [1];
        if (nCurrent - 1 > 2) { aShow.push(-1); }
        for (var j = Math.max(2, nCurrent - 1); j <= Math.min(nTotal - 1, nCurrent + 1); j++) {
          aShow.push(j);
        }
        if (nCurrent + 1 < nTotal - 1) { aShow.push(-1); }
        if (nTotal > 1) { aShow.push(nTotal); }

        aShow.forEach(function (n) {
          if (n === -1) {
            aPages.push({ num: "···", active: false, enabled: false });
          } else {
            aPages.push({ num: String(n), active: n === nCurrent, enabled: true });
          }
        });
        return aPages;
      },

      // ── 페이지 이벤트 핸들러 ──────────────────────────────────
      onPagePress: function (oEvent) {
        var sNum = oEvent.getSource().getText();
        var nPage = parseInt(sNum, 10);
        if (!isNaN(nPage)) { this._goToPage(nPage); }
      },

      onPrevPage: function () {
        var oVM = this.getView().getModel("view");
        this._goToPage(oVM.getProperty("/pagination/currentPage") - 1);
      },

      onNextPage: function () {
        var oVM = this.getView().getModel("view");
        this._goToPage(oVM.getProperty("/pagination/currentPage") + 1);
      },

      // ── 유형 탭 변경 ──────────────────────────────────────────
      onTypeChange: function (oEvent) {
        var sKey = oEvent.getParameter("item").getKey();
        this.getView().getModel("view").setProperty("/selectedType", sKey);
        this._applyFilter();
      },

      // ── 검색 ──────────────────────────────────────────────────
      onSearch: function () {
        this._applyFilter();
      },

      // ── 행 클릭 → 단건 조회 → 다이얼로그 ─────────────────────
      onRowPress: function (oEvent) {
        var oItem = oEvent.getSource().getBindingContext("view").getObject();
        this._readOne(oItem.Bpcode, oItem.Bptype);
      },

      _readOne: function (sBpcode, sBptype) {
        var oVM    = this.getView().getModel("view");
        var oModel = this.getOwnerComponent().getModel();
        var sKey   = oModel.createKey("BpMasterSet", { Bpcode: sBpcode, Bptype: sBptype });

        oModel.read("/" + sKey, {
          success: function (oData) {
            oVM.setProperty("/form", Object.assign({}, oData));
            this._setMode("READ");
            this._openDialog();
          }.bind(this),
          error: function (oErr) {
            this._showError("단건 조회 오류", oErr);
          }.bind(this),
        });
      },

      // ── 생성 버튼 ──────────────────────────────────────────────
      onNewCreate: function () {
        var sType = this.getView().getModel("view").getProperty("/selectedType") || "C";
        this.getView().getModel("view").setProperty(
          "/form",
          Object.assign({}, EMPTY_FORM, { Bptype: sType })
        );
        this._syncPaymentTerms(sType);
        this._setMode("CREATE");
        this._openDialog();
      },

      // ── BP 유형 변경 시 코드/결제조건 초기화 + 재생성 ───────────
      onBptypeChange: function (oEvent) {
        var oVM   = this.getView().getModel("view");
        var sType = oEvent.getSource().getSelectedKey();

        oVM.setProperty("/form/Bpcode", "");
        oVM.setProperty("/form/Paymentterm", "");  // 결제조건 초기화 (유형별로 다름)
        this._syncPaymentTerms(sType);

        var sCountry = oVM.getProperty("/form/Countrycode");
        if (sCountry) {
          this._generateBpCode(sCountry, sType);
        }
      },

      // 유형에 맞는 결제조건 목록 동기화
      _syncPaymentTerms: function (sBptype) {
        this.getView().getModel("view").setProperty(
          "/paymentTerms",
          sBptype === "V" ? PAYMENT_TERMS_V : PAYMENT_TERMS_C
        );
      },

      // ── 국가 서치헬프 ─────────────────────────────────────────
      onCountryValueHelp: function () {
        this.getView().getModel("view").setProperty("/countries", COUNTRIES);
        this.byId("countryDialog").open();
      },

      onCountryDialogSearch: function (oEvent) {
        var sTerm    = (oEvent.getParameter("value") || "").toLowerCase();
        var oBinding = this.byId("countryDialog").getBinding("items");

        if (!sTerm) {
          oBinding.filter([]);
          return;
        }
        oBinding.filter([
          new Filter([
            new Filter("code", FilterOperator.Contains, sTerm.toUpperCase()),
            new Filter("name", function (sVal) {
              return sVal && sVal.toLowerCase().indexOf(sTerm) >= 0;
            }),
          ], false),
        ]);
      },

      onCountryDialogConfirm: function (oEvent) {
        var oSelected = oEvent.getParameter("selectedItem");
        if (!oSelected) return;

        var oVM    = this.getView().getModel("view");
        var sCode  = oSelected.getTitle();
        var sType  = oVM.getProperty("/form/Bptype");

        oVM.setProperty("/form/Countrycode", sCode);
        this._generateBpCode(sCode, sType);
      },

      // ── 결제 조건 서치헬프 (유형별 목록) ─────────────────────
      onPaymentTermValueHelp: function () {
        var sType = this.getView().getModel("view").getProperty("/form/Bptype");
        this._syncPaymentTerms(sType);
        this.byId("paymentTermDialog").open();
      },

      onPaymentTermDialogConfirm: function (oEvent) {
        var oSelected = oEvent.getParameter("selectedItem");
        if (!oSelected) return;
        this.getView().getModel("view").setProperty(
          "/form/Paymentterm",
          oSelected.getTitle()
        );
      },

      // ── BP 코드 자동 생성 ─────────────────────────────────────
      _generateBpCode: function (sCountry, sBptype) {
        if (!sCountry) return;

        var oVM  = this.getView().getModel("view");
        var aAll = oVM.getProperty("/allItems") || [];

        if (sBptype === "V") {
          // 공급업체: V001(KR) / V101(JP) / V201(EU) / V301(US)
          var oRange = VENDOR_RANGES[sCountry];
          if (!oRange) {
            MessageToast.show("국가 [" + sCountry + "]의 번호 범위가 미정의입니다. BP코드를 직접 수정하세요.");
            return;
          }

          var aUsed = aAll
            .filter(function (r) { return r.Bptype === "V" && /^V\d+$/.test(r.Bpcode); })
            .map(function (r) { return parseInt(r.Bpcode.substring(1), 10); })
            .filter(function (n) { return n >= oRange.start && n <= oRange.end; });

          var nMax  = aUsed.length ? Math.max.apply(null, aUsed) : oRange.start - 1;
          var nNext = nMax + 1;

          if (nNext > oRange.end) {
            MessageBox.warning("국가 [" + sCountry + "] 공급업체 코드 범위(" + oRange.start + "~" + oRange.end + ")가 가득 찼습니다.");
            return;
          }
          oVM.setProperty("/form/Bpcode", "V" + String(nNext).padStart(3, "0"));

        } else {
          // 고객: KR0001 / JP0001 / EU0001 / US0001
          var sPrefix = sCountry;

          var aUsed2 = aAll
            .filter(function (r) {
              return r.Bptype === "C" && r.Bpcode.indexOf(sPrefix) === 0;
            })
            .map(function (r) { return parseInt(r.Bpcode.substring(sPrefix.length), 10); })
            .filter(function (n) { return !isNaN(n); });

          var nMax2  = aUsed2.length ? Math.max.apply(null, aUsed2) : 0;
          var nNext2 = nMax2 + 1;

          oVM.setProperty("/form/Bpcode", sPrefix + String(nNext2).padStart(4, "0"));
        }
      },

      // ── 수정 모드 전환 ─────────────────────────────────────────
      onEdit: function () {
        var oVM = this.getView().getModel("view");
        oVM.setProperty("/_backup", Object.assign({}, oVM.getProperty("/form")));
        this._syncPaymentTerms(oVM.getProperty("/form/Bptype"));
        this._setMode("EDIT");
      },

      // ── 저장 (CREATE / UPDATE 분기) ────────────────────────────
      onSave: function () {
        var oVM   = this.getView().getModel("view");
        var sMode = oVM.getProperty("/mode");
        var oForm = oVM.getProperty("/form");

        // 필수 필드 전체 검증
        var aMissing = REQUIRED_FIELDS.filter(function (f) {
          return !oForm[f.key] || oForm[f.key].trim() === "";
        });
        if (aMissing.length) {
          MessageBox.warning(
            "아래 필드를 입력해주세요:\n" +
            aMissing.map(function (f) { return "  · " + f.label; }).join("\n")
          );
          return;
        }

        if (sMode === "CREATE") {
          this._create(oForm);
        } else {
          this._update(oForm);
        }
      },

      _create: function (oForm) {
        this.getOwnerComponent().getModel().create("/BpMasterSet", oForm, {
          success: function () {
            MessageToast.show("저장되었습니다.");
            this._closeDialog();
            this._loadAll();
          }.bind(this),
          error: function (oErr) {
            this._showError("생성 오류", oErr);
          }.bind(this),
        });
      },

      _update: function (oForm) {
        var oVM    = this.getView().getModel("view");
        var oModel = this.getOwnerComponent().getModel();
        var sKey   = oModel.createKey("BpMasterSet", { Bpcode: oForm.Bpcode, Bptype: oForm.Bptype });

        oModel.update("/" + sKey, oForm, {
          success: function () {
            MessageToast.show("수정되었습니다.");
            oVM.setProperty("/form", Object.assign({}, oForm));
            this._setMode("READ");
            this._loadAll();
          }.bind(this),
          error: function (oErr) {
            this._showError("수정 오류", oErr);
          }.bind(this),
        });
      },

      // ── 삭제 ───────────────────────────────────────────────────
      onDelete: function () {
        var oForm = this.getView().getModel("view").getProperty("/form");
        MessageBox.confirm(
          "BP [" + oForm.Bpcode + "] " + oForm.Bpname + " 을(를) 삭제하시겠습니까?",
          {
            title: "삭제 확인",
            onClose: function (sAction) {
              if (sAction === MessageBox.Action.OK) {
                this._delete(oForm);
              }
            }.bind(this),
          }
        );
      },

      _delete: function (oForm) {
        var oModel = this.getOwnerComponent().getModel();
        var sKey   = oModel.createKey("BpMasterSet", { Bpcode: oForm.Bpcode, Bptype: oForm.Bptype });

        oModel.remove("/" + sKey, {
          success: function () {
            MessageToast.show("삭제되었습니다.");
            this._closeDialog();
            this._loadAll();
          }.bind(this),
          error: function (oErr) {
            this._showError("삭제 오류", oErr);
          }.bind(this),
        });
      },

      // ── 취소 ───────────────────────────────────────────────────
      onCancel: function () {
        var oVM   = this.getView().getModel("view");
        var sMode = oVM.getProperty("/mode");

        if (sMode === "CREATE") {
          this._closeDialog();
        } else {
          var oBackup = oVM.getProperty("/_backup");
          if (oBackup) {
            oVM.setProperty("/form", Object.assign({}, oBackup));
          }
          this._setMode("READ");
        }
      },

      onCloseDialog: function () {
        this._closeDialog();
      },

      // ── 헬퍼 ───────────────────────────────────────────────────
      _setMode: function (sMode) {
        this.getView().getModel("view").setProperty("/mode", sMode);
      },

      _openDialog: function () {
        this.byId("detailDialog").open();
      },

      _closeDialog: function () {
        this.byId("detailDialog").close();
      },

      _showError: function (sTitle, oErr) {
        var sMsg = oErr.message || "";
        try { sMsg = JSON.parse(oErr.responseText).error.message.value; } catch (e) {}
        MessageBox.error(sTitle + ": " + sMsg);
      },
    });
  }
);
