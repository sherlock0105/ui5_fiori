/*global QUnit*/

sap.ui.define([
	"financial01/financial01/controller/FinancialView01.controller"
], function (Controller) {
	"use strict";

	QUnit.module("FinancialView01 Controller");

	QUnit.test("I should test the FinancialView01 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
