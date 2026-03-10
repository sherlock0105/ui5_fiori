/*global QUnit*/

sap.ui.define([
	"code1/cl5/search01/code1cl5search01/controller/ScarrView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ScarrView Controller");

	QUnit.test("I should test the ScarrView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
