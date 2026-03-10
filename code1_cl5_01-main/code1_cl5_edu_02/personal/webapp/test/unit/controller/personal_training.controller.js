/*global QUnit*/

sap.ui.define([
	"personal/controller/personal_training.controller"
], function (Controller) {
	"use strict";

	QUnit.module("personal_training Controller");

	QUnit.test("I should test the personal_training controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
