import { MigrationInterface, QueryRunner } from "typeorm";

export class PicAdded1711470013157 implements MigrationInterface {
    name = 'PicAdded1711470013157'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "profilePicture" bytea`);
        await queryRunner.query(`ALTER TABLE "party" ADD "image" bytea`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "party" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "profilePicture"`);
    }

}
