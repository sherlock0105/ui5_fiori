/*global QUnit*/

sap.ui.define([
	"assignmentjson1/assignmetnjson1/controller/assignment_JSON1.controller"
], function (Controller) {
	"use strict";

	QUnit.module("assignment_JSON1 Controller");

	QUnit.test("I should test the assignment_JSON1 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
