/*global QUnit*/

sap.ui.define([
	"code1/cl5/edu01/code1cl5edu01/controller/Edu01View.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Edu01View Controller");

	QUnit.test("I should test the Edu01View controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
