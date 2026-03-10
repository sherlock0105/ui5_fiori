/*global QUnit*/

sap.ui.define([
	"code1/cl5/micro/chart01/code1cl5microchart01/controller/chart_01.controller"
], function (Controller) {
	"use strict";

	QUnit.module("chart_01 Controller");

	QUnit.test("I should test the chart_01 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
