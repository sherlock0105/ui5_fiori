/*global QUnit*/

sap.ui.define([
	"code1/cl5/edu/pou1flightinfo/controller/POU.controller"
], function (Controller) {
	"use strict";

	QUnit.module("POU Controller");

	QUnit.test("I should test the POU controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
