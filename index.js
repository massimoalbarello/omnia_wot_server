Servient = require("@node-wot/core").Servient;
HttpServer = require("@node-wot/binding-http").HttpServer;

WotDevice = require("./dist/base.js").WotDevice;

var httpServer = new HttpServer({ port: 8080 });

var servient = new Servient();

servient.addServer(httpServer);

servient.start().then((WoT) => {
    wotDevice = new WotDevice(WoT);
    wotDevice.startDevice();
});