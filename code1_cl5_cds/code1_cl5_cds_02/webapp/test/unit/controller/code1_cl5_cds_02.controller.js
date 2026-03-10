/*global QUnit*/

sap.ui.define([
	"code1/cl5/cds02/code1cl5cds02/controller/code1_cl5_cds_02.controller"
], function (Controller) {
	"use strict";

	QUnit.module("code1_cl5_cds_02 Controller");

	QUnit.test("I should test the code1_cl5_cds_02 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
