"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const Entities_1 = require("../db/Entities");
const db_1 = __importDefault(require("../db/db"));
class UserModel {
    constructor() {
        this.userRepository = db_1.default.getRepository(Entities_1.User);
    }
    async loginUser(username, password) {
        // Logic to find and validate user credentials (not implemented)
        const user = await this.userRepository.findOne({ where: { Username: username } });
        if (!user) {
            throw new Error("User not found");
        }
        const passwordMatch = user.Psswrd === password;
        if (!passwordMatch) {
            throw new Error("Incorrect Password");
        }
        return user;
    }
    async addUser(userData) {
        //TODO: check if email already in use
        const hashedPassword = userData.password;
        const newUser = this.userRepository.create({
            Username: userData.username, Email: userData.email,
            Naam: userData.naam, AchterNaam: userData.achterNaam,
            Tel: userData.tel,
            Psswrd: hashedPassword,
            //AddressID: userData.addressId,
        });
        await this.userRepository.save(newUser);
    }
    async getUserById(userId) {
        const user = await this.userRepository.findOne({ where: { UserID: userId } });
        if (!user) {
            throw new Error('User not Found');
        }
        return user;
    }
    async updateUser(userId, updatedUserData) {
        // Logic to update user data (not implemented)
        //TODO
    }
    async deleteUser(userId) {
        await this.userRepository.delete(userId);
    }
    async findUserByEmail(email) {
        const user = await this.userRepository.findOne({ where: { Email: email } });
        if (!user) {
            throw new Error('No user with this email!');
        }
        return user;
    }
}
exports.UserModel = UserModel;
