"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto_1 = require("crypto");
function generateSecretKey() {
    return (0, crypto_1.randomBytes)(32).toString('hex');
}
var secretKey = generateSecretKey();
console.log('Secret Key:', secretKey);
