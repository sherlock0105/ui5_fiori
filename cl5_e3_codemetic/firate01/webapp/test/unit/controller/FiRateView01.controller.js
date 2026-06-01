/*global QUnit*/

sap.ui.define([
	"firate01/firate01/controller/FiRateView01.controller"
], function (Controller) {
	"use strict";

	QUnit.module("FiRateView01 Controller");

	QUnit.test("I should test the FiRateView01 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
