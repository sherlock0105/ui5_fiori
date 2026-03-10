/*global QUnit*/

sap.ui.define([
	"code1/cl5/edu05/code1cl5edu05/controller/Edu05View.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Edu05View Controller");

	QUnit.test("I should test the Edu05View controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
