/*global QUnit*/

sap.ui.define([
	"code1/cl5/cds01/code1cl5cds01/controller/SpfliView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("SpfliView Controller");

	QUnit.test("I should test the SpfliView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
