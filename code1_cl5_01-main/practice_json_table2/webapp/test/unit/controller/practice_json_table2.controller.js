/*global QUnit*/

sap.ui.define([
	"practicejsontable2/practicejsontable2/controller/practice_json_table2.controller"
], function (Controller) {
	"use strict";

	QUnit.module("practice_json_table2 Controller");

	QUnit.test("I should test the practice_json_table2 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
