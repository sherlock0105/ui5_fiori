/*global QUnit*/

sap.ui.define([
	"code1/cl5/searchfield01/code1cl5searchfield01/controller/SearchView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("SearchView Controller");

	QUnit.test("I should test the SearchView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
