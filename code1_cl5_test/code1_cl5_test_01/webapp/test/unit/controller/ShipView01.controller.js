/*global QUnit*/

sap.ui.define([
	"code1/cl505/cdsship/code1cl5test01/controller/ShipView01.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ShipView01 Controller");

	QUnit.test("I should test the ShipView01 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
