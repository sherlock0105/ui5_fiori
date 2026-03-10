/*global QUnit*/

sap.ui.define([
	"code1/cl505/grid01/code1cl5grid01/controller/SmokerView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("SmokerView Controller");

	QUnit.test("I should test the SmokerView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
