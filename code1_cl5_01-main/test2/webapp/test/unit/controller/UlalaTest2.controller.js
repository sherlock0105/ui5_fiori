/*global QUnit*/

sap.ui.define([
	"code1/cl5/edu01/test2/controller/UlalaTest2.controller"
], function (Controller) {
	"use strict";

	QUnit.module("UlalaTest2 Controller");

	QUnit.test("I should test the UlalaTest2 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
