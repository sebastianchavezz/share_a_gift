"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Friendship1712153219081 = void 0;
class Friendship1712153219081 {
    constructor() {
        this.name = 'Friendship1712153219081';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "friendship_request" ("request_id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "requester_id" integer, "receiver_id" integer, CONSTRAINT "PK_c5e755a7ade91e8ff5f1c9693f1" PRIMARY KEY ("request_id"))`);
        await queryRunner.query(`ALTER TABLE "friendship_request" ADD CONSTRAINT "FK_cf0f1130ce4024f2063d111878c" FOREIGN KEY ("requester_id") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendship_request" ADD CONSTRAINT "FK_570665ae82788b919d3c2f67413" FOREIGN KEY ("receiver_id") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "friendship_request" DROP CONSTRAINT "FK_570665ae82788b919d3c2f67413"`);
        await queryRunner.query(`ALTER TABLE "friendship_request" DROP CONSTRAINT "FK_cf0f1130ce4024f2063d111878c"`);
        await queryRunner.query(`DROP TABLE "friendship_request"`);
    }
}
exports.Friendship1712153219081 = Friendship1712153219081;
