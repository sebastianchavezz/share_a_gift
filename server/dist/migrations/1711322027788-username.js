"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Username1711322027788 = void 0;
class Username1711322027788 {
    constructor() {
        this.name = 'Username1711322027788';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "party" RENAME COLUMN "messaging" TO "description"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "naam" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user" ADD "achterNaam" character varying(50)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "achterNaam"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "naam"`);
        await queryRunner.query(`ALTER TABLE "party" RENAME COLUMN "description" TO "messaging"`);
    }
}
exports.Username1711322027788 = Username1711322027788;
