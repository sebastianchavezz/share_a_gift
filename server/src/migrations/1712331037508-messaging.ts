import { MigrationInterface, QueryRunner } from "typeorm";

export class Messaging1712331037508 implements MigrationInterface {
    name = 'Messaging1712331037508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "conversations" ("conversationsid" SERIAL NOT NULL, "createdat" TIMESTAMP NOT NULL DEFAULT now(), "lastmessageat" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a1b705da56837cb46cd9dba9daa" PRIMARY KEY ("conversationsid"))`);
        await queryRunner.query(`CREATE TABLE "participants" ("id" SERIAL NOT NULL, "conversationId" integer, "userId" integer, CONSTRAINT "PK_1cda06c31eec1c95b3365a0283f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("id" SERIAL NOT NULL, "content" text NOT NULL, "timestamp" TIMESTAMP NOT NULL DEFAULT now(), "conversationId" integer, "senderId" integer, CONSTRAINT "PK_18325f38ae6de43878487eff986" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_6b54f24a585e94ef3fc7aa7ef5d" FOREIGN KEY ("conversationId") REFERENCES "conversations"("conversationsid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "participants" ADD CONSTRAINT "FK_5fc9cddc801b973cd9edcdda42a" FOREIGN KEY ("userId") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19" FOREIGN KEY ("conversationId") REFERENCES "conversations"("conversationsid") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce" FOREIGN KEY ("senderId") REFERENCES "user"("userid") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_2db9cf2b3ca111742793f6c37ce"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_e5663ce0c730b2de83445e2fd19"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_5fc9cddc801b973cd9edcdda42a"`);
        await queryRunner.query(`ALTER TABLE "participants" DROP CONSTRAINT "FK_6b54f24a585e94ef3fc7aa7ef5d"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "participants"`);
        await queryRunner.query(`DROP TABLE "conversations"`);
    }

}
