/*global QUnit*/

sap.ui.define([
	"code1/cl5/srv01/code1cl5srv01/controller/AirView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("AirView Controller");

	QUnit.test("I should test the AirView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
