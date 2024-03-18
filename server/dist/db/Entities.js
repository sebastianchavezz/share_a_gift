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
exports.Friendship = exports.Messages = exports.Participants = exports.Conversations = exports.Comments = exports.Likes = exports.Posts = exports.Present = exports.PartyUser = exports.Party = exports.User = void 0;
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
    (0, typeorm_1.Column)({ name: 'username', length: 50, unique: true }),
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
    (0, typeorm_1.Column)({ name: 'psswrd', length: 100 }),
    __metadata("design:type", String)
], User.prototype, "Psswrd", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Participants, participants => participants.user),
    __metadata("design:type", Array)
], User.prototype, "participants", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Likes, likes => likes.user),
    __metadata("design:type", Array)
], User.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PartyUser, partyUser => partyUser.user),
    __metadata("design:type", Array)
], User.prototype, "parties", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Posts, posts => posts.user),
    __metadata("design:type", Array)
], User.prototype, "posts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comments, comments => comments.user),
    __metadata("design:type", Array)
], User.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Messages, messages => messages.sender),
    __metadata("design:type", Array)
], User.prototype, "messages", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Friendship, friendship => friendship.user1),
    __metadata("design:type", Array)
], User.prototype, "friendships1", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Friendship, friendship => friendship.user2),
    __metadata("design:type", Array)
], User.prototype, "friendships2", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
let Party = class Party {
};
exports.Party = Party;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'partyid' }),
    __metadata("design:type", Number)
], Party.prototype, "PartyID", void 0);
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
    (0, typeorm_1.Column)({ name: 'messaging', length: 255, nullable: true }),
    __metadata("design:type", String)
], Party.prototype, "Messaging", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => PartyUser, partyUser => partyUser.party),
    __metadata("design:type", Array)
], Party.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Present, present => present.party),
    __metadata("design:type", Array)
], Party.prototype, "presents", void 0);
exports.Party = Party = __decorate([
    (0, typeorm_1.Entity)()
], Party);
let PartyUser = class PartyUser {
};
exports.PartyUser = PartyUser;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PartyUser.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Party, party => party.users),
    (0, typeorm_1.JoinColumn)({ name: 'partyid' }),
    __metadata("design:type", Party)
], PartyUser.prototype, "party", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.parties),
    (0, typeorm_1.JoinColumn)({ name: 'userid' }),
    __metadata("design:type", User)
], PartyUser.prototype, "user", void 0);
exports.PartyUser = PartyUser = __decorate([
    (0, typeorm_1.Entity)()
], PartyUser);
let Present = class Present {
};
exports.Present = Present;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'presentsid' }),
    __metadata("design:type", Number)
], Present.prototype, "PresentsID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Party, party => party.presents),
    (0, typeorm_1.JoinColumn)({ name: 'partyid' }),
    __metadata("design:type", Party)
], Present.prototype, "party", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Present, present => present.party),
    (0, typeorm_1.JoinColumn)({ name: 'presentid' }),
    __metadata("design:type", Present)
], Present.prototype, "present", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'pricepayed', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], Present.prototype, "PricePayed", void 0);
exports.Present = Present = __decorate([
    (0, typeorm_1.Entity)()
], Present);
let Posts = class Posts {
};
exports.Posts = Posts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'postid' }),
    __metadata("design:type", Number)
], Posts.prototype, "PostID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.posts),
    (0, typeorm_1.JoinColumn)({ name: 'userid' }),
    __metadata("design:type", User)
], Posts.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'content', type: 'text' }),
    __metadata("design:type", String)
], Posts.prototype, "Content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Posts.prototype, "Timestamp", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Likes, likes => likes.post),
    __metadata("design:type", Array)
], Posts.prototype, "likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comments, comments => comments.post),
    __metadata("design:type", Array)
], Posts.prototype, "comments", void 0);
exports.Posts = Posts = __decorate([
    (0, typeorm_1.Entity)()
], Posts);
let Likes = class Likes {
};
exports.Likes = Likes;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'likeid' }),
    __metadata("design:type", Number)
], Likes.prototype, "LikeID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Posts, posts => posts.likes),
    (0, typeorm_1.JoinColumn)({ name: 'postid' }),
    __metadata("design:type", Posts)
], Likes.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.likes),
    (0, typeorm_1.JoinColumn)({ name: 'userid' }),
    __metadata("design:type", User)
], Likes.prototype, "user", void 0);
exports.Likes = Likes = __decorate([
    (0, typeorm_1.Entity)()
], Likes);
let Comments = class Comments {
};
exports.Comments = Comments;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'commetid' }),
    __metadata("design:type", Number)
], Comments.prototype, "CommentID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Posts, posts => posts.comments),
    (0, typeorm_1.JoinColumn)({ name: 'postid' }),
    __metadata("design:type", Posts)
], Comments.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.comments),
    (0, typeorm_1.JoinColumn)({ name: 'userid' }),
    __metadata("design:type", User)
], Comments.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'content', type: 'text' }),
    __metadata("design:type", String)
], Comments.prototype, "Content", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Comments.prototype, "Timestamp", void 0);
exports.Comments = Comments = __decorate([
    (0, typeorm_1.Entity)()
], Comments);
let Conversations = class Conversations {
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
let Participants = class Participants {
};
exports.Participants = Participants;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Participants.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Conversations, conversations => conversations.participants),
    (0, typeorm_1.JoinColumn)({ name: 'conversationid' }),
    __metadata("design:type", Conversations)
], Participants.prototype, "conversation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.participants),
    (0, typeorm_1.JoinColumn)({ name: 'userid' }),
    __metadata("design:type", User)
], Participants.prototype, "user", void 0);
exports.Participants = Participants = __decorate([
    (0, typeorm_1.Entity)()
], Participants);
let Messages = class Messages {
};
exports.Messages = Messages;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'messageid' }),
    __metadata("design:type", Number)
], Messages.prototype, "MessageID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Conversations, conversations => conversations.messages),
    (0, typeorm_1.JoinColumn)({ name: 'conversationid' }),
    __metadata("design:type", Conversations)
], Messages.prototype, "conversation", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.messages),
    (0, typeorm_1.JoinColumn)({ name: 'senderid' }),
    __metadata("design:type", User)
], Messages.prototype, "sender", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'content', type: 'text' }),
    __metadata("design:type", String)
], Messages.prototype, "Content", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Messages.prototype, "Timestamp", void 0);
exports.Messages = Messages = __decorate([
    (0, typeorm_1.Entity)()
], Messages);
let Friendship = class Friendship {
};
exports.Friendship = Friendship;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'friendshipid' }),
    __metadata("design:type", Number)
], Friendship.prototype, "FriendshipID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Friendship.prototype, "UserID1", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Friendship.prototype, "UserID2", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.friendships1),
    (0, typeorm_1.JoinColumn)({ name: 'userid1' }),
    __metadata("design:type", User)
], Friendship.prototype, "user1", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.friendships2),
    (0, typeorm_1.JoinColumn)({ name: 'userid2' }),
    __metadata("design:type", User)
], Friendship.prototype, "user2", void 0);
exports.Friendship = Friendship = __decorate([
    (0, typeorm_1.Entity)()
], Friendship);
