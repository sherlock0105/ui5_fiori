/*global QUnit*/

sap.ui.define([
	"code1/cl5/gw01/code1cl5gw01/controller/CoepView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CoepView Controller");

	QUnit.test("I should test the CoepView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
