/*global QUnit*/

sap.ui.define([
	"code1/cl505/gw0008/code1cl5split02/controller/SplitView02.controller"
], function (Controller) {
	"use strict";

	QUnit.module("SplitView02 Controller");

	QUnit.test("I should test the SplitView02 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
