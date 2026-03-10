/*global QUnit*/

sap.ui.define([
	"practice/json/table/practicejsontable/controller/Practice_JSON_Table.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Practice_JSON_Table Controller");

	QUnit.test("I should test the Practice_JSON_Table controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
