Secp256k1KeyIdentity = require("@dfinity/identity-secp256k1").Secp256k1KeyIdentity;
fetch = require("isomorphic-fetch");

Servient = require("@node-wot/core").Servient;
HttpServer = require("@node-wot/binding-http").HttpServer;

WotDevice = require("./dist/base.js").WotDevice;

const identity = Secp256k1KeyIdentity.generate();
console.log(identity._publicKey);

const message = 'Hello, world!';
const signature = identity.sign(message);
console.log(signature);

const body = {
    "public_key": "public key",
    "signature": "signature",
    "message": message
};

fetch('omnia_backend_canister_url', {
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

var httpServer = new HttpServer({ port: 8080 });

var servient = new Servient();

servient.addServer(httpServer);

servient.start().then((WoT) => {
    wotDevice = new WotDevice(WoT);
    wotDevice.startDevice();
});