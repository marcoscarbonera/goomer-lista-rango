import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRestaurantIdInProductTable1711337238637 implements MigrationInterface {
    name = 'AddRestaurantIdInProductTable1711337238637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "restaurant_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "product_restaurant_IDX" ON "product" ("restaurant_id") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "product_restaurant_FK" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "product_restaurant_FK"`);
        await queryRunner.query(`DROP INDEX "public"."product_restaurant_IDX"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "restaurant_id"`);
    }

}
