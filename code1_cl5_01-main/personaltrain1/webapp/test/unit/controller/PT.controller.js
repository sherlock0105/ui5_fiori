/*global QUnit*/

sap.ui.define([
	"code1/cl5/edu/pt/personaltrain1/controller/PT.controller"
], function (Controller) {
	"use strict";

	QUnit.module("PT Controller");

	QUnit.test("I should test the PT controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
