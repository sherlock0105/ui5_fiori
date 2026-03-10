/*global QUnit*/

sap.ui.define([
	"personaltrain2/personaltrain2/controller/ptView1.controller"
], function (Controller) {
	"use strict";

	QUnit.module("ptView1 Controller");

	QUnit.test("I should test the ptView1 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
