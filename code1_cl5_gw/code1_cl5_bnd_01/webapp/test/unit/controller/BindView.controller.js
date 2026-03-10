/*global QUnit*/

sap.ui.define([
	"code1/cl505pv0002/code1cl5bnd01/controller/BindView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("BindView Controller");

	QUnit.test("I should test the BindView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
