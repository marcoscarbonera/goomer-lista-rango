import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductIdInProductPromotion1711340214891 implements MigrationInterface {
    name = 'AddProductIdInProductPromotion1711340214891'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_promotion" ADD "product_id" uuid NOT NULL`);
        await queryRunner.query(`CREATE INDEX "product_promotion_product_IDX" ON "product_promotion" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "product_promotion" ADD CONSTRAINT "product_promotion_product_FK" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_promotion" DROP CONSTRAINT "product_promotion_product_FK"`);
        await queryRunner.query(`DROP INDEX "public"."product_promotion_product_IDX"`);
        await queryRunner.query(`ALTER TABLE "product_promotion" DROP COLUMN "product_id"`);
    }

}
