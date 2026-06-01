/*global QUnit*/

sap.ui.define([
	"project1/controller/RateView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("RateView Controller");

	QUnit.test("I should test the RateView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
