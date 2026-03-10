/* global QUnit */
QUnit.config.autostart = false;

sap.ui.require(["personal/test/integration/AllJourneys"
], function () {
	QUnit.start();
});
