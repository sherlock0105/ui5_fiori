sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/Filter",
    "sap/viz/ui5/data/FlattenedDataset",
  ],
  (Controller, MessageToast, FilterOperator, Filter, FlattenedDataset) => {
    "use strict";

    return Controller.extend(
      "code1.cl505.gw0007.code1cl5split01.controller.SplitView",
      {
        onInit() {
          //set Popover
          const oViz = this.byId("vizChartLine");
          const oPopOVer = this.byId("idPopOver");

          oPopOVer.connect(oViz.getVizUid());
        },
        // Event 에 의한 호출
        // onSpfli: function (oEvent) {
        //   let oData = oEvent.getSource().getBindingContext().getObject(),
        //     oBinding = this.getView().byId("Spfli").getBinding("rows"),
        //     oBinding2 = this.getView().byId("Sflight").getBinding("rows"),
        //     oViz = this.getView().byId("vizChartLine"),
        //     oDataSet;

        //   oBinding.filter(
        //     new Filter("Carrid", FilterOperator.EQ, oData.Carrid),
        //   );
        //   //Clear sflight
        //   oBinding2.filter();
        //   //Clear sbook
        //   oDataSet = new FlattenedDataset({
        //     dimensions: [
        //       { name: "Airline", value: "{Carrid}" },
        //       { name: "Flight Number", value: "{Connid}" },
        //       { name: "Flight Date", value: "{Fldate}" },
        //       { name: "Agency", value: "{Agencynum}" },
        //     ],

        //     measures: [
        //       { name: "Booking Total", value: "{Cnt}" },
        //       { name: "Weight Total", value: "{Luggweight}" },
        //       { name: "Price Total", value: "{Forcuram}" },
        //     ],

        //     data: { path: "/SbookSet" },
        //   });

        //   oViz.setDataset(oDataSet);
        // },
        onSpfli: function (oEvent) {
          const oView = this.getView();

          let oData = oEvent.getSource().getBindingContext().getObject();
          let oBindingSplfi = oView.byId("Spfli").getBinding("rows");

          oBindingSplfi.filter(
            new Filter("Carrid", FilterOperator.EQ, oData.Carrid),
          );

          // Clear Sflight and Sbook
          oView.byId("Sflight").getBinding("rows").filter(null);
          oView
            .byId("vizChartLine")
            .getDataset()
            .bindData({ path: "/SbookSet", filters: [] });
        },

        // onSflight: function (oEvent) {
        //   //   console.log(oEvent.getParameters.rowBindingContext.getObject());
        //   let oData = oEvent.getParameter("rowBindingContext").getObject(),
        //     oBinding = this.getView().byId("Sflight").getBinding("rows"),
        //     //검색조건 2개 배열 필요
        //     aFilter = [],
        //     oViz = this.getView().byId("vizChartLine"),
        //     oDataSet;

        //   aFilter.push(new Filter("Carrid", FilterOperator.EQ, oData.Carrid));
        //   aFilter.push(new Filter("Connid", FilterOperator.EQ, oData.Connid));

        //   oBinding.filter(aFilter);

        //   //Clear Sbook
        //   oDataSet = new FlattenedDataset({
        //     dimensions: [
        //       { name: "Airline", value: "{Carrid}" },
        //       { name: "Flight Number", value: "{Connid}" },
        //       { name: "Flight Date", value: "{Fldate}" },
        //       { name: "Agency", value: "{Agencynum}" },
        //     ],

        //     measures: [
        //       { name: "Booking Total", value: "{Cnt}" },
        //       { name: "Weight Total", value: "{Luggweight}" },
        //       { name: "Price Total", value: "{Forcuram}" },
        //     ],

        //     data: { path: "/SbookSet" },
        //   });

        //   oViz.setDataset(oDataSet);
        // },
        onSflight: function (oEvent) {
          const oView = this.getView();

          let oData = oEvent.getParameter("rowBindingContext").getObject();
          let oBinding = oView.byId("Sflight").getBinding("rows");
          let aFilter = [];

          aFilter.push(new Filter("Carrid", FilterOperator.EQ, oData.Carrid));
          aFilter.push(new Filter("Connid", FilterOperator.EQ, oData.Connid));

          oBinding.filter(aFilter);

          // Clear Sbook
          oView
            .byId("vizChartLine")
            .getDataset()
            .bindData({ path: "/SbookSet", filters: [] });
        },
        // onSbook: function (oEvent) {
        //   let oData = oEvent.getParameter("rowBindingContext").getObject(),
        //     oViz = this.getView().byId("vizChartLine"),
        //     aFilter = [],
        //     oDataSet;

        //   aFilter.push(new Filter("Carrid", FilterOperator.EQ, oData.Carrid));
        //   aFilter.push(new Filter("Connid", FilterOperator.EQ, oData.Connid));
        //   aFilter.push(
        //     new Filter(
        //       "Fldate",
        //       FilterOperator.EQ,
        //       oData.Fldate.replaceAll("-", ""),
        //     ),
        //   );

        //   oDataSet = new FlattenedDataset({
        //     dimensions: [
        //       { name: "Airline", value: "{Carrid}" },
        //       { name: "Flight Number", value: "{Connid}" },
        //       { name: "Flight Date", value: "{Fldate}" },
        //       { name: "Agency", value: "{Agencynum}" },
        //     ],

        //     measures: [
        //       { name: "Booking Total", value: "{Cnt}" },
        //       { name: "Weight Total", value: "{Luggweight}" },
        //       { name: "Price Total", value: "{Forcuram}" },
        //     ],

        //     data: { path: "/SbookSet", filters: aFilter },
        //   });

        //   oViz.setDataset(oDataSet);
        // },
        onSbook: function (oEvent) {
          const oView = this.getView();

          let oData = oEvent.getParameter("rowBindingContext").getObject();
          let oViz = oView.byId("vizChartLine");
          let aFilter = [];

          aFilter.push(new Filter("Carrid", FilterOperator.EQ, oData.Carrid));
          aFilter.push(new Filter("Connid", FilterOperator.EQ, oData.Connid));
          aFilter.push(
            new Filter(
              "Fldate",
              FilterOperator.EQ,
              oData.Fldate.replaceAll("-", ""),
            ),
          );

          let oDataSet = new FlattenedDataset({
            dimensions: [
              { name: "Airline", value: "{Carrid}" },
              { name: "Flight Number", value: "{Connid}" },
              { name: "Flight Date", value: "{Fldate}" },
              { name: "Agency", value: "{Agencynum}" },
            ],

            measures: [
              { name: "Booking Total", value: "{Cnt}" },
              { name: "Weight Total", value: "{Luggweight}" },
              { name: "Price Total", value: "{Forcuram}" },
            ],

            data: { path: "/SbookSet", filters: aFilter },
          });

          oViz.setDataset(oDataSet);
        },
      },
    );
  },
);
