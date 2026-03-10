/*global QUnit*/

sap.ui.define([
	"pt/personaltrain/controller/personaltrain.controller"
], function (Controller) {
	"use strict";

	QUnit.module("personaltrain Controller");

	QUnit.test("I should test the personaltrain controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
