/*global QUnit*/

sap.ui.define([
	"code1/cl505gw03/code1cl5gw03/controller/GwCrudView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("GwCrudView Controller");

	QUnit.test("I should test the GwCrudView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
