fetch = require("isomorphic-fetch");
crypto = require("node:crypto");

Servient = require("@node-wot/core").Servient;
HttpServer = require("@node-wot/binding-http").HttpServer;

WotDevice = require("./dist/base.js").WotDevice;



const nonce = crypto.randomBytes(12).toString("hex");

const body = {
    "nonce": nonce,
};

fetch('http://127.0.0.1:4943/?canisterId=<canister_id>', {
    method: "POST",
    headers: {
        "x-real-ip": "127.0.0.1"    // this header is generated automatically by the boundary node when canister is deployed on the IC. Set it only for testing
    },
    body: JSON.stringify(body),
})
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.text();
    })
    .then(function(res) {
        console.log(res);
    });

// var httpServer = new HttpServer({ port: 8080 });

// var servient = new Servient();

// servient.addServer(httpServer);

// servient.start().then((WoT) => {
//     wotDevice = new WotDevice(WoT);
//     wotDevice.startDevice();
// });