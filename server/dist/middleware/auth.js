"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware function to verify token
const verifyToken = (req, res, next) => {
    // Get the token from the request headers
    const token = req.headers.authorization?.split(' ')[1];
    // Check if token is provided
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
        return;
    }
    // Verify the token
    jsonwebtoken_1.default.verify(token, 'c3728b36f425fb184f8f91b06b8293eb19f3f837e21b65a8172dfe80bebdd00c', (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized: Invalid token');
        }
        // If token is valid, set the decoded data to request object
        req.user = decoded;
        console.log('Verification is OKE');
        next(); // Proceed to the next middleware or route handler
    });
};
exports.verifyToken = verifyToken;
