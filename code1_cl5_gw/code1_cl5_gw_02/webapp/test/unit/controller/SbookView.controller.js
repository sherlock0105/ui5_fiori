/*global QUnit*/

sap.ui.define([
	"code1/cl5/gw02/code1cl5gw02/controller/SbookView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("SbookView Controller");

	QUnit.test("I should test the SbookView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
