/*global QUnit*/

sap.ui.define([
	"code1/cl5/resource01/code1cl5resource01/controller/ResourceView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ResourceView Controller");

	QUnit.test("I should test the ResourceView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
