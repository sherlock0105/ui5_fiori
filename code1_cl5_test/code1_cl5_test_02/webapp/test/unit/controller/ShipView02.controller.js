/*global QUnit*/

sap.ui.define([
	"code1/cl505/test02/code1cl5test02/controller/ShipView02.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ShipView02 Controller");

	QUnit.test("I should test the ShipView02 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
