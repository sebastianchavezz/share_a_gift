import { MigrationInterface, QueryRunner } from "typeorm";

export class NamePartyAdded1711630081221 implements MigrationInterface {
    name = 'NamePartyAdded1711630081221'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "party" ADD "name" character varying(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "party" DROP COLUMN "name"`);
    }

}
