/*global QUnit*/

sap.ui.define([
	"code1/cl5/edu07/code1cl5edu07/controller/Edu07View.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Edu07View Controller");

	QUnit.test("I should test the Edu07View controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
