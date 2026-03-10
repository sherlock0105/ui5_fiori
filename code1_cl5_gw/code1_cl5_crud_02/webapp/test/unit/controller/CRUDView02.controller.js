/*global QUnit*/

sap.ui.define([
	"code1/cl505/crud02/code1cl5crud02/controller/CRUDView02.controller"
], function (Controller) {
	"use strict";

	QUnit.module("CRUDView02 Controller");

	QUnit.test("I should test the CRUDView02 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
