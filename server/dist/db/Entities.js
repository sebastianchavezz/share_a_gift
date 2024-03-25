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
exports.Party = exports.User = void 0;
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
    (0, typeorm_1.ManyToMany)(() => Party, (party) => party.users),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], User.prototype, "parties", void 0);
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
    (0, typeorm_1.ManyToMany)(() => User, (user) => user.parties, {
        cascade: true,
    }),
    __metadata("design:type", Array)
], Party.prototype, "users", void 0);
exports.Party = Party = __decorate([
    (0, typeorm_1.Entity)()
], Party);
