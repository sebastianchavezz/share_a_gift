"use strict";
//src/db/Entities.ts
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversations = exports.Participants = exports.Messages = exports.FriendshipRequest = exports.Friendship = exports.Party = exports.User = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
let User = class User extends typeorm_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'userid' }),
    __metadata("design:type", Number)
], User.prototype, "UserID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'naam', length: 50, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "Naam", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'achterNaam', length: 50, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "AchterNaam", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'username', length: 50, unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "Username", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', length: 100, unique: true }),
    __metadata("design:type", String)
], User.prototype, "Email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tel', length: 20, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "Tel", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'parties', default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "Parties", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'psswrd', length: 100, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "Psswrd", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'profilePicture', type: 'bytea', nullable: true }),
    __metadata("design:type", Buffer)
], User.prototype, "ImageData", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Party, (party) => party.users),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "parties", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User, {
        cascade: ['remove'],
    }),
    (0, typeorm_1.JoinTable)({
        name: 'user_friends',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'UserID',
        },
        inverseJoinColumn: {
            name: 'friend_id',
            referencedColumnName: 'UserID',
        },
    }),
    __metadata("design:type", Array)
], User.prototype, "Friends", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FriendshipRequest, request => request.requester),
    __metadata("design:type", Array)
], User.prototype, "sentFriendshipRequests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => FriendshipRequest, request => request.receiver),
    __metadata("design:type", Array)
], User.prototype, "receivedFriendshipRequests", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Participants, participants => participants.user),
    __metadata("design:type", Array)
], User.prototype, "conversations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Messages, messages => messages.sender),
    __metadata("design:type", Array)
], User.prototype, "sentMessages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Messages, messages => messages.conversation),
    __metadata("design:type", Array)
], User.prototype, "receivedMessages", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
let Party = class Party extends typeorm_1.BaseEntity {
};
exports.Party = Party;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'partyid' }),
    __metadata("design:type", Number)
], Party.prototype, "PartyID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', length: 255, nullable: true }),
    __metadata("design:type", String)
], Party.prototype, "Name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'occasion', length: 255 }),
    __metadata("design:type", String)
], Party.prototype, "Occasion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'datestart' }),
    __metadata("design:type", Date)
], Party.prototype, "DateStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'dateend' }),
    __metadata("design:type", Date)
], Party.prototype, "DateEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description', length: 255, nullable: true }),
    __metadata("design:type", String)
], Party.prototype, "Description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image', type: 'bytea', nullable: true }),
    __metadata("design:type", Buffer)
], Party.prototype, "ImageData", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => User, (user) => user.parties, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Party.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.parties, {
        cascade: true, // Add cascade deletion
    }),
    (0, typeorm_1.JoinColumn)({ name: 'creator_id' }),
    __metadata("design:type", User)
], Party.prototype, "Creator", void 0);
exports.Party = Party = __decorate([
    (0, typeorm_1.Entity)()
], Party);
let FriendshipRequest = class FriendshipRequest extends typeorm_1.BaseEntity {
};
exports.FriendshipRequest = FriendshipRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'request_id' }),
    __metadata("design:type", Number)
], FriendshipRequest.prototype, "requestID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.sentFriendshipRequests),
    (0, typeorm_1.JoinColumn)({ name: 'requester_id' }),
    __metadata("design:type", User)
], FriendshipRequest.prototype, "requester", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.receivedFriendshipRequests),
    (0, typeorm_1.JoinColumn)({ name: 'receiver_id' }),
    __metadata("design:type", User)
], FriendshipRequest.prototype, "receiver", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'pending' }),
    __metadata("design:type", String)
], FriendshipRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], FriendshipRequest.prototype, "createdAt", void 0);
exports.FriendshipRequest = FriendshipRequest = __decorate([
    (0, typeorm_1.Entity)()
], FriendshipRequest);
let Friendship = class Friendship extends typeorm_1.BaseEntity {
};
exports.Friendship = Friendship;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'friendship_id' }),
    __metadata("design:type", Number)
], Friendship.prototype, "friendshipID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.Friends),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    __metadata("design:type", User)
], Friendship.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.Friends),
    (0, typeorm_1.JoinColumn)({ name: 'friend_id' }),
    __metadata("design:type", User)
], Friendship.prototype, "friend", void 0);
exports.Friendship = Friendship = __decorate([
    (0, typeorm_1.Entity)()
], Friendship);
let Conversations = class Conversations extends typeorm_1.BaseEntity {
};
exports.Conversations = Conversations;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'conversationsid' }),
    __metadata("design:type", Number)
], Conversations.prototype, "ConversationID", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'createdat', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Conversations.prototype, "CreatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lastmessageat', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Conversations.prototype, "LastMessageAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Participants, participants => participants.conversation),
    __metadata("design:type", Array)
], Conversations.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Messages, messages => messages.conversation),
    __metadata("design:type", Array)
], Conversations.prototype, "messages", void 0);
exports.Conversations = Conversations = __decorate([
    (0, typeorm_1.Entity)()
], Conversations);
let Participants = class Participants extends typeorm_1.BaseEntity {
};
exports.Participants = Participants;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Participants.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Conversations, conversation => conversation.participants),
    (0, typeorm_1.JoinColumn)({ name: 'conversationId' }),
    __metadata("design:type", Conversations)
], Participants.prototype, "conversation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.conversations),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", User)
], Participants.prototype, "user", void 0);
exports.Participants = Participants = __decorate([
    (0, typeorm_1.Entity)()
], Participants);
let Messages = class Messages extends typeorm_1.BaseEntity {
};
exports.Messages = Messages;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Messages.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Conversations, conversation => conversation.messages, { onDelete: 'CASCADE' }) // Cascade deletion
    ,
    (0, typeorm_1.JoinColumn)({ name: 'conversationId' }),
    __metadata("design:type", Conversations)
], Messages.prototype, "conversation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.sentMessages, { onDelete: 'CASCADE' }) // Cascade deletion
    ,
    (0, typeorm_1.JoinColumn)({ name: 'senderId' }),
    __metadata("design:type", User)
], Messages.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Messages.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Messages.prototype, "timestamp", void 0);
exports.Messages = Messages = __decorate([
    (0, typeorm_1.Entity)()
], Messages);
