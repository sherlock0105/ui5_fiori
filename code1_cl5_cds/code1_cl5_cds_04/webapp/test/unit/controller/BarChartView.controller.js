/*global QUnit*/

sap.ui.define([
	"code1/cl5/cds04/code1cl5cds04/controller/BarChartView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("BarChartView Controller");

	QUnit.test("I should test the BarChartView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
