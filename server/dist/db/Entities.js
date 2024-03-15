"use strict";
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
exports.PartyUser = exports.Party = exports.Address = exports.User = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
let User = class User extends typeorm_1.BaseEntity {
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], User.prototype, "UserID", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, unique: true }),
    __metadata("design:type", String)
], User.prototype, "Username", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, unique: true }),
    __metadata("design:type", String)
], User.prototype, "Email", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "Tel", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "Parties", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], User.prototype, "Psswrd", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], User.prototype, "AddressID", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => PartyUser, partyUser => partyUser.user),
    __metadata("design:type", Array)
], User.prototype, "parties", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => Address, address => address.user),
    __metadata("design:type", Address)
], User.prototype, "address", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
let Address = class Address {
};
exports.Address = Address;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Address.prototype, "AddressID", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "Street", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "City", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 50, nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "State", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 20, nullable: true }),
    __metadata("design:type", String)
], Address.prototype, "PostalCode", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => User, user => user.address),
    __metadata("design:type", User)
], Address.prototype, "user", void 0);
exports.Address = Address = __decorate([
    (0, typeorm_1.Entity)()
], Address);
let Party = class Party {
};
exports.Party = Party;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Party.prototype, "PartyID", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255 }),
    __metadata("design:type", String)
], Party.prototype, "Occasion", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Party.prototype, "DateStart", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Party.prototype, "DateEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 255, nullable: true }),
    __metadata("design:type", String)
], Party.prototype, "Messaging", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(type => PartyUser, partyUser => partyUser.party),
    __metadata("design:type", Array)
], Party.prototype, "users", void 0);
exports.Party = Party = __decorate([
    (0, typeorm_1.Entity)()
], Party);
let PartyUser = class PartyUser {
};
exports.PartyUser = PartyUser;
__decorate([
    (0, typeorm_1.PrimaryColumn)() // Since the primary key consists of two columns, use @PrimaryColumn instead of @PrimaryGeneratedColumn
    ,
    __metadata("design:type", Number)
], PartyUser.prototype, "PartyID", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)() // Second part of the composite primary key
    ,
    __metadata("design:type", Number)
], PartyUser.prototype, "UserID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Party, party => party.users) // Define ManyToOne relationship with Party entity
    ,
    (0, typeorm_1.JoinColumn)({ name: 'PartyID' }) // Specify the foreign key column
    ,
    __metadata("design:type", Party)
], PartyUser.prototype, "party", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User, user => user.parties) // Define ManyToOne relationship with User entity
    ,
    (0, typeorm_1.JoinColumn)({ name: 'UserID' }) // Specify the foreign key column
    ,
    __metadata("design:type", User)
], PartyUser.prototype, "user", void 0);
exports.PartyUser = PartyUser = __decorate([
    (0, typeorm_1.Entity)()
], PartyUser);
