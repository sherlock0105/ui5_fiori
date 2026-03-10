/*global QUnit*/

sap.ui.define([
	"zcl505/deployedu/code1cl5deployedu/controller/DeployView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("DeployView Controller");

	QUnit.test("I should test the DeployView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
