"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamePartyAdded1711630081221 = void 0;
class NamePartyAdded1711630081221 {
    constructor() {
        this.name = 'NamePartyAdded1711630081221';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "party" ADD "name" character varying(255)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "party" DROP COLUMN "name"`);
    }
}
exports.NamePartyAdded1711630081221 = NamePartyAdded1711630081221;
