/*global QUnit*/

sap.ui.define([
	"code1/cl505/test03/code1cl5test03/controller/ShipView03.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ShipView03 Controller");

	QUnit.test("I should test the ShipView03 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
