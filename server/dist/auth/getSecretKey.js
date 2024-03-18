"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
function generateSecretKey() {
    return (0, crypto_1.randomBytes)(32).toString('hex');
}
const secretKey = generateSecretKey();
console.log('Secret Key:', secretKey);
//c3728b36f425fb184f8f91b06b8293eb19f3f837e21b65a8172dfe80bebdd00c
