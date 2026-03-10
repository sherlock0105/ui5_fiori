/*global QUnit*/

sap.ui.define([
	"code1/uxtest01/uxtest/controller/UX_test_View.controller"
], function (Controller) {
	"use strict";

	QUnit.module("UX_test_View Controller");

	QUnit.test("I should test the UX_test_View controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
