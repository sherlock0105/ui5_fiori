/*global QUnit*/

sap.ui.define([
	"code/cl5/edu04/code1cl5edu04/controller/Edu04View.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Edu04View Controller");

	QUnit.test("I should test the Edu04View controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
