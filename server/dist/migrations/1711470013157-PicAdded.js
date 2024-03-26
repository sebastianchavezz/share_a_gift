"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PicAdded1711470013157 = void 0;
class PicAdded1711470013157 {
    constructor() {
        this.name = 'PicAdded1711470013157';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD "profilePicture" bytea`);
        await queryRunner.query(`ALTER TABLE "party" ADD "image" bytea`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "party" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePicture"`);
    }
}
exports.PicAdded1711470013157 = PicAdded1711470013157;
