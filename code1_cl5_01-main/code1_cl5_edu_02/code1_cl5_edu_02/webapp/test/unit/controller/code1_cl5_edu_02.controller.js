/*global QUnit*/

sap.ui.define([
	"code1cl5edu02/code1cl5edu02/controller/code1_cl5_edu_02.controller"
], function (Controller) {
	"use strict";

	QUnit.module("code1_cl5_edu_02 Controller");

	QUnit.test("I should test the code1_cl5_edu_02 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
