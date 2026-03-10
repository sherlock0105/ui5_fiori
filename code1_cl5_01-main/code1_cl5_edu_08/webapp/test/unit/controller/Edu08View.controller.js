/*global QUnit*/

sap.ui.define([
	"code1/cl5/edu08/code1cl5edu08/controller/Edu08View.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Edu08View Controller");

	QUnit.test("I should test the Edu08View controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
