/*global QUnit*/

sap.ui.define([
	"code1/cl5/edu03/code1cl5edu03/controller/Edu03View.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Edu03View Controller");

	QUnit.test("I should test the Edu03View controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
