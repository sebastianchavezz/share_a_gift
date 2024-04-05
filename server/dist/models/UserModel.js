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
    async getUserById(userid) {
        console.log(typeof userid);
        const id = parseInt(userid, 10);
        const user = await this.userRepository.findOne({ where: { UserID: id } });
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
    async CommitPicture(userid, picture) {
        const id = parseInt(userid, 10);
        const user = await this.userRepository.findOne({ where: { UserID: id } });
        if (!user) {
            throw new Error('User not found');
        }
        user.ImageData = picture;
        await this.userRepository.save(user);
    }
    async searchUsers(query) {
        // Implement logic to search users based on the query
        const users = await this.userRepository.createQueryBuilder("user")
            .where("user.Username LIKE :query OR user.Email LIKE :query", { query: `%${query}%` })
            .getMany();
        return users;
    }
    async requestFriendship(from, to) {
        const id_sender = parseInt(from, 10);
        const id_receiver = parseInt(to, 10);
        const sender = await this.userRepository.findOne({ where: { UserID: id_sender } });
        const receiver = await this.userRepository.findOne({ where: { UserID: id_receiver } });
        if (!sender || !receiver) {
            throw new Error('Sender or receiver not found');
        }
        if (sender.UserID === receiver.UserID) {
            throw new Error('You cannot be friends with yourself mate!!');
        }
        const friendshipRepo = db_1.default.getRepository(Entities_1.FriendshipRequest);
        //TODO : uitlezen wat de status is en daarop logica schrijven
        const existingRequest = await friendshipRepo.findOne({
            where: { requester: sender, receiver: receiver },
            relations: ['requester', 'receiver']
        });
        if (existingRequest) {
            throw new Error('The status is pending. Geduld jong');
        }
        const newRequest = friendshipRepo.create({
            requester: sender,
            receiver: receiver,
            status: 'pending'
        });
        await friendshipRepo.save(newRequest);
    }
    async getFriendshipRequest(userid) {
        const id = parseInt(userid, 10);
        const user = await this.userRepository.findOne({ where: { UserID: id } });
        if (!user) {
            throw new Error('User not found');
        }
        const friendshipRequestRepo = db_1.default.getRepository(Entities_1.FriendshipRequest);
        const friendshipRequest = await friendshipRequestRepo.find({
            where: {
                receiver: user,
                status: 'pending'
            },
            relations: ['requester', 'receiver']
        });
        if (!friendshipRequest) {
            throw new Error('No friendship request found for this user');
        }
        return friendshipRequest;
    }
    async acceptOrDeclineRequest(userid, otherid, status) {
        const id_sender = parseInt(otherid, 10);
        const id_receiver = parseInt(userid, 10);
        const sender = await this.userRepository.findOne({ where: { UserID: id_sender } });
        const receiver = await this.userRepository.findOne({ where: { UserID: id_receiver } });
        if (!sender || !receiver) {
            throw new Error('Sender or receiver not found');
        }
        const friendshipRepo = db_1.default.getRepository(Entities_1.FriendshipRequest);
        //TODO : uitlezen wat de status is en daarop logica schrijven
        const existingRequest = await friendshipRepo.findOne({
            where: { requester: sender, receiver: receiver }
        });
        if (!existingRequest) {
            throw new Error('The status is gewoon Herres maat');
        }
        if (existingRequest.status !== "pending") {
            throw new Error('The FRIENDSHIP was already accepted or deleted my n-word');
        }
        existingRequest.status = status;
        await friendshipRepo.save(existingRequest);
        if (status === "accepted") {
            // Create a new friendship entry in the database
            const friendship = new Entities_1.Friendship();
            friendship.user = sender;
            friendship.friend = receiver;
            await friendship.save();
        }
    }
    async getAllFriends(userid) {
        const id = parseInt(userid, 10);
        const user = await this.userRepository.findOne({ where: { UserID: id } });
        if (!user) {
            throw new Error('User not found');
        }
        const friendshipRepo = db_1.default.getRepository(Entities_1.Friendship);
        const friendships = await friendshipRepo.find({
            where: [{ user: user }, { friend: user }],
            relations: ['user', 'friend'] // Include the 'friend' relation to retrieve the associated user
        });
        if (!friendships || friendships.length === 0) {
            throw new Error('Friendship not found mate');
        }
        const friendIDs = [];
        for (const friendship of friendships) {
            if (friendship.friend.UserID === user.UserID) {
                friendIDs.push(friendship.user.UserID);
            }
            else {
                friendIDs.push(friendship.friend.UserID);
            }
        }
        const users = [];
        for (const friendsID of friendIDs) {
            const temp_user = await this.userRepository.findOne({ where: { UserID: friendsID } });
            if (!temp_user) {
                throw new Error('NO USER');
            }
            users.push(temp_user);
        }
        return users;
    }
}
exports.UserModel = UserModel;
