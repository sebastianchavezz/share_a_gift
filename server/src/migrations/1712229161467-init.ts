import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1712229161467 implements MigrationInterface {
    name = 'Init1712229161467'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("userid" SERIAL NOT NULL, "naam" character varying(50), "achterNaam" character varying(50), "username" character varying(50), "email" character varying(100) NOT NULL, "tel" character varying(20), "parties" integer NOT NULL DEFAULT '0', "psswrd" character varying(100), "profilePicture" bytea, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_755ac9fbd440bc9b97fe9532108" PRIMARY KEY ("userid"))`);
        await queryRunner.query(`CREATE TABLE "party" ("partyid" SERIAL NOT NULL, "name" character varying(255), "occasion" character varying(255) NOT NULL, "datestart" TIMESTAMP NOT NULL, "dateend" TIMESTAMP NOT NULL, "description" character varying(255), "image" bytea, "creator_id" integer, CONSTRAINT "PK_f03cb2d9cce42495e121103e369" PRIMARY KEY ("partyid"))`);
        await queryRunner.query(`CREATE TABLE "friendship_request" ("request_id" SERIAL NOT NULL, "status" character varying NOT NULL DEFAULT 'pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "requester_id" integer, "receiver_id" integer, CONSTRAINT "PK_c5e755a7ade91e8ff5f1c9693f1" PRIMARY KEY ("request_id"))`);
        await queryRunner.query(`CREATE TABLE "friendship" ("friendship_id" SERIAL NOT NULL, "user_id" integer, "friend_id" integer, CONSTRAINT "PK_624a6afa21396d0ce441c0570f4" PRIMARY KEY ("friendship_id"))`);
        await queryRunner.query(`CREATE TABLE "user_parties_party" ("userUserid" integer NOT NULL, "partyPartyid" integer NOT NULL, CONSTRAINT "PK_d052580abe30da5fd6c20bacd8b" PRIMARY KEY ("userUserid", "partyPartyid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a24d2a65e7966924096706ad05" ON "user_parties_party" ("userUserid") `);
        await queryRunner.query(`CREATE INDEX "IDX_7aeaa9425b5286122cbfc0d0ff" ON "user_parties_party" ("partyPartyid") `);
        await queryRunner.query(`CREATE TABLE "user_friends" ("user_id" integer NOT NULL, "friend_id" integer NOT NULL, CONSTRAINT "PK_657d2355d5000f103ff3612447f" PRIMARY KEY ("user_id", "friend_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_73aac2cba30951ed7c7000c614" ON "user_friends" ("user_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_24f1e41a3801477d44228395e3" ON "user_friends" ("friend_id") `);
        await queryRunner.query(`ALTER TABLE "party" ADD CONSTRAINT "FK_ef0ecd9a454280b772fbac67733" FOREIGN KEY ("creator_id") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendship_request" ADD CONSTRAINT "FK_cf0f1130ce4024f2063d111878c" FOREIGN KEY ("requester_id") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendship_request" ADD CONSTRAINT "FK_570665ae82788b919d3c2f67413" FOREIGN KEY ("receiver_id") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendship" ADD CONSTRAINT "FK_8885973a7c761a7f8fc0fc673f6" FOREIGN KEY ("user_id") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "friendship" ADD CONSTRAINT "FK_8cadaad5534dd8b4827f05968ef" FOREIGN KEY ("friend_id") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_parties_party" ADD CONSTRAINT "FK_a24d2a65e7966924096706ad055" FOREIGN KEY ("userUserid") REFERENCES "user"("userid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_parties_party" ADD CONSTRAINT "FK_7aeaa9425b5286122cbfc0d0ff2" FOREIGN KEY ("partyPartyid") REFERENCES "party"("partyid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_friends" ADD CONSTRAINT "FK_73aac2cba30951ed7c7000c6142" FOREIGN KEY ("user_id") REFERENCES "user"("userid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_friends" ADD CONSTRAINT "FK_24f1e41a3801477d44228395e3b" FOREIGN KEY ("friend_id") REFERENCES "user"("userid") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_friends" DROP CONSTRAINT "FK_24f1e41a3801477d44228395e3b"`);
        await queryRunner.query(`ALTER TABLE "user_friends" DROP CONSTRAINT "FK_73aac2cba30951ed7c7000c6142"`);
        await queryRunner.query(`ALTER TABLE "user_parties_party" DROP CONSTRAINT "FK_7aeaa9425b5286122cbfc0d0ff2"`);
        await queryRunner.query(`ALTER TABLE "user_parties_party" DROP CONSTRAINT "FK_a24d2a65e7966924096706ad055"`);
        await queryRunner.query(`ALTER TABLE "friendship" DROP CONSTRAINT "FK_8cadaad5534dd8b4827f05968ef"`);
        await queryRunner.query(`ALTER TABLE "friendship" DROP CONSTRAINT "FK_8885973a7c761a7f8fc0fc673f6"`);
        await queryRunner.query(`ALTER TABLE "friendship_request" DROP CONSTRAINT "FK_570665ae82788b919d3c2f67413"`);
        await queryRunner.query(`ALTER TABLE "friendship_request" DROP CONSTRAINT "FK_cf0f1130ce4024f2063d111878c"`);
        await queryRunner.query(`ALTER TABLE "party" DROP CONSTRAINT "FK_ef0ecd9a454280b772fbac67733"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_24f1e41a3801477d44228395e3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_73aac2cba30951ed7c7000c614"`);
        await queryRunner.query(`DROP TABLE "user_friends"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7aeaa9425b5286122cbfc0d0ff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a24d2a65e7966924096706ad05"`);
        await queryRunner.query(`DROP TABLE "user_parties_party"`);
        await queryRunner.query(`DROP TABLE "friendship"`);
        await queryRunner.query(`DROP TABLE "friendship_request"`);
        await queryRunner.query(`DROP TABLE "party"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
