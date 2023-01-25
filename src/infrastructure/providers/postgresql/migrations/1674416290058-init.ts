import { MigrationInterface, QueryRunner } from "typeorm";

export class init1674416290058 implements MigrationInterface {
    name = 'init1674416290058'

    public async up(queryRunner: QueryRunner): Promise<void> {
        console.log(222)
        await queryRunner.query(`CREATE TABLE "forms" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "external_form_id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, CONSTRAINT "UQ_2e7637c72b03266a15b5e38e718" UNIQUE ("external_form_id"), CONSTRAINT "PK_ba062fd30b06814a60756f233da" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "forms"`);
    }

}
