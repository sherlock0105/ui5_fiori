/*global QUnit*/

sap.ui.define([
	"code1/cl5/edu01/test1/controller/UlalaTest1.controller"
], function (Controller) {
	"use strict";

	QUnit.module("UlalaTest1 Controller");

	QUnit.test("I should test the UlalaTest1 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
