/*global QUnit*/

sap.ui.define([
	"code1/cl505/gw0005/code1cl5crud01/controller/CRUDView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CRUDView Controller");

	QUnit.test("I should test the CRUDView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
