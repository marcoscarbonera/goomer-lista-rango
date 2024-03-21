import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRestaurantTable1711057902068 implements MigrationInterface {
  name = 'CreateRestaurantTable1711057902068';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
            CREATE TABLE "restaurant" (
              "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
              "name" character varying(255) NOT NULL,
              "url_image" character varying NOT NULL,
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              CONSTRAINT "restaurant_PK" PRIMARY KEY ("id"));
          `,
    );
    await queryRunner.query(
      `
            CREATE TABLE "restaurant_address" (
              "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
              "street" character varying(256) NOT NULL,
              "street_number" integer NOT NULL,
              "complement" character varying(128),
              "neighborhood" character varying(128) NOT NULL,
              "zip_code" character varying(16) NOT NULL,
              "city" character varying(64) NOT NULL,
              "state" character varying(64) NOT NULL,
              "country" character varying(64) NOT NULL,
              "created_at" TIMESTAMP NOT NULL DEFAULT now(),
              "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
              "restaurant_id" uuid NOT NULL,
              CONSTRAINT "restaurant_address_PK" PRIMARY KEY ("id"));
          `,
    );
    await queryRunner.query(
      `CREATE INDEX "restaurant_address_restaurant_IDX" ON "restaurant_address" ("restaurant_id") `,
    );
    await queryRunner.query(
      `
        CREATE TABLE "restaurant_opening_hour" (
          "restaurant_id" uuid NOT NULL,
          "day_of_week" integer NOT NULL,
          "opening_time" TIME NOT NULL,
          "opening_duration_minutes" integer NOT NULL,
          "created_at" TIMESTAMP NOT NULL DEFAULT now(),
          "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
          CONSTRAINT "restaurant_opening_hour_PK" PRIMARY KEY ("restaurant_id","day_of_week"));
      `,
    );
    await queryRunner.query(
      `CREATE INDEX "restaurant_opening_hour_restaurant_IDX" ON "restaurant_opening_hour" ("restaurant_id") `,
    );

    await queryRunner.query(
      `ALTER TABLE "restaurant_address" ADD CONSTRAINT "restaurant_address_restaurant_FK" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_opening_hour" ADD CONSTRAINT "restaurant_opening_hour_restaurant_FK" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "restaurant_opening_hour" DROP CONSTRAINT "restaurant_opening_hour_restaurant_FK"`,
    );
    await queryRunner.query(
      `ALTER TABLE "restaurant_address" DROP CONSTRAINT "restaurant_address_restaurant_FK"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."restaurant_opening_hour_restaurant_IDX"`,
    );
    await queryRunner.query(`DROP TABLE "restaurant_opening_hour"`);
    await queryRunner.query(
      `DROP INDEX "public"."restaurant_address_restaurant_IDX"`,
    );
    await queryRunner.query(`DROP TABLE "restaurant_address"`);
    await queryRunner.query(`DROP TABLE "restaurant"`);
  }
}
