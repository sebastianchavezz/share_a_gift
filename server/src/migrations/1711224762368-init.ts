import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1711224762368 implements MigrationInterface {
    name = 'Init1711224762368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("userid" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "email" character varying(100) NOT NULL, "tel" character varying(20), "parties" integer NOT NULL DEFAULT '0', "psswrd" character varying(100) NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_755ac9fbd440bc9b97fe9532108" PRIMARY KEY ("userid"))`);
        await queryRunner.query(`CREATE TABLE "party" ("partyid" SERIAL NOT NULL, "occasion" character varying(255) NOT NULL, "datestart" TIMESTAMP NOT NULL, "dateend" TIMESTAMP NOT NULL, "messaging" character varying(255), CONSTRAINT "PK_f03cb2d9cce42495e121103e369" PRIMARY KEY ("partyid"))`);
        await queryRunner.query(`CREATE TABLE "user_parties_party" ("userUserid" integer NOT NULL, "partyPartyid" integer NOT NULL, CONSTRAINT "PK_d052580abe30da5fd6c20bacd8b" PRIMARY KEY ("userUserid", "partyPartyid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_a24d2a65e7966924096706ad05" ON "user_parties_party" ("userUserid") `);
        await queryRunner.query(`CREATE INDEX "IDX_7aeaa9425b5286122cbfc0d0ff" ON "user_parties_party" ("partyPartyid") `);
        await queryRunner.query(`ALTER TABLE "user_parties_party" ADD CONSTRAINT "FK_a24d2a65e7966924096706ad055" FOREIGN KEY ("userUserid") REFERENCES "user"("userid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_parties_party" ADD CONSTRAINT "FK_7aeaa9425b5286122cbfc0d0ff2" FOREIGN KEY ("partyPartyid") REFERENCES "party"("partyid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_parties_party" DROP CONSTRAINT "FK_7aeaa9425b5286122cbfc0d0ff2"`);
        await queryRunner.query(`ALTER TABLE "user_parties_party" DROP CONSTRAINT "FK_a24d2a65e7966924096706ad055"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7aeaa9425b5286122cbfc0d0ff"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a24d2a65e7966924096706ad05"`);
        await queryRunner.query(`DROP TABLE "user_parties_party"`);
        await queryRunner.query(`DROP TABLE "party"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
