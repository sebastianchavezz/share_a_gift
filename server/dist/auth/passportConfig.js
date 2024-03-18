"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/auth/passportConfig.ts
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const UserModel_1 = require("../models/UserModel");
const userModel = new UserModel_1.UserModel();
passport_1.default.use(new passport_local_1.Strategy(async (username, password, done) => {
    try {
        const user = await userModel.loginUser(username, password);
        if (!user) {
            return done(null, false, { message: 'Incorrect username or password' });
        }
        return done(null, user);
    }
    catch (error) {
        return done(error);
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.getUserById(id);
        done(null, user);
    }
    catch (error) {
        done(error);
    }
});
