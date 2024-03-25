import { MigrationInterface, QueryRunner } from "typeorm";

export class Username1711322027788 implements MigrationInterface {
    name = 'Username1711322027788'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "party" RENAME COLUMN "messaging" TO "description"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "naam" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "user" ADD "achterNaam" character varying(50)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "achterNaam"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "naam"`);
        await queryRunner.query(`ALTER TABLE "party" RENAME COLUMN "description" TO "messaging"`);
    }

}
