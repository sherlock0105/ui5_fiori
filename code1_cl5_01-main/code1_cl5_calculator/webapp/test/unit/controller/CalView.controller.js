/*global QUnit*/

sap.ui.define([
	"code1/cl5/calculator/code1cl5calculator/controller/CalView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CalView Controller");

	QUnit.test("I should test the CalView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
