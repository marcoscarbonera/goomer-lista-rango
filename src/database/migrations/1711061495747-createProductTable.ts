import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProductTable1711061495747 implements MigrationInterface {
  name = 'CreateProductTable1711061495747';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
        CREATE TABLE "product_category" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "name" character varying(255) NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "product_category_PK" PRIMARY KEY ("id"));
      `,
    );
    await queryRunner.query(
      `
        CREATE TABLE "product" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "name" character varying(255) NOT NULL,
          "url_image" character varying NOT NULL,
          "price" numeric(10,2) NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
          "product_category_id" uuid NOT NULL,
        CONSTRAINT "product_PK" PRIMARY KEY ("id"));
      `,
    );
    await queryRunner.query(
      `CREATE INDEX "product_product_category_IDX" ON "product" ("product_category_id") `,
    );
    await queryRunner.query(
      `
        CREATE TABLE "product_promotion" (
          "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
          "description" text NOT NULL,
          "price" numeric(10,2) NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "product_promotion_PK" PRIMARY KEY ("id"));
      `,
    );

    await queryRunner.query(
      `
        CREATE TABLE "product_promotion_hour" (
          "product_promotion_id" uuid NOT NULL,
          "day_of_week" integer NOT NULL,
          "opening_time" TIME NOT NULL,
          "opening_duration_minutes" integer NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "product_promotion_hour_PK" PRIMARY KEY ("product_promotion_id",
          "day_of_week"));
      `,
    );
    await queryRunner.query(
      `CREATE INDEX "product_promotion_hour_product_promotion_IDX" ON "product_promotion_hour" ("product_promotion_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "product_category_FK" FOREIGN KEY ("product_category_id") REFERENCES "product_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product_promotion_hour" ADD CONSTRAINT "product_promotion_hour_FK" FOREIGN KEY ("product_promotion_id") REFERENCES "product_promotion"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product_promotion_hour" DROP CONSTRAINT "product_promotion_hour_FK"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "product_category_FK"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."product_promotion_hour_product_promotion_IDX"`,
    );
    await queryRunner.query(`DROP TABLE "product_promotion_hour"`);
    await queryRunner.query(`DROP TABLE "product_promotion"`);
    await queryRunner.query(
      `DROP INDEX "public"."product_product_category_IDX"`,
    );
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "product_category"`);
  }
}
