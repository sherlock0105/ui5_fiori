/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["financial01/financial01/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
