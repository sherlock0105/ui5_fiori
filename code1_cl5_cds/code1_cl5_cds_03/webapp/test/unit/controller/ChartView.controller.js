/*global QUnit*/

sap.ui.define([
	"code1/cl5/cds03/code1cl5cds03/controller/ChartView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ChartView Controller");

	QUnit.test("I should test the ChartView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
