/*global QUnit*/

sap.ui.define([
	"code1/cl5/edu/basic/basic1103/controller/Basic1103.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Basic1103 Controller");

	QUnit.test("I should test the Basic1103 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
