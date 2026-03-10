/*global QUnit*/

sap.ui.define([
	"code1/cl5/edu01/test3/controller/UlalaTest3.controller"
], function (Controller) {
	"use strict";

	QUnit.module("UlalaTest3 Controller");

	QUnit.test("I should test the UlalaTest3 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
