/*global QUnit*/

sap.ui.define([
	"code1/cl505/crud03/cod1cl5crud03/controller/CRUDView03.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CRUDView03 Controller");

	QUnit.test("I should test the CRUDView03 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
