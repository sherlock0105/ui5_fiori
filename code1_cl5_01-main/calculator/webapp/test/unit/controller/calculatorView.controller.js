/*global QUnit*/

sap.ui.define([
	"code1/cl5/edu01/calculator/controller/calculatorView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("calculatorView Controller");

	QUnit.test("I should test the calculatorView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
