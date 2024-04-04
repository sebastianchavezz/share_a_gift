"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init21712224350319 = void 0;
class Init21712224350319 {
    constructor() {
        this.name = 'Init21712224350319';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_friends" DROP CONSTRAINT "FK_2a56e9cae11962bd4c8049d38a1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a56e9cae11962bd4c8049d38a"`);
        await queryRunner.query(`ALTER TABLE "user_friends" RENAME COLUMN "userUserid" TO "friend_id"`);
        await queryRunner.query(`ALTER TABLE "user_friends" RENAME CONSTRAINT "PK_ab6ae0a60262f8523d7d9a4da3c" TO "PK_657d2355d5000f103ff3612447f"`);
        await queryRunner.query(`CREATE TABLE "friendship" ("friendship_id" SERIAL NOT NULL, "user_id" integer, "friend_id" integer, CONSTRAINT "PK_624a6afa21396d0ce441c0570f4" PRIMARY KEY ("friendship_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_24f1e41a3801477d44228395e3" ON "user_friends" ("friend_id") `);
        await queryRunner.query(`ALTER TABLE "friendship" ADD CONSTRAINT "FK_8885973a7c761a7f8fc0fc673f6" FOREIGN KEY ("user_id") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendship" ADD CONSTRAINT "FK_8cadaad5534dd8b4827f05968ef" FOREIGN KEY ("friend_id") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friends" ADD CONSTRAINT "FK_24f1e41a3801477d44228395e3b" FOREIGN KEY ("friend_id") REFERENCES "user"("userid") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user_friends" DROP CONSTRAINT "FK_24f1e41a3801477d44228395e3b"`);
        await queryRunner.query(`ALTER TABLE "friendship" DROP CONSTRAINT "FK_8cadaad5534dd8b4827f05968ef"`);
        await queryRunner.query(`ALTER TABLE "friendship" DROP CONSTRAINT "FK_8885973a7c761a7f8fc0fc673f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24f1e41a3801477d44228395e3"`);
        await queryRunner.query(`DROP TABLE "friendship"`);
        await queryRunner.query(`ALTER TABLE "user_friends" RENAME CONSTRAINT "PK_657d2355d5000f103ff3612447f" TO "PK_ab6ae0a60262f8523d7d9a4da3c"`);
        await queryRunner.query(`ALTER TABLE "user_friends" RENAME COLUMN "friend_id" TO "userUserid"`);
        await queryRunner.query(`CREATE INDEX "IDX_2a56e9cae11962bd4c8049d38a" ON "user_friends" ("userUserid") `);
        await queryRunner.query(`ALTER TABLE "user_friends" ADD CONSTRAINT "FK_2a56e9cae11962bd4c8049d38a1" FOREIGN KEY ("userUserid") REFERENCES "user"("userid") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
}
exports.Init21712224350319 = Init21712224350319;
