/*global QUnit*/

sap.ui.define([
	"code1/cl5/vizchart01/code1cl5vizchart01/controller/VizChartView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("VizChartView Controller");

	QUnit.test("I should test the VizChartView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
