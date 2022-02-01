import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddImageColumnToFoodTable1643677087852 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('Foods', new TableColumn({
            name: "image",
            type: "varchar",
            isNullable: true
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('Foods', 'image')
    }
}
