"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1711225155398 = void 0;
class Init1711225155398 {
    constructor() {
        this.name = 'Init1711225155398';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "psswrd" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "psswrd" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "username" SET NOT NULL`);
    }
}
exports.Init1711225155398 = Init1711225155398;
